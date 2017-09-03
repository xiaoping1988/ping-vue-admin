<template>
  <p-chart :data="lineBarChartData" id="linebar" :height="400"></p-chart>
</template>

<script>
  export default {
    data () {
      return {
        lineBarChartData: {}
      }
    },
    methods: {
      setChartData () {
        this.lineBarChartData = {
          title: '折线柱状混图标题',
          type: 'linebar', // 图类型 ['line','bar','linebar','pie']
          reverse: false, // 是否要颠倒系列里的data数据
          columns: [
            {
              name: 'dim', // 与data中的key一样
              title: '维度', //
              x: true // 用于x轴
            },
            {
              name: 'index1', // 与data中的key一样
              title: '指标1', // 即图例
              type: 'line' // 上面的type为'linebar'时才有效
            },
            {
              name: 'index2', // 与data中的key一样
              title: '指标2', // 即图例
              type: 'bar' // 上面的type为'linebar'时才有效
            }
          ],
          data: [
            {dim: '周一', index1: 100, index2: 800},
            {dim: '周二', index1: 200, index2: 600},
            {dim: '周三', index1: 300, index2: 400},
            {dim: '周四', index1: 400, index2: 300},
            {dim: '周五', index1: 500, index2: 500},
            {dim: '周六', index1: 600, index2: 700},
            {dim: '周日', index1: 700, index2: 900}
          ]
        }
      }
    },
    mounted () {
      this.setChartData()
    }
  }
</script>
