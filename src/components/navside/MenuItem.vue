<template>
  <li v-if="notooltip" :class="{actived: isActived}" @click="push">
      <span v-if="icon && icon !== ''" class="p-menu-item-icon">
        <i :class="iconClass"></i>
      </span>
    <span class="p-menu-item-name">
      {{name}}
      </span>
  </li>
  <el-tooltip v-else :disabled="tooltipDisabled" effect="light" :content="name" placement="right">
    <li :class="{actived: isActived}" @click="$router.push(path)" @mouseover="hoverLi">
      <span v-if="icon && icon !== ''" class="p-menu-item-icon">
        <i :class="iconClass"></i>
      </span>
      <span class="p-menu-item-name">
      {{name}}
      </span>
    </li>
  </el-tooltip>
</template>

<script>
  export default {
    props: {
      path: {
        type: String,
        required: true
      },
      icon: String, // fontawesome
      name: String,
      notooltip: {
        type: Boolean,
        default: false
      },
      openWindow: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        isActived: false,
        iconClass: 'fa fa-1x fa-' + this.icon,
        title: this.name,
        tooltipDisabled: true
      }
    },
    watch: {
      '$route': 'activeItem'
    },
    methods: {
      activeItem (newVal, oldVal) {
        let tempPath = this.path
        if (newVal.fullPath === tempPath) {
          this.isActived = true
        } else {
          if (!tempPath.endsWith('/')) {
            tempPath = tempPath + '/'
          }
          this.isActived = newVal.fullPath.startsWith(tempPath)
        }
      },
      hoverLi () {
        if (document.getElementsByClassName('p-navside-stop').length > 0) {
          this.tooltipDisabled = false
        } else {
          this.tooltipDisabled = true
        }
      },
      push () {
        if (this.openWindow) {
          window.open(this.path)
        } else {
          this.$router.push(this.path)
        }
      }
    },
    mounted () {
      this.activeItem(this.$route)
    }
  }
</script>

<style>

</style>
