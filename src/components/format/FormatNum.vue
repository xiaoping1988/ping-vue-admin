<template>
  <span>{{pre}}{{(val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}}{{suf}}</span>
</template>

<script>
  export default {
      props: {
          val: Number,
          pre: String,
          suf: String
      }
  }
</script>

<style>

</style>
