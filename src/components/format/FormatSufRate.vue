<template>
  <span v-if="val != undefined && val != null && val !== ''">
    <span>(</span>
    <c-format-growth-rate :val="val"></c-format-growth-rate>
    <span>)</span>
  </span>
</template>

<script>
  export default {
      props: {
          val: [String, Number]
      }
  }
</script>
