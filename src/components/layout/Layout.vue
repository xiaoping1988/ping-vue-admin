<template>
  <div class="p-layout" id="p-layout">
    <!-- 头部导航 -->
    <c-header></c-header>
    <!-- 左菜单导航 -->
    <slot></slot>
    <!-- 右边页面 -->
    <div class="p-page-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

</script>

<style>

</style>
