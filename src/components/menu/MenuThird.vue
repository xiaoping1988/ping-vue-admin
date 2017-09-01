<template>
  <li :class="{'active': active}">
    <a href="javascript:void(0)" @click="handleClick">
      <i v-if="icon && icon.trim()  !== ''" :class="icon"></i>
      <span class="menu-text">{{title}}</span>
      <span class="fa arrow"></span>
    </a>
    <ul class="nav nav-third-level" v-show="active">
      <slot></slot>
    </ul>
  </li>
</template>

<script>
  import {updateActive} from '../../assets/js/assist'

  export default {
    data () {
        return {
            active: false
        }
    },
    props: {
      path: {
        type: String
      },
      title: {
        type: String
      },
      icon: {
        type: String
      }
    },
    methods: {
      handleClick () {
        updateActive(this)
      }
    }
  }
</script>

<style>

</style>
