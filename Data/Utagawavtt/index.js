import { getBodyPromise, logIn, getFormData, getJSONResult } from './func.js'
import request from 'request-promise-native'
import jsonSize from 'json-size'
import fs from 'fs'

let url = 'https://www.utagawavtt.com/forum_v3/ucp.php?mode=login'
let username = 'sport_test'
let password = 'sport_test'
let results_per_page = 50
let coord = '[5.10424,44.99536,6.81536,46.16410]'

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
      let topo_count = json_result['resultsMeta']['topoCount']
      // Calculate the number of result pages
      let page_nb = Math.trunc(topo_count / results_per_page) + 1
      console.log('Number of traces:', topo_count)
      console.log('Number of results per page:', results_per_page)
      console.log('Number of result pages:', page_nb)

      // The field results contains data we want to scrap
      let scrapped_data = json_result['results']

      let result_promises = []
      // for each i, create a promise with a request
      for (let i = 2; i <= page_nb; i++) {
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
          })
        )
      }

      // Wait for all promises
      Promise.all(result_promises).then(results => {
        for (let result of results) {
          for (let trace of result['results']) {
            scrapped_data.push(trace)
          }
        }

        const loop = i => {
          if (i < scrapped_data.length) {
            getBodyPromise({
              url:
                'http://www.utagawavtt.com/download.php?ref=' +
                scrapped_data[i].tid,
              jar: cookie_jar
            })
              .then(body => {
                scrapped_data[i].xml_gpx = body.toString()
              })
              .then(loop.bind(null, i + 1))
          } else {
            fs.writeFile(
              'scrapped_data.json',
              JSON.stringify(scrapped_data, null, 2),
              err => {
                if (err) throw err
                console.log('scrapped_data.json has been saved!')
              }
            )
            console.log('Number of traces in the JSON', scrapped_data.length)
            console.log('Size of the JSON (bytes):', jsonSize(scrapped_data))
          }
        }

        loop(0)
      })
    })
  })
})
