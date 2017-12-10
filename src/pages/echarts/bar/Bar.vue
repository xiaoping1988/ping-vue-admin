<template>
    <p-chart :data="barChartData" id="bar" :height="400"></p-chart>
</template>

<script>
  import {getBarChartData} from '../api'
  export default {
    data () {
      return {
        barChartData: {}
      }
    },
    methods: {
      setChartData () {
        this.barChartData = getBarChartData()
      }
    },
    mounted () {
      this.setChartData()
    }
  }
</script>
