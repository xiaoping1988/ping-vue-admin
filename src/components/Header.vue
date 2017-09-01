<template>
    <nav class="navbar navbar-default navbar-cls-top" style="margin-bottom: 0px">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" v-on:click="toggleSide" data-toggle="collapse" data-target=".sidebar-collapse" >
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <!--<a class="navbar-brand" href="javascript:void(0);">58到家</a>-->
        <div class="navbar-brand">
          <!--<i class="fa fa-gg fa-2x"></i>-->
          <span class="menu-text">系统LOGO</span>
        </div>
      </div>
      <div class="navbar-center">
        <ul>
          <li :class="{'active': module === '/console'}" @click="push('/console')">
            <span class="text-center">控制台</span>
          </li>
          <li :class="{'active': module === '/sys-manage'}" @click="push('/sys-manage')" v-if="auth.sys_manage">
            <span class="text-center">系统管理</span>
          </li>
        </ul>
      </div>
      <div class="navbar-right2">
        <i class="fa fa-user fa-1x"></i>{{getLoginUser().name}}&nbsp;&nbsp;&nbsp;
        <img src="../assets/img/u14.png"/>
        <i class="fa fa-sign-out fa-1x" v-on:click="logout" title="退出登录"></i>
      </div>
    </nav>
</template>

<script>
  import { requestLogout } from '../pages/login/api/login'
  import { removeLoginUser } from '../assets/js/assist'

  export default {
    name: 'header',
    data () {
      return {
        module: '/personal',
        auth: {}
      }
    },
    watch: {
      '$route': 'setHeadActive'
    },
    methods: {
        logout () {
          let user = this.getLoginUser()
          requestLogout(user)
          this.$router.push('/')
          removeLoginUser()
        },
        push (path) {
          if (this.module === path) return
          this.$router.push(path)
          this.module = path
        },
        setHeadActive () {
          let pathArr = this.$route.path.split('/')
          this.module = '/' + pathArr[1]
        },
        toggleSide () {
            if (document.getElementById('leftMenu').style.display === 'none') {
              document.getElementById('leftMenu').style.display = 'block'
            } else {
              document.getElementById('leftMenu').style.display = 'none'
            }
        }
    },
    mounted () {
      this.setHeadActive()
      this.getPageAuth('sys_manage').then(res => { this.auth = res })
    }
  }
</script>

<style scoped>

</style>
