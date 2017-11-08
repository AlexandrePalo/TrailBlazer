import { getRecommendationList, getLoggedSession } from './func.js'

let url = 'https://www.utagawavtt.com/forum_v3/ucp.php?mode=login'
let username = 'sport_test'
let password = 'sport_test'

import request from 'request'
import cheerio from 'cheerio'

// cookieJar is a variable that contains session cookies
let cookieJar = request.jar()

// first connexion using request to login, with a POST method and a formData header
// header data were retrieve thanks to the chromium network inspector
request.post(
  {
    url: url,
    jar: cookieJar
  },
  (error, response, body) => {
    let $ = cheerio.load(body)
    console.log($('[name=sid]').attr('value'))
    let formData = {
      username: username,
      password: password,
      sid: $('[name=sid]').attr('value'),
      login: 'Connexion',
      redirect: '../forum_v3/'
    }

    request.post(
      {
        url: url,
        formData: formData,
        jar: cookieJar
      },
      (error, response, body) => {
        request(
          {
            url:
              'https://www.utagawavtt.com/search?city=&w=[5.10424,44.99536,6.81536,46.16410]&q=[1,2,3,4]&k=0&l=all&u=1&aa=50',
            jar: cookieJar
          },
          (error, response, body) => {
            console.log('error:', error) // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
            let $ = cheerio.load(body)
            let json = JSON.parse($('#toposSearchAppData-init').html())
            console.log(json['results'])
          }
        )
      }
    )
  }
)
