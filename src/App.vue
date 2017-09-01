<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    this.$Notice.config({
      top: 150,
      duration: 3
    })
  }
}
</script>

<style>
#app {
  height: 100%;
  font-family: 'Helvetica Neue',Helvetica,Arial,'Microsoft Yahei','Hiragino Sans GB','Heiti SC','WenQuanYi Micro Hei',sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #666;
  background: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizelegibility;
}
</style>
