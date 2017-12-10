<template>
  <div class="p-panel">
    <div class="p-panel-head">
      <div v-if="title && title !== ''" class="p-panel-title">{{title}}</div>
      <div class="p-panel-head-right"><slot name="right"></slot></div>
    </div>
    <div class="p-panel-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String
    }
  }
</script>

<style>

</style>
