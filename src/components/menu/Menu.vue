<template>
  <nav id="leftMenu" class="navbar-default navbar-side" role="navigation">
    <div class="sidebar-collapse">
      <div class="menu-title">
        <span>{{title}}</span>
      </div>
      <ul class="nav" id="main-menu">
        <!--<li class="text-center">-->
          <!--<img src="../../assets/img/find_user.png" class="user-image img-responsive"/>-->
        <!--</li>-->
        <!--<li class="navbar-side-toggle" style="height: 60px">
          <button type="button" class="navbar-toggle" style="display: block" @click="handleClick">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </li>-->
        <slot></slot>
      </ul>
    </div>
  </nav>
</template>

<script>
  import {initActive} from '../../assets/js/assist'
  export default {
      props: {
        title: {
            type: String,
            default: ''
        }
      },
      data () {
          return {
              navbarHide: false
          }
      },
      watch: {
        '$route': 'activeItem'
      },
      methods: {
        handleClick () {
            this.navbarHide = !this.navbarHide
            if (this.navbarHide) {
              document.getElementById('app').className = 'navbar-hide'
            } else {
              document.getElementById('app').className = ''
            }
        },
        activeItem () {
          initActive(this)
        }
      },
      mounted () {
        this.activeItem()
      },
      updated () {
        this.activeItem()
      }
  }
</script>

<style>

</style>
