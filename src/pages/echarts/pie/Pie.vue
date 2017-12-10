<template>
    <p-chart :data="pieChartData" id="pie"></p-chart>
</template>

<script>
  import {getPieChartData} from '../api'
  export default {
    data () {
      return {
        pieChartData: {}
      }
    },
    methods: {
      setChartData () {
        this.pieChartData = getPieChartData()
      }
    },
    mounted () {
      this.setChartData()
    }
  }
</script>
