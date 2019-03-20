const https = require('https')

exports.wordsLowerCase = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g',
  'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u',
  'v', 'w', 'x', 'y', 'z'
]

exports.wordsUpperCase = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G',
  'H', 'I', 'J', 'K', 'L', 'M', 'N',
  'O', 'P', 'Q', 'R', 'S', 'T', 'U',
  'V', 'W', 'X', 'Y', 'Z'
]

const logger = async function (message) {
  return new Promise(resolve => {
    console.log(`${new Date().toUTCString()} - ${message}`)
    resolve()
  })
}
exports.logger = logger

exports.httpsGET =  async function ({ url }) {
  await logger(`开始[GET]请求URL: ${url}`)
  return new Promise(resolve => {
    https.get(url, response => {
      let result = ''
      response.on('data', data => { result += data })
      response.on('end', () => { resolve(result) })
    });
  })
}
