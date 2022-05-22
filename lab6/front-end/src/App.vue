<template>
  <div>
    <el-button class="button" type="primary" @click="start">Start</el-button>
    <el-button class="button" type="warning" @click="stop">Stop</el-button>
    <el-button class="button" type="danger" @click="clear">Clear</el-button>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="_id" label="ID" />
      <el-table-column prop="data" label="数据" />
      <el-table-column prop="createAt" label="创建日期" />
      <el-table-column prop="timestamp" label="时间戳" />
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
const tableData = ref([])
const timer = ref(null)

const refresh = async () => {
  const { data } = await axios.get('/api/data')
  console.log(data)
  tableData.value = data.data
}

refresh()

const generateData = async () => {
  await axios.post('/api/data', {
    data: Math.round(Math.random() * 10000),
    createAt: Date.now(),
    timestamp: Date.parse(new Date())
  })
}

const start = async () => {
  timer.value = setInterval(() => {
    generateData()
    refresh()
  }, 3000)
}

const stop = async () => {
  clearInterval(timer.value)
}

const clear = async () => {
  await axios.delete('/api/data')
  refresh()
}
</script>
<style>
.button {
  margin-bottom: 8px;
}
</style>
