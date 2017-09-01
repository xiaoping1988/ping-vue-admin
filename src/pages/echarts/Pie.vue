<template>
    <p-chart :data="pieChartData" id="pie"></p-chart>
</template>

<script>
  export default {
    data () {
      return {
        pieChartData: {}
      }
    },
    methods: {
      setChartData () {
        this.pieChartData = {
          title: '饼状图标题',
          type: 'pie', // 图类型 ['line','bar','linebar','pie']
          reverse: false, // 是否要颠倒系列里的data数据
          columns: [
            {
              name: 'index1', // 与data中的key一样
              title: '指标1' // 即图例
            },
            {
              name: 'index2', // 与data中的key一样
              title: '指标2' // 即图例
            },
            {
              name: 'index3', // 与data中的key一样
              title: '指标3' // 即图例
            },
            {
              name: 'index4', // 与data中的key一样
              title: '指标4' // 即图例
            }
          ],
          data: [
            {index1: 100, index2: 800, index3: 200, index4: 400}
          ]
        }
      }
    },
    mounted () {
      this.setChartData()
    }
  }
</script>
