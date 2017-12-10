<template>
  <p-chart :data="lineChartData" id="line" :height="400"></p-chart>
</template>

<script>
  import {getLineChartData} from '../api'
  export default {
    data () {
      return {
        lineChartData: {}
      }
    },
    methods: {
      setChartData () {
        this.lineChartData = getLineChartData()
      }
    },
    mounted () {
      this.setChartData()
    }
  }
</script>
