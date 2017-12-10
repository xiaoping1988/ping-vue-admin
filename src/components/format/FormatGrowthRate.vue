<template>
    <span v-if="isNaN(val)" class="up-rate">
      {{val}}
    </span>
    <span v-else>
      <Icon v-if="Number(val) >= 0" type="arrow-up-c" class="up-rate" style="margin: 0px"></Icon>
      <Icon v-else type="arrow-down-c" class="down-rate" style="margin: 0px"></Icon>
      <span v-if="Number(val) >= 0" class="up-rate">{{val}}%</span>
      <span v-else class="down-rate">{{val * -1}}%</span>
    </span>
</template>

<script>
  export default {
      props: {
          val: [String, Number]
      }
  }
</script>
