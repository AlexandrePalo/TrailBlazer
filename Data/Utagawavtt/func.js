import fetch from 'node-fetch'
import cheerio from 'cheerio'

const getRecommendationList = app_id => {
  const main_domain = 'https://play.google.com'
  const catalog_url = '/store/apps/details?id='

  return fetch(main_domain + catalog_url + app_id)
    .then(response => response.text())
    .then(text => {
      let $ = cheerio.load(text)
      let recommendation_url = $('div.recommendation')
        .find('a')
        .eq(0)
        .attr('href')

      return fetch(main_domain + recommendation_url)
        .then(response => response.text())
        .then(text => {
          let $ = cheerio.load(text)
          let recommendation_id_list = []
          $('a [data-docid]').each((index, element) => {
            recommendation_id_list.push($(element).attr('data-docid'))
          })
          return recommendation_id_list
        })
    })
}

// sport_test
const getLoggedSession = (url, username, password) => {
  return fetch(url, {
    method: 'POST',
    body: 'username=' + username + '&password=' + password
  })
    .then(response => response.text())
    .then(text => {
      return text
    })
}

export { getRecommendationList, getLoggedSession }
