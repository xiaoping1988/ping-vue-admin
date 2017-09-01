<template>
  <div id="wrapper" >
    <v-header></v-header>
    <slot></slot>
    <div id="page-wrapper">
      <!--<div class="breadcrumb">-->
        <!--<span v-for="(bc, index) in breadcrumb" >-->
          <!--<i v-if="index !== 0" class="fa fa-angle-right"></i>-->
          <!--{{bc}}-->
        <!--</span>-->
      <!--</div>-->
      <router-view></router-view>
      <!--<v-footer></v-footer>-->
    </div>
  </div>
</template>

<script>
  import VHeader from './Header'
  import VFooter from './Footer'

  export default {
//    computed: {
//      breadcrumb () {
//          return this.$store.state.breadcrumb
//      }
//    },
    components: {
      VHeader,
      VFooter
    }
  }
</script>

<style scoped>
  #wrapper{
    width: 100%;
    background: #202020;
  }

  #wrapper .breadcrumb{
    font-size: 15px;
    padding: 0px;
    margin-bottom: 0px;
    list-style: none;
    background: none;
    border-radius: 0px;
}
</style>
