<template>
  <c-menu title="系统管理">
    <c-menu-item path="/sys-manage/user" title="用户管理" v-if="auth.sys_manage_user"></c-menu-item>
    <c-menu-item path="/sys-manage/role" title="角色管理" v-if="auth.sys_manage_role"></c-menu-item>
    <c-menu-item path="/sys-manage/resource" title="资源管理" v-if="auth.sys_manage_resource"></c-menu-item>
    <c-menu-sub path="sub" title="一级菜单">
      <c-menu-item path="/m" title="菜单"></c-menu-item>
      <c-menu-third path="sec" title="二级菜单">
        <c-menu-item path="/t" title="三级菜单"></c-menu-item>
      </c-menu-third>
    </c-menu-sub>
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
      this.getPageAuth('sys_manage_user,sys_manage_role,sys_manage_resource').then(res => { this.auth = res })
    }
  }
</script>

<style>
</style>
