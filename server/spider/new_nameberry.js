const httpsGET = require('./spider').httpsGET
const wordsUpperCase = require('./spider').wordsUpperCase
const logger = require('./spider').logger
const cheerio = require('cheerio')
const MongoClient = require('mongodb').MongoClient

const NAME_BERRY_URL_LIST = {
  BOY_PAGE: 'https://nameberry.com/search/boys_names/',
  GIRL_PAGE: 'https://nameberry.com/search/girls_names/',
  BASE: 'https://nameberry.com',
  API_POPULARITY_PERCENT: 'https://nameberry.com/api/v1/nameview/stats/'
}

const MONGODB_URL = 'mongodb://localhost:27017/mevn-stack'

let mongodbConnection = undefined

async function parseNamePage(html) {
  return new Promise(async resolve => {
    await logger('开始解析页面数据')
    const $ = cheerio.load(html)
    const tdTags = $('table.Collection-names tbody tr.Collection-names td').toArray()
    resolve(
      tdTags.reduce((pre, td) => {
        const href = $(td).find('a').attr('href')
        pre.push({
          name: href.substr(href.lastIndexOf('/') + 1),
          href: href
        })
        return pre
      }, [])
    )
  })
}

async function parseNameDetailsPagePopularityPercent(html) {
  const $ = cheerio.load(html)
  const dataId = $('span.meta-popularity').attr('data-id')
  if (dataId) {
    await logger(`data-id: ${dataId}`)
    const json = await httpsGET({ url: NAME_BERRY_URL_LIST.API_POPULARITY_PERCENT + dataId })
    return JSON.parse(json)['delta'] || 0
  }
  return 0
}

async function parseNameDetailsPageCommon(html) {
  const $ = cheerio.load(html)
  return $('div.content-box div.name-nav').next().text().trim() || '无'
}

async function parseNameDetailsPageExperts(html) {
  const $ = cheerio.load(html)
  return $('div.content-box div.name-body').children().last().text().trim() || '无'
}

async function parseNameDetailsPageInfo(html) {
  const $ = cheerio.load(html)
  const metaSections = $('span.meta-section').toArray()
  const info = {
    means: undefined,
    origin: undefined
  }
  for (const metaSection of metaSections) {
    if ($(metaSection).text().toLowerCase().indexOf('mean') !== -1) {
      info.means = $(metaSection).text().substr($(metaSection).text().indexOf(':') + 1).replace(/"/g, '').trim()
    } else if ($(metaSection).text().toLowerCase().indexOf('origin') !== -1) {
      info.origin = $(metaSection).text().substr($(metaSection).text().indexOf(':') + 1).replace(/"/g, '').trim()
    }
  }
  return info
}

async function createMongodbConnection() {
  await logger('正在连接Mongodb... ...')
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGODB_URL, function(err, connection){
      if(err) {
        reject(err)
      }
      mongodbConnection = connection
      resolve()
    })
  })
}

async function saveNameToMongodb(name) {
  await logger(`正在存储到Mongodb... ...`)
  const db = mongodbConnection.db('mevn-stack')
  const collection = db.collection('BaoBaoNames')
  collection.insertOne(name)
}

async function startSpider() {
  for (const currentWord of wordsUpperCase) {
    const pageURL = NAME_BERRY_URL_LIST.BOY_PAGE + currentWord
    await logger(`当前页面URL: ${pageURL}`)
    const html = await httpsGET({ url: pageURL })
    await logger(`数据请求完成: ${pageURL}`)
    const nameList = await parseNamePage(html)
    await logger(nameList.reduce((pre, cur) => { pre.push(cur.name); return pre }, []).join(', '))
    for (const name of nameList) {
      await logger(`计数器: ${(wordsUpperCase.indexOf(currentWord) + 1) * (nameList.indexOf(name) + 1)}`)
      const detailsPageURL = NAME_BERRY_URL_LIST.BASE + name.href
      await logger(`详情页面URL: ${detailsPageURL}`)
      const detailsHtml = await httpsGET({ url: detailsPageURL })
      const popularityPercent = await parseNameDetailsPagePopularityPercent(detailsHtml)
      const common = await parseNameDetailsPageCommon(detailsHtml)
      const experts = await parseNameDetailsPageExperts(detailsHtml)
      const info = await parseNameDetailsPageInfo(detailsHtml)
      await logger(`${name.name} 解析完成`)
      await logger(`popularity percent: ${popularityPercent}`)
      await logger(`common: ${common}`)
      await logger(`experts: ${experts}`)
      await logger(`means: ${info.means}`)
      await logger(`origin: ${info.origin}`)
      await saveNameToMongodb({
        label: name.name,
        gender: 'MALE',
        popularityPercent: popularityPercent,
        liked: Math.ceil(Math.random() * 1000),
        means: info.means,
        origin: info.origin,
        information: {
          common: common,
          experts: experts
        }
      })
      await logger('----------------------------------------------------------------------')
    }
    await logger(`字母: ${currentWord}, 所有名字已经完成!`)
  }
}

createMongodbConnection().then(startSpider)
