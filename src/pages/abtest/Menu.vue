<template>
  <c-menu title="A/B测试">
    <c-menu-item path="/ab-test/strategy" title="策略测试" v-if="auth.ab_test_strategy"></c-menu-item>
    <!--<c-menu-item path="/ab-test/manage" title="策略分类管理" ></c-menu-item>-->
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
          this.getPageAuth('ab_test_strategy').then(res => { this.auth = res })
      }
  }
</script>

<style>

</style>
