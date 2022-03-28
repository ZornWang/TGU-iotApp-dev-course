const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017/'

class Student {
  constructor() {
    this.client = new MongoClient(url)
  }

  async connect() {
    await this.client.connect()
    const collection = this.client.db('iot-lab4').collection('students')
    return collection
  }

  /**
   * 查询所有
   * @param {*} sort 排序选项
   * @returns 所有数据
   */
  async findAll(sort = {}) {
    try {
      const collection = await this.connect()
      const res = await collection.find().sort(sort).toArray()
      return res
    } finally {
      this.client.close()
    }
  }

  /**
   * 查询单个
   * @param {number} id
   * @returns 单条数据
   */
  async findOne(id) {
    try {
      const collection = await this.connect()
      const res = await collection.findOne({ id })
      return res
    } finally {
      this.client.close()
    }
  }

  /**
   * 创建学生
   * @param {*} student 学生对象
   */
  async save(student) {
    try {
      const collection = await this.connect()
      const res = await collection.insertOne({ ...student })
      return res
    } finally {
      this.client.close()
    }
  }

  /**
   * 修改学生信息
   * @param {*} student 学生对象
   */
  async update(student) {
    try {
      const collection = await this.connect()
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
      this.client.close()
    }
  }

  /**
   * 根据学号删除学生
   * @param {number} id 学生学号
   */
  async deleteById(id) {
    try {
      const collection = await this.connect()
      const res = await collection.deleteOne({ id })
      return res
    } finally {
      this.client.close()
    }
  }
}

module.exports = {
  Student
}
