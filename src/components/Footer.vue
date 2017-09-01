<template>
  <div style="text-align: center;margin-top: 20px;">
    2017-{{year}} &copy; ping-vue-admin
  </div>
</template>

<script>
  export default {
    data () {
      return {
        year: new Date().getFullYear()
      }
    }
  }
</script>

<style scoped>

</style>
