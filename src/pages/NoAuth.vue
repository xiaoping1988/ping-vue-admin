<template>
  <div id="wrapper" >
    <v-header></v-header>
    <div id="page-wrapper" style="margin: 0px;width: 100%;">
      <div class="no-auth-box">
          <div class="no-auth-icon"></div>
          <div class="no-auth-text">
            抱歉!您还没有权限访问该页面,如需帮助请联系管理员。
            <Button type="primary" shape="circle" size="small" onclick="window.history.go(-1)">返回</Button>
          </div>
      </div>
      <v-footer></v-footer>
    </div>
  </div>
</template>

<script>
  import VHeader from '../components/Header'
  import VFooter from '../components/Footer'

  export default {
    components: {
      VHeader,
      VFooter
    }
  }
</script>

<style scoped>
  .no-auth-box {
    text-align: center;
  }
  .no-auth-icon {
    width: 136px;
    height: 136px;
    background: url("../assets/img/noauth.gif") no-repeat;
    display: inline-block;
  }
  .no-auth-text {
    font-size: 10px;
    font-weight: 700;
    color: #333;
    padding-top: 30px;
    text-align: center;
  }
</style>
