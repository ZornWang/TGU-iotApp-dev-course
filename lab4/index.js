const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const app = express()
const port = 8080

const { Student } = require('./models/student')
const studentModel = new Student()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer().single('file'))

// 设置静态路径
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'uploads')))
// set the view engine to ejs
app.engine('.html', ejs.__express)
// 设置视图路径
app.set('views', path.join(__dirname, 'views/pages'))
app.set('view engine', 'html')

const defaultData = {
  name: '',
  id: '',
  classes: '',
  avatar: '',
  desc: ''
}

// 默认页面
app.get('/', async (req, res) => {
  const { result } = req.query
  const list = await studentModel.findAll()
  res.render('index', {
    ...defaultData,
    title: '人员信息管理',
    list,
    result
  })
})

// 添加按钮
app.get('/add', (req, res) => {
  res.render('add', {
    ...defaultData,
    title: '添加人员信息'
  })
})

// 保存信息
app.post('/save', async (req, res) => {
  const { id, name, classes, desc } = req.body
  let avatarName = ''
  let avatarPath = ''
  if (req.file) {
    const buffer = req.file.buffer
    avatarName = id + '-' + Date.now() + path.parse(req.file.originalname).ext
    avatarPath = `uploads/avatars/${avatarName}`
    fs.writeFileSync(avatarPath, buffer)
  }
  const student = {
    id,
    name,
    classes,
    desc,
    avatar: `${avatarName}`
  }
  await studentModel.save(student)
  res.redirect('/?result=添加成功')
})

// 删除信息
app.post('/delete', async (req, res) => {
  const { id } = req.body
  await studentModel.deleteById(id)
  res.redirect('/?result=删除成功')
})

// 编辑按钮
app.get('/edit', async (req, res) => {
  const { id } = req.query
  const student = await studentModel.findOne(id)
  res.render('update', {
    ...defaultData,
    ...student,
    title: '编辑人员信息'
  })
})

// 修改信息
app.post('/update', async (req, res) => {
  const { id, name, classes, desc } = req.body
  let avatarName = ''
  let avatarPath = ''
  if (req.file) {
    const buffer = req.file.buffer
    avatarName = id + '-' + Date.now() + path.parse(req.file.originalname).ext
    avatarPath = `uploads/avatars/${avatarName}`
    fs.writeFileSync(avatarPath, buffer)
  }
  const student = {
    id,
    name,
    classes,
    desc
  }
  avatarName === '' ? student : (student.avatar = avatarName)
  console.log(student)
  await studentModel.update(student)
  res.redirect('/?result=修改成功')
})

app.get('/favicon.ico', (req, res) => res.status(204))

app.listen(port)
console.log('Server is listening on port 8080')
