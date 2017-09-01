<template>
  <div class="contrast-render">
    <p class="contrast-render-val">
      <c-format-num :val="val" :pre="pre" :suf="suf"></c-format-num>
    </p>
    <p class="contrast-render-rate">
      <span>[</span>
      <span :class="down > 0 ? 'contrast-render-rate-green':'contrast-render-rate-red'">{{down === null || down === undefined ? '-' : down}}%</span>
      <span>,</span>
      <span :class="up > 0 ? 'contrast-render-rate-green':'contrast-render-rate-red'">{{up === null || up === undefined ? '-' : up}}%</span>
      <span>]</span>
    </p>
  </div>
</template>

<script>
  export default {
    props: {
        val: Number,
        up: Number,
        down: Number,
        pre: String,
        suf: String
    }
  }
</script>

<style>
  .contrast-render p {
    font-size: 12px!important;
    line-height: 15px!important;
    padding-top: 0px!important;
    margin: 0px!important;
  }
  .contrast-render .contrast-render-rate{
    font-weight:700;
  }
  .contrast-render .contrast-render-rate .contrast-render-rate-green{
    color:#4CAF50;
  }
  .contrast-render .contrast-render-rate .contrast-render-rate-red{
    color:red;
  }
</style>
