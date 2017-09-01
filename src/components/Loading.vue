<template>
  <div>
    <Spin :fix="fix" v-if="loading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <slot v-else></slot>
  </div>
</template>

<script>
  export default {
      props: {
          fix: {
              type: Boolean,
              default: false
          },
          loading: {
              type: Boolean,
              default: false
          }
      }
  }
</script>

<style>
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
</style>
