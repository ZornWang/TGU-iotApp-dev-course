<template>
  <div id="chart" style="height: 360px; width: 80%; margin: auto" />
</template>

<script>
import { toRefs, watch, ref, onMounted } from 'vue'
import * as echarts from 'echarts'

export default {
  name: 'MyChart',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { data } = toRefs(props)
    const chart = ref(null)
    const initChart = () => {
      chart.value = echarts.init(document.getElementById('chart'))
    }
    const updateChart = () => {
      const options = {
        xAxis: {
          type: 'category',
          data: [...Array(data.value.length).keys()]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: data.value.map((e) => e.data),
            type: 'line'
          }
        ]
      }
      chart.value.setOption(options)
    }
    onMounted(() => {
      initChart()
    })
    watch(data, () => {
      updateChart()
    })
  }
}
</script>

<style></style>
