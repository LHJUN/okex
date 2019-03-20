
const NAMEBERRY_URL = 'https://nameberry.com'

const https =  require('https')
const fs = require('fs')
const cheerio = require('cheerio')
const MongoClient = require('mongodb').MongoClient;
const config = require('../../config');
const URL = config.development.db.uri;

let dbConnection = undefined

MongoClient.connect(URL,function(err,db){
  if(err) {
    console.log('数据库连接失败: ' + err);
    return;
  }
  console.log('DB CONNECTED')
  dbConnection = db
})

const requestNameBarryAPI = function (dataId) {
  return new Promise(resolve => {
    console.log(`https://nameberry.com/api/v1/nameview/stats/${dataId}`)
    https.get(`https://nameberry.com/api/v1/nameview/stats/${dataId}`, response => {
      let result = ''
      response.on('data', data => {
        result += data
      });
      response.on('end', () => {
        resolve(result)
      })
    })
  })
}

// const html = fs.readFileSync('tmp/a_g.html').toString()
// parseNames(html, `a_g_`)

for (let word = 6; word < 12; word++) {
  const PAGE_URL = `https://nameberry.com/search/boys_names/${String.fromCharCode(word + 65)}`
  https.get(PAGE_URL, response => {
    let html = ''
    response.on('data', (data) => {
      html += data
    })
    response.on('end', () => {
      const fileName = `tmp/${String.fromCharCode(word + 65).toLowerCase()}_g.html`
      fs.writeFile(fileName, html, error => {
        if (error) {
          console.log(`${fileName} 写入失败`)
        } else {
          console.log(`${fileName} 写入成功`)
          parseNames(html, `${String.fromCharCode(word + 65).toLowerCase()}_g_`)
        }
      })
    })
  })
}

function parseNames (html, fileNameStart) {
  const $ = cheerio.load(html)
  $('table.Collection-names').each((collectionNamesIndex, collectionNames) => {
    $(collectionNames).find('tbody tr.Collection-names td').each((tdIndex, td) => {
      const href = $(td).find('a').attr('href')
      const name = href.substr(href.lastIndexOf('/') + 1)
      console.log(`开始下载页面: ${href}, CURRENT NAME: ${name}`)
      https.get(NAMEBERRY_URL + href, response => {
        let html = ''
        response.on('data', (data) => {
          html += data
        })
        response.on('end', async () => {
          const fileName = `tmp/${fileNameStart}${name}.html`
          console.log(`${name} 页面下载完成, 正在写入文件: ${fileName}`)
          parseNamePage(html, name)
          // fs.writeFile(fileName, html, error => {
          //   if (error) {
          //     console.log(`${fileName} 写入失败`)
          //   } else {
          //     console.log(`${fileName} 写入成功`)
          //   }
          // })
        })
      })
    })
  })
}

function parseNamePage (html, name) {
  return new Promise(resolve => {
    if (html === undefined || html === ''){
      console.log(`跳过姓名: ${name}`)
      resolve()
    }
    console.log(`开始解析姓名: ${name}`)
    const $ = cheerio.load(html)
  
    const baobaoName = {
      label: name,
      gender: 'MALE',
      popularityPercent: 0,
      dataId: undefined,
      liked: Math.ceil(Math.random() * 1000),
      means: undefined,
      origin: undefined,
      information: {
        common: undefined,
        experts: undefined
      }
    }
  
    const dataId = $('span.meta-popularity').attr('data-id')
    baobaoName.dataId = dataId
  
    const metaSectionMap = {
      'mean': 'means',
      'origin': 'origin'
    }
    console.log(`${name}================`)
    
    $('div.name-nav div.name-meta-info span.meta-section').each((index, section) => {
      const title = $(section).find('span.meta-title').text().trim()
      const info = $(section).text().substr($(section).text().indexOf(':') + 1).trim().replace('"', '')
      let key = undefined
      Object.keys(metaSectionMap).forEach(contains => {
        if (title.toLowerCase().indexOf(contains) !== -1) {
          key = metaSectionMap[contains]
        }
      })
      if (key) {
        console.log(`|  ${key}: ${info}`)
        baobaoName[key] = info
      }
    })
    const commons = []
    const experts = []
    $('div.content-box').first().children('p').each((index, p) => {
      if (!$(p).hasClass('name-popularity')) {
        commons.push($(p).text().trim())
      }
    })
    $('div.name-body').each((index, p) => {
      if ($(p).text().trim().indexOf('From the experts') !== -1) {
        experts.push($(p).text().trim())
      }
    })
    baobaoName.information.common = commons.join('\n')
    baobaoName.information.experts = experts.join('\n')
    console.log(`|  common: ${baobaoName.information.common}`)
    console.log(`|  experts: ${baobaoName.information.experts}`)
  
    console.log(`${name} 写入MONGODB... ...`)
    
    const DB = dbConnection.db('mevn-stack');
    const collection = DB.collection('BaoBaoName');
    collection.insertOne(baobaoName)
    
    console.log(`=====================`)
  })
}


