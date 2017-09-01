<template>
  <p-chart :data="lineChartData" id="line" height="400"></p-chart>
</template>

<script>
  export default {
    data () {
      return {
        lineChartData: {}
      }
    },
    methods: {
      setChartData () {
        this.lineChartData = {
          title: '折线图标题',
          type: 'line', // 图类型 ['line','bar','linebar','pie']
          reverse: false, // 是否要颠倒系列里的data数据
          columns: [
            {
              name: 'dim', // 与data中的key一样
              title: '维度', //
              x: true // 用于x轴
            },
            {
              name: 'index', // 与data中的key一样
              title: '指标' // 即图例
            }
          ],
          data: [
            {dim: '周一', index: 800},
            {dim: '周二', index: 600},
            {dim: '周三', index: 500},
            {dim: '周四', index: 400},
            {dim: '周五', index: 500},
            {dim: '周六', index: 600},
            {dim: '周日', index: 700}
          ]
        }
      }
    },
    mounted () {
      this.setChartData()
    }
  }
</script>
