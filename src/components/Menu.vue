<template>
  <c-menu>
    <c-menu-item path="/portal">
      <i class="fa fa-dashboard fa-2x"></i>
      <span class="menu-text">Dashboard</span>
    </c-menu-item>
    <c-menu-item path="">
      <i class="fa fa-laptop fa-2x"></i>
      <span class="menu-text">Registeration</span>
    </c-menu-item>
    <c-menu-sub path="sub">
      <template slot="title">
        <i class="fa fa-sitemap fa-2x"></i>
        <span class="menu-text">Multi-Level</span>
      </template>
      <c-menu-item path="1">
        <span class="menu-text">Second Level Link</span>
      </c-menu-item>
      <c-menu-item path="2">
        <span class="menu-text">Second Level Link</span>
      </c-menu-item>
      <c-menu-third path="3">
        <template slot="title">
          <span class="menu-text">Third Level Link</span>
        </template>
        <c-menu-item path="4">
          <span class="menu-text">Third Level Link</span>
        </c-menu-item>
        <c-menu-item path="5">
          <span class="menu-text">Third Level Link</span>
        </c-menu-item>
      </c-menu-third>
    </c-menu-sub>
    <c-menu-item path="6">
      <i class="fa fa-square-o fa-2x"></i>
      <span class="menu-text">Blank Page</span>
    </c-menu-item>
    <c-menu-sub path="7">
      <template slot="title">
        <i class="fa fa-sitemap fa-2x"></i>
        <span class="menu-text">Multi-Level</span>
      </template>
      <c-menu-item path="8">
        <span class="menu-text">Second Level Link</span>
      </c-menu-item>
      <c-menu-item path="9">
        <span class="menu-text">Second Level Link</span>
      </c-menu-item>
      <c-menu-third path="10">
        <template slot="title">
          <span class="menu-text">Third Level Link</span>
        </template>
        <c-menu-item path="11">
          <span class="menu-text">Third Level Link</span>
        </c-menu-item>
        <c-menu-item path="12">
          <span class="menu-text">Third Level Link</span>
        </c-menu-item>
      </c-menu-third>
    </c-menu-sub>
  </c-menu>
</template>

<script>
  import CMenu from './menu/index'

  export default {
      components: {
        CMenu,
        CMenuItem: CMenu.Item,
        CMenuSub: CMenu.Sub,
        CMenuThird: CMenu.Third
      }
  }
</script>

<style>

</style>
