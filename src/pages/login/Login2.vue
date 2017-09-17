<template>
  <div class="login">
    <!--http://www.8dou5che.com/2017/05/17/vue-particles/-->
    <div class="container" style="top: 50%;
    position: absolute;
    width: 100%;
    margin-top: -146.5px;z-index: 10">
      <div class="row">
        <div class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">
          <div class="panel panel-default" style="background: none;text-align: center;border: 0px;z-index: 99999">
            <div class="panel-body login-form">
              <Form ref="loginForm" :model="loginForm" :rules="loginRule">
                <h3 class="title">后台系统</h3>
                <Form-item prop="userName">
                  <Input type="text" v-model="loginForm.userName" placeholder="账号" @on-enter="handleSubmit">
                  <Icon type="ios-person-outline" slot="prepend" size="25"></Icon>
                  <!--<span slot="prepend">账号</span>-->
                  </Input>
                </Form-item>
                <Form-item prop="passwd">
                  <Input type="password" v-model="loginForm.passwd" placeholder="密码" @on-enter="handleSubmit">
                  <Icon type="ios-locked-outline" slot="prepend" size="25"></Icon>
                  <!--<span slot="prepend">密码</span>-->
                  </Input>
                </Form-item>
                <Form-item>
                  <Button class="login-button" @click="handleSubmit()">登录</Button>
                  <Button class="login-button" @click="login2()">切换粒子效果</Button>
                </Form-item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p-waves style="top:20%"></p-waves>
  </div>
</template>

<script>
  import { requestLogin } from './api/login'
  import { setLoginUser, getTokenCookie } from '@/assets/js/assist'
  export default {
    data () {
      return {
        loginForm: {
          userName: 'admin',
          passwd: '123456'
        },
        loginRule: {
          userName: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          passwd: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit () {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            requestLogin(this.loginForm).then(data => {
                if (data.code !== 0) {
                  this.$Message.error(data.msg)
                } else {
                  setLoginUser(data.result)
                  this.$router.push('/console')
                }
            })
          }
        })
      },
      login2 () {
        this.$router.push('/login')
      }
    },
    mounted () {
        let token = getTokenCookie()
        if (token && token.trim !== '') {
           this.$router.push('/console')
        }
    }
  }
</script>

<style>
  .login {
    background: url(../../assets/img/sky.jpg) no-repeat center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height:100%;
    width: 100%;
    margin:0;
    padding:0;
    text-align:center;
  }
  .login .title {
    margin: 10px 0px 15px;
    text-align: center;
    color: #f7f7f7;
  }
  .login .login-form {
    box-shadow: 0 0 20px 9px rgba(0, 0, 0, 0.3);
    width: 350px;
    margin: 0px auto;
    /*background-color: #F9FAFC;*/
  }

  .login .login-button{
    width:97%!important;
    margin-left: 10px!important;
    margin-top:10px!important;
    background-color: rgba(247, 247, 247, 0.38)!important;
    border-color: rgba(255, 255, 255, 0)!important;
    font-weight: 700!important;
    font-size: 14px!important;
  }

  .login .login-button:hover{
    background-color: #bbbec4!important;
    color: #f7f7f7!important;
    border-color: rgba(255, 255, 255, 0)!important;
  }

  .login .login-form .ivu-input-group-prepend,
  .login .login-form .ivu-form-item-error .ivu-input-group-prepend{
    color: #f7f7f7!important;
    border: 0px!important;
    background: none!important;
    font-weight: 700!important;
    font-size: 13px!important;
  }

  .login .login-form .ivu-input,
  .login .login-form .ivu-form-item-error .ivu-input{
    background: none!important;
    border: 0px solid #f7f7f7!important;
    color: #f7f7f7!important;
    box-shadow: 0 -1px 0 0 #999 inset!important;
    font-size: 13px!important;
    font-weight: 900!important;
    border-radius: 0px!important;
  }

  .login .login-form .ivu-input:hover,
  .login .login-form .ivu-input:focus{
    background: none!important;
    border: 0px!important;
    color: #f7f7f7!important;
    box-shadow: 0 -2px 0 0 #ccc inset!important;
  }

  .login .login-form .ivu-form-item-error-tip{
    font-weight: 700!important;
    margin-left: 30px!important;
  }

  /*.login-form .ivu-input-group .ivu-input:hover,*/
  /*.login-form .ivu-input-group .ivu-input:focus{*/
    /*border-color: #f7f7f7!important;*/
  /*}*/
</style>
