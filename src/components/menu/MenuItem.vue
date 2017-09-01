<template>
  <li @click="handleClick">
    <a :class="{'active-menu':active }" href="javascript:void(0);">
      <i v-if="icon && icon.trim() !== ''" :class="icon"></i>
      <span class="menu-text">{{title}}</span>
    </a>
  </li>
</template>

<script>
  import {updateActive, initActive, setBreadcrumb} from '../../assets/js/assist'
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
//        if (this.active) return
        updateActive(this)
        this.$router.push(this.path)
//        setBreadcrumb(this)
      }
    }
  }
</script>

<style>

</style>
