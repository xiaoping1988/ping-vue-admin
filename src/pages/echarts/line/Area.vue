<template>
  <p-chart :data="areaChartData" id="line" :height="400"></p-chart>
</template>

<script>
  import {getAreaChartData} from '../api'
  export default {
    data () {
      return {
        areaChartData: {}
      }
    },
    methods: {
      setChartData () {
        this.areaChartData = getAreaChartData()
      }
    },
    mounted () {
      this.setChartData()
    }
  }
</script>
