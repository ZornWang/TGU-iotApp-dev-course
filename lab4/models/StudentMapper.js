const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017/'

var client = null
const connect = async () => {
  try {
    client = await MongoClient.connect(url)
    const collection = client.db('iot-lab4').collection('students')
    return collection
  } catch (err) {
    console.log('错误：' + err.message)
  }
}

/**
 * 查询所有
 * @param {*} sort 排序选项
 * @returns 所有数据
 */
const findAll = async (sort = {}) => {
  try {
    const collection = await connect()
    const res = await collection.find().sort(sort).toArray()
    return res
  } finally {
    client.close()
  }
}

/**
 * 查询单个
 * @param {number} id
 * @returns 单条数据
 */
const findOne = async (id) => {
  try {
    const collection = await connect()
    const res = await collection.findOne({ id })
    return res
  } finally {
    client.close()
  }
}

/**
 * 创建学生
 * @param {*} student 学生对象
 */
const save = async (student) => {
  try {
    const collection = await connect()
    const res = await collection.insertOne({ ...student })
    return res
  } finally {
    client.close()
  }
}

/**
 * 根据学号修改学生信息
 * @param {*} student 学生对象
 */

const updateById = async (student) => {
  try {
    const collection = await connect()
    const res = await collection.updateOne(
      {
        id: student.id
      },
      {
        $set: student
      }
    )
    return res
  } finally {
    client.close()
  }
}

const deleteById = async (id) => {
  try {
    const collection = await connect()
    const res = await collection.deleteOne({ id })
    return res
  } finally {
    client.close()
  }
}

module.exports = {
  findAll,
  findOne,
  save,
  updateById,
  deleteById
}
