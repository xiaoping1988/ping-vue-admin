<template>
  <div class="p-navside" ref="mlNavSide">
    <div class="p-navside-toggle" @click="toggleDisplay">
      <i class="fa fa-1x fa-chevron-left" :class="{'fa-chevron-left' : !display, 'fa-chevron-right' : display}"></i>
    </div>
    <div class="p-navside-menu">
      <ul>
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        display: false
      }
    },
    methods: {
      toggleDisplay () {
        this.display = !this.display
        let dom = this.$refs['mlNavSide']
        if (dom.parentElement.classList.contains('p-navside-stop')) {
          dom.parentElement.classList.remove('p-navside-stop')
        } else {
          dom.parentElement.classList.add('p-navside-stop')
        }
      }
    }
  }
</script>

<style>

</style>
