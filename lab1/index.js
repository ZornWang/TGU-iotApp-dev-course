const http = require('http');
const fs = require('fs')

const port = 3000

const templateFileName = 'template.html'

function renderTemplate(filename, data) {
    const rawTemplate = fs.readFileSync(filename, 'utf-8')
    let res = ''
    Object.entries(data).forEach(([key, value]) => {
        res = rawTemplate.replace(new RegExp(`{{${key}}}`, 'g'), value)
    })
    return res
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
    res.end(renderTemplate(templateFileName, { currentTime: getCurrentTime() }))
})

server.listen(port, () => {
    console.log(`listning on: ${port}`);
})