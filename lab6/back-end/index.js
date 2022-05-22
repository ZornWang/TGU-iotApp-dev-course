const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/iot-lab6')

const dataSchema = new mongoose.Schema({
  data: Number,
  createAt: Date,
  timestamp: Number
})

const Data = mongoose.model('data', dataSchema)

app.get('/data', async (req, res) => {
  const list = await Data.find()
  res.json({
    status: 200,
    message: 'success',
    data: list
  })
})

app.post('/data', async (req, res) => {
  const { data, createAt, timestamp } = req.body
  const resData = new Data({ data, createAt, timestamp })
  // console.log(resData)
  await resData.save()

  res.json({
    status: 200,
    message: 'success'
  })
})

app.delete('/data', async (req, res) => {
  await Data.deleteMany({})
  res.json({
    status: 200,
    message: 'success'
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
