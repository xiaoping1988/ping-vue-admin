<template>
  <div class="row p-row p-header">
    <div class="p-logo">
      P系统
    </div>
    <div class="p-header-navbar">
      <ul>
        <c-menu-item path="/sys" icon="users" name="系统管理" notooltip/>
        <c-menu-item path="/scene" icon="cubes" name="机器学习" notooltip/>
        <c-menu-item path="/echarts" icon="area-chart" name="echart图表可视化" notooltip/>
        <c-menu-item path="/bdmap" icon="map" name="百度地图可视化" notooltip/>
        <c-menu-item path="https://github.com/xiaoping1988" icon="github-square" name="github" notooltip openWindow/>
      </ul>
    </div>
    <div class="p-header-right">
      <span>
        <i class="fa fa-user fa-1x"></i>
      </span>
      <span>admin</span>
      <span>|</span>
      <span>
        <i class="fa fa-sign-out fa-1x" v-on:click="logout" title="退出登录"></i>
      </span>
    </div>
  </div>
</template>

<script>
  import {requestLogout} from '../../pages/login/api'

  export default {
    methods: {
      logout () {
        requestLogout().catch(this.handleError)
        this.$router.push('/')
      }
    }
  }
</script>

<style>

</style>
