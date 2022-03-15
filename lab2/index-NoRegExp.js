const http = require('http')
const fs = require('fs')

const port = 3000

const templateFileName = '2.html'

function renderTemplate(filename, data = {}) {
  const rawTemplate = fs.readFileSync(filename, 'utf-8')
  let res = rawTemplate.slice()
  if (Object.keys(data).length !== 0) {
    Object.entries(data).forEach(([key, value]) => {
      for (let index = 0; index < getPatternNumber(res, value); index++) {
        res = res.replace(`{{${key}}}`, value)
      }
    })
  } else res = rawTemplate
  return res
}

const getPatternNumber = (str, pattern) => {
  const index = []
  let a = 0
  for (let i = 0; i !== -1; i = a) {
    a = str.indexOf(pattern, i + 1)
    index.push(a)
  }
  return index.length
}

function getCurrentTime() {
  const date = new Date(Date.now())

  const YY = date.getFullYear()
  const MM = (date.getMonth() + 1).toString().padStart(2, '0')
  const DD = date.getDate().toString().padStart(2, '0')
  const hh = date.getHours().toString().padStart(2, '0')
  const mm = date.getMinutes().toString().padStart(2, '0')
  const ss = date.getSeconds().toString().padStart(2, '0')

  return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss
}

const server = http.createServer((req, res) => {
  const pathName = req.url
  if (pathName === '/getTime') {
    res.end(
      renderTemplate(templateFileName, { text: getCurrentTime().split(' ')[1] })
    )
  } else if (pathName === '/getDate') {
    res.end(
      renderTemplate(templateFileName, { text: getCurrentTime().split(' ')[0] })
    )
  } else res.end(renderTemplate(templateFileName, { text: '点击下方链接' }))
})

server.listen(port, () => {
  console.log(`listning on: ${port}`)
})
