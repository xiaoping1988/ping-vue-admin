<template>
  <p-chart :data="lineBarChartData" id="linebar" :height="400"></p-chart>
</template>

<script>
  import {getLineBarChartData} from '../api'
  export default {
    data () {
      return {
        lineBarChartData: {}
      }
    },
    methods: {
      setChartData () {
        this.lineBarChartData = getLineBarChartData()
      }
    },
    mounted () {
      this.setChartData()
    }
  }
</script>
