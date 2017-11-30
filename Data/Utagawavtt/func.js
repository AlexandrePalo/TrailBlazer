import request from 'request-promise-native'
import cheerio from 'cheerio'

const getBodyPromise = options => {
  options.resolveWithFullResponse = true
  options.simple = false
  return request(options)
    .then(response => {
      console.log('Request url:', options.url)
      console.log('...statusCode:', response && response.statusCode) // Print the response status code if a response was received
      return response.body
    })
    .catch(error => {
      console.log('error:', error) // Print the error if one occurred
    })
}

const logIn = options => {
  options.method = 'POST'
  options.resolveWithFullResponse = true
  options.simple = false // to avoid status 302 (redirection) throwing an error
  return request(options)
    .then(response => {
      console.log('Request url:', options.url)
      console.log('...statusCode:', response && response.statusCode) // Print the response status code if a response was received
    })
    .catch(error => {
      console.log('error:', error) // Print the error if one occurred
    })
}

const getFormData = (options, username, password) => {
  return getBodyPromise(options).then(body => {
    let $ = cheerio.load(body)
    console.log($('[name=sid]').attr('value'))
    let formData = {
      username: username,
      password: password,
      sid: $('[name=sid]').attr('value'),
      login: 'Connexion',
      redirect: '../forum_v3/'
    }
    return formData
  })
}

const getJSONResult = options => {
  return getBodyPromise(options).then(body => {
    let $ = cheerio.load(body)
    // UtagawaVTT uses an API to get results. These results are saved as
    //  JSON in the toposSearchAppData-init script tag.
    return JSON.parse($('#toposSearchAppData-init').html())
  })
}

export { getBodyPromise, logIn, getFormData, getJSONResult }
