<template>
  <span>{{dateFormat}}</span>
</template>

<script>
  import {formatDate} from '@/assets/js/assist.js'
  export default {
      props: {
          val: Number,
          pattern: {
              type: String,
              default: 'yyyy-MM-dd HH:mm:ss'
          }
      },
      computed: {
          dateFormat: function () {
             return formatDate(new Date(this.val), this.pattern)
          }
      }
  }
</script>

<style>

</style>
