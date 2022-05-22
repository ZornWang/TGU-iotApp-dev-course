<template>
  <div id="chart" style="height: 360px; width: 80%; margin: auto" />
</template>

<script>
export default {
  name: 'MyChart',
  props: {
    data: Array
  }
}
import * as echarts from 'echarts'

const updateChart = () => {
  if (document.getElementById('chart') == null) {
    return
  }
  echarts.dispose(document.getElementById('chart'))
  const chart = echarts.init(document.getElementById('chart'))
  const option = {
    xAxis: {
      type: 'category',
      data: [...Array(this.data.value.length).keys()]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: this.data.value.map((e) => e.data),
        type: 'line'
      }
    ]
  }
  chart.setOption(option)
}

updateChart()
</script>

<style></style>
