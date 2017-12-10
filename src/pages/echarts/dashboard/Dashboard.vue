<template>
  <div class="row p-row">
    <div class="col-md-12">
      <p-chart :data="lineBarChartData" id="linebar" :height="400"></p-chart>
    </div>
    <div class="col-md-6">
      <p-chart :data="pieChartData" id="pie1" :height="400"></p-chart>
    </div>
    <div class="col-md-6">
      <p-chart :data="pieChartData" id="pie2" :height="400"></p-chart>
    </div>
    <div class="col-md-6">
      <p-chart :data="barChartData" id="bar" :height="400"></p-chart>
    </div>
    <div class="col-md-6">
      <p-chart :data="lineChartData" id="line" :height="400"></p-chart>
    </div>
    <div class="col-md-12">
      <p-chart :data="areaChartData" id="area" :height="400"></p-chart>
    </div>
  </div>
</template>

<script>
  import {
    getLineChartData,
    getAreaChartData,
    getBarChartData,
    getLineBarChartData,
    getPieChartData
  } from '../api'
  export default {
    data () {
      return {
        barChartData: {},
        lineBarChartData: {},
        areaChartData: {},
        lineChartData: {},
        pieChartData: {}
      }
    },
    methods: {
      setChartData () {
        this.lineChartData = getLineChartData()
        this.areaChartData = getAreaChartData()
        this.barChartData = getBarChartData()
        this.lineBarChartData = getLineBarChartData()
        this.pieChartData = getPieChartData()
      }
    },
    mounted () {
      this.setChartData()
    }
  }
</script>
