<template>
  <div class="p-login p-middle">
    <div style="width: 300px;">
      <div class="row p-row">
        <div class="p-login-input">
          <button class="p-login-submit-button">P系统</button>
        </div>
      </div>
      <div class="row p-row">
        <div class="p-login-input" :class="{'has-text' : username != ''}">
          <input v-model.trim()="username" placeholder="请输入账号"/>
        </div>
      </div>
      <div class="row p-row">
        <div class="p-login-input" :class="{'has-text' : password != ''}">
          <input v-model="password" type="password" placeholder="请输入密码"/>
        </div>
      </div>
      <div class="row p-row">
        <div class="p-login-input">
          <button class="p-login-submit-button" @click="doLogin">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {requestLogin} from './api'
  export default {
    data () {
      return {
        username: 'admin',
        password: '123456'
      }
    },
    methods: {
      doLogin () {
        if (this.username === '' || this.password === '') {
          this.$notify.warning({
            title: '请输入账号和密码!'
          })
          return
        }
        requestLogin({username: this.username, password: this.password}).then(res => {
          this.$router.push('/scene')
        }).catch(this.handleError)
      }
    }
  }
</script>

<style>

</style>
