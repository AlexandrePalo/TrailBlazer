import {
  getBodyPromise,
  getBodyPromiseWithPostMethod,
  logIn,
  getFormData,
  getJSONResult
} from './func.js'
import request from 'request-promise-native'
import jsonSize from 'json-size'
import fs from 'fs'
import xml2js from 'xml2js-es6-promise'
import JSONStream from 'JSONStream'
import cheerio from 'cheerio'

let login_url = 'https://www.geocaching.com/account/login'
let username = 'sport_test'
let password = 'sport_test'
//let results_per_page = 50
// let coord = '[-436.46484,-89.93412,439.62891,89.93412]'
// let nb_of_records = 0 // 0 for max
// let parallel_requests = 30

// cookie_jar is a variable that contains session cookies
let cookie_jar = request.jar()

// first connexion using request to login, with a POST method and a formData header
// header data were retrieve thanks to the chromium network inspector
getFormData(
  {
    uri: login_url,
    jar: cookie_jar
  },
  username,
  password
)
  .then(formData => {
    return logIn({
      uri: login_url,
      formData: formData,
      jar: cookie_jar
    })
  })
  .then(() => {
    return getBodyPromise({
      uri:
        'http://www.geocaching.com/seek/nearest.aspx?country_id=73&as=1&ex=2&cFilter=9a79e6ce-3344-409c-bbe9-496530baf758&children=n',
      jar: cookie_jar
    })
  })
  .then(body => {
    let $ = cheerio.load(body)
    let cache_id = []
    $('span.small').each((index, element) => {
      let id = $(element)
        .text()
        .split('\n')[3]
      if (id) {
        cache_id.push(id.trim())
      }
    })

    let nb_of_pages = $('td.PageBuilderWidget')
      .first()
      .children()
      .children()
      .eq(2)
      .text()

    console.log('Number of pages:', nb_of_pages)

    let formData = {
      __EVENTTARGET: '',
      __EVENTARGUMENT: $('[name=__EVENTARGUMENT]').attr('value'),
      __LASTFOCUS: $('[name=__LASTFOCUS]').attr('value'),
      __VIEWSTATEFIELDCOUNT: $('[name=__VIEWSTATEFIELDCOUNT]').attr('value'),
      __VIEWSTATE: $('[name=__VIEWSTATE]').attr('value'),
      __VIEWSTATE1: $('[name=__VIEWSTATE1]').attr('value'),
      __VIEWSTATEGENERATOR: $('[name=__VIEWSTATEGENERATOR]').attr('value')
    }

    const getCacheIdLoop = (index, max, incr) => {
      if (index <= max) {
        let result_promises = []
        // for each i, create a promise with a request
        for (let i = index; i <= Math.min(max, index + incr); i++) {
          if (i % 10 == 1) {
            formData.__EVENTTARGET = 'ctl00$ContentBody$pgrTop$ctl06'
          } else {
            formData.__EVENTTARGET = 'ctl00$ContentBody$pgrTop$lbGoToPage_' + i
          }
          //console.log(formData.__EVENTTARGET)
          result_promises.push(
            getBodyPromiseWithPostMethod({
              uri:
                'https://www.geocaching.com/seek/nearest.aspx?country_id=73&as=1&ex=2&cFilter=9a79e6ce-3344-409c-bbe9-496530baf758&children=n',
              formData: formData,
              jar: cookie_jar,
              family: 4
            }).then(body => {
              console.log('Page:', i)
              let $ = cheerio.load(body)
              formData.__EVENTARGUMENT = $('[name=__EVENTARGUMENT]').attr(
                'value'
              )
              formData.__LASTFOCUS = $('[name=__LASTFOCUS]').attr('value')
              formData.__VIEWSTATEFIELDCOUNT = $(
                '[name=__VIEWSTATEFIELDCOUNT]'
              ).attr('value')
              formData.__VIEWSTATE = $('[name=__VIEWSTATE]').attr('value')
              formData.__VIEWSTATE1 = $('[name=__VIEWSTATE1]').attr('value')
              formData.__VIEWSTATEGENERATOR = $(
                '[name=__VIEWSTATEGENERATOR]'
              ).attr('value')
              $('span.small').each((index, element) => {
                let id = $(element)
                  .text()
                  .split('\n')[3]
                if (id) {
                  cache_id.push(id.trim())
                  //console.log(id.trim())
                }
              })
            })
          )
        }
        // Wait for all promises
        Promise.all(result_promises).then(() => {
          getCacheIdLoop(index + incr + 1, max, incr)
        })
      } else {
        //if (nb_of_records != 0 && scrapped_data.length > nb_of_records) {
        //  scrapped_data = scrapped_data.slice(0, nb_of_records)

        //cache_id.forEach(item => console.log(item))

        // https://www.bennadel.com/blog/3232-parsing-and-serializing-large-objects-using-jsonstream-in-node-js.htm
        // https://github.com/dominictarr/JSONStream#jsonstreamstringifyopen-sep-close
        let stream = fs.createWriteStream('./geocaching.json')
        let json_stream = JSONStream.stringify()
        json_stream.pipe(stream)

        let nb_of_caches = 0

        const getCacheDataLoop = (index, cache_id_list, parallel_requests) => {
          if (index <= cache_id_list.length) {
            let cache_json = []
            let result_promises = []
            // for each i, create a promise with a request
            for (
              let i = index;
              i < Math.min(cache_id_list.length, index + parallel_requests);
              i++
            ) {
              result_promises.push(
                getBodyPromise({
                  uri: 'http://coord.info/' + cache_id_list[i],
                  jar: cookie_jar,
                  family: 4
                }).then(body => {
                  let $ = cheerio.load(body)

                  let attribute_list = []
                  $('#ctl00_ContentBody_detailWidget')
                    .children()
                    .children('img')
                    .each((i, elem) => {
                      if ($(elem).attr('alt') != 'blank') {
                        attribute_list.push($(elem).attr('alt'))
                      }
                    })

                  let found = 0
                  if (
                    $('p.LogTotals')
                      .children('img')
                      .eq(0)
                      .attr('title') == 'Found it'
                  ) {
                    found = $('p.LogTotals')
                      .text()
                      .trim()
                      .split(' ')[0]
                      .trim()
                  }

                  let not_found = 0
                  if (
                    $('p.LogTotals')
                      .children('img')
                      .eq(1)
                      .attr('title') == "Didn't find it"
                  ) {
                    not_found = $('p.LogTotals')
                      .text()
                      .trim()
                      .split(' ')[1]
                      .trim()
                  }

                  let premium_cache = 'no'
                  let difficulty = ''
                  let terrain_difficulty = ''
                  let size = ''
                  let favorite = ''

                  if (
                    $('section.pmo-banner')
                      .children('h2.sub-heading')
                      .text() ==
                    'This is a Geocaching Premium Member Only Geocache'
                  ) {
                    premium_cache = 'yes'
                    difficulty = $('#ctl00_ContentBody_lblDifficulty')
                      .next()
                      .text()
                    terrain_difficulty = $('#ctl00_ContentBody_lblTerrain')
                      .next()
                      .text()
                    size = $('#ctl00_ContentBody_lblSize')
                      .next()
                      .text()
                    favorite = $('#ctl00_ContentBody_lblFavoritePoints')
                      .next()
                      .text()
                  } else {
                    difficulty = $('#ctl00_ContentBody_uxLegendScale')
                      .children('img')
                      .attr('alt')
                    terrain_difficulty = $('#ctl00_ContentBody_Localize12')
                      .children('img')
                      .attr('alt')
                    size = $('span.minorCacheDetails')
                      .children('img')
                      .attr('alt')
                    favorite = $('span.favorite-value')
                      .text()
                      .trim()
                  }

                  cache_json.push({
                    cache_id: cache_id_list[i],
                    url: 'https://coord.info/' + cache_id_list[i],
                    coord: $('#uxLatLon').text(),
                    name: $('#ctl00_ContentBody_CacheName').text(),
                    type: $('a[title="About Cache Types"]')
                      .children('img')
                      .attr('alt'),
                    premium_cache: premium_cache,
                    difficulty: difficulty,
                    terrain_difficulty: terrain_difficulty,
                    size: size,
                    attributes: attribute_list,
                    favorite_by_x_people: favorite,
                    found_it: found,
                    didnt_find_it: not_found
                  })
                })
              )
            }
            // Wait for all promises
            Promise.all(result_promises).then(() => {
              cache_json.forEach(json_stream.write)
              nb_of_caches += cache_json.length
              console.log(
                'Scrapping: %s / %s',
                nb_of_caches,
                cache_id_list.length
              )
              getCacheDataLoop(
                index + parallel_requests,
                cache_id_list,
                parallel_requests
              )
            })
          } else {
            json_stream.end()

            stream.on('finish', function handleFinish() {
              console.log('JSONStream serialization complete!')
              console.log('- - - - - - - - - - - - - - - - - - - - - - -')
            })
            console.log('Number of caches with data:', nb_of_caches)
          }
        }
        try {
          getCacheDataLoop(0, cache_id, 50)
        } catch (error) {
          console.log('error:', error) // Print the error if one occurred
        }
      }
    }
    try {
      getCacheIdLoop(2, nb_of_pages, 0)
    } catch (error) {
      console.log('error:', error) // Print the error if one occurred
    }
  })
  .catch(error => {
    console.log('error:', error) // Print the error if one occurred
  })
