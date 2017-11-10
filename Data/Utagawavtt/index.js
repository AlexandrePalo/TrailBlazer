import { getBodyPromise, logIn, getFormData, getJSONResult } from './func.js'
import request from 'request-promise-native'
import jsonSize from 'json-size'
import fs from 'fs'
import xml2js from 'xml2js-es6-promise'
import JSONStream from 'JSONStream'

let url = 'https://www.utagawavtt.com/forum_v3/ucp.php?mode=login'
let username = 'sport_test'
let password = 'sport_test'
let results_per_page = 50
let coord = '[-436.46484,-89.93412,439.62891,89.93412]'
let nb_of_records = 0 // 0 for max
let parallel_requests = 20

// cookie_jar is a variable that contains session cookies
let cookie_jar = request.jar()

// first connexion using request to login, with a POST method and a formData header
// header data were retrieve thanks to the chromium network inspector
getFormData(
  {
    url: url,
    jar: cookie_jar
  },
  username,
  password
).then(formData => {
  logIn({
    url: url,
    formData: formData,
    jar: cookie_jar
  }).then(() => {
    getJSONResult({
      url:
        'http://www.utagawavtt.com/search?city=&w=' +
        coord +
        '&q=[1,2,3,4]&k=0&l=all&u=1&aa=' +
        results_per_page,
      jar: cookie_jar
    }).then(json_result => {
      // The field topoCount contains the number or results
      let topo_count = 0
      if (nb_of_records != 0) {
        topo_count = Math.min(
          json_result['resultsMeta']['topoCount'],
          Math.abs(nb_of_records)
        )
      } else {
        topo_count = json_result['resultsMeta']['topoCount']
      }

      // Calculate the number of result pages
      let page_nb = Math.trunc(topo_count / results_per_page) + 1
      console.log('Number of records wanted:', nb_of_records)
      console.log(
        'Number of traces available:',
        json_result['resultsMeta']['topoCount']
      )
      console.log('Number of results per page:', results_per_page)
      console.log('Number of result pages:', page_nb)

      // The field results contains data we want to scrap
      let scrapped_data = json_result['results']

      const loop = (index, max, incr) => {
        if (index < max) {
          let result_promises = []
          // for each i, create a promise with a request
          for (let i = index; i < Math.min(max, index + incr); i++) {
            result_promises.push(
              getJSONResult({
                url:
                  'http://www.utagawavtt.com/search?city=&w=' +
                  coord +
                  '&q=[1,2,3,4]&k=0&l=all&u=' +
                  i +
                  '&aa=' +
                  results_per_page,
                jar: cookie_jar
              }).then(response => {
                let promise = {}
                promise.index = i
                promise.json = response
                return promise
              })
            )
          }

          // Wait for all promises
          Promise.all(result_promises)
            .then(results => {
              let indexes = []
              for (let result of results) {
                indexes.push(result.index)
                for (let trace of result.json.results) {
                  scrapped_data.push(trace)
                }
              }
              return Math.max(...indexes) + 1
            })
            .then(index => {
              loop(index, max, incr)
            })
        } else {
          if (nb_of_records != 0 && scrapped_data.length > nb_of_records) {
            scrapped_data = scrapped_data.slice(0, nb_of_records)
          }

          const loop2 = (index, incr) => {
            if (index < scrapped_data.length) {
              let result_promises = []
              // for each i, create a promise with a request
              for (
                let i = index;
                i < Math.min(scrapped_data.length, index + incr);
                i++
              ) {
                result_promises.push(
                  getBodyPromise({
                    url:
                      'http://www.utagawavtt.com/download.php?ref=' +
                      scrapped_data[i].tid,
                    jar: cookie_jar
                  }).then(body => {
                    xml2js(body).then(xml => {
                      scrapped_data[i].xml_gpx = xml
                      if (i % 50 == 0) {
                        console.log('Scrapping: %s / %s', i, topo_count)
                      }
                    })
                    return i
                  })
                )
              }

              // Wait for all promises
              Promise.all(result_promises)
                .then(results => {
                  let indexes = []
                  for (let result of results) {
                    indexes.push(result)
                  }
                  return Math.max(...indexes) + 1
                })
                .then(index => {
                  loop2(index, incr)
                })
            } else {
              // https://www.bennadel.com/blog/3232-parsing-and-serializing-large-objects-using-jsonstream-in-node-js.htm
              // https://github.com/dominictarr/JSONStream#jsonstreamstringifyopen-sep-close
              let stream = fs.createWriteStream('./utagawavtt.json')
              let json_stream = JSONStream.stringify()
              json_stream.pipe(stream)

              scrapped_data.forEach(json_stream.write)

              json_stream.end()

              stream.on('finish', function handleFinish() {
                console.log('JSONStream serialization complete!')
                console.log('- - - - - - - - - - - - - - - - - - - - - - -')
              })
              console.log('Number of traces in the JSON', scrapped_data.length)
            }
          }

          loop2(0, parallel_requests)
        }
      }

      loop(2, page_nb, parallel_requests)
    })
  })
})
