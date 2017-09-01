<template>
  <c-menu title="图表可视化">
    <c-menu-item path="/echarts/line" title="折线图"></c-menu-item>
    <c-menu-item path="/echarts/bar" title="柱状图"></c-menu-item>
    <c-menu-item path="/echarts/linebar" title="折线&柱状混图"></c-menu-item>
    <c-menu-item path="/echarts/pie" title="饼图"></c-menu-item>
  </c-menu>
</template>

<script>
  export default {
    data () {
      return {
        auth: {}
      }
    },
    mounted () {
    }
  }
</script>

<style>
</style>
