<template>
  <div>
    <el-button class="button" type="primary" @click="start">Start</el-button>
    <el-button class="button" type="warning" @click="stop">Stop</el-button>
    <el-button class="button" type="danger" @click="clear">Clear</el-button>
    <el-table :data="tableData" stripe style="width: 100%" max-height="320">
      <el-table-column prop="_id" label="ID" />
      <el-table-column prop="data" label="数据" />
      <el-table-column prop="createAt" label="创建日期" />
      <el-table-column prop="timestamp" label="时间戳" />
    </el-table>
    <!-- <div id="chart" style="height: 360px; width: 80%; margin: auto" /> -->
    <my-chart :data="tableData" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
// import * as echarts from 'echarts'
import MyChart from './components/MyChart.vue'

const tableData = ref([])
const timer = ref(null)

const refresh = async () => {
  const { data } = await axios.get('/api/data')
  tableData.value = data.data
}

refresh()

const generateData = async () => {
  await axios.post('/api/data', {
    data: Math.round(Math.random() * 1000),
    createAt: Date.now(),
    timestamp: Date.parse(new Date())
  })
  refresh()
}

const start = async () => {
  timer.value = await setInterval(() => {
    generateData()
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
