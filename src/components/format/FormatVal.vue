<template>
  <span>{{type.includes('amt') ? '￥' : ''}}{{spanText}}{{type.includes('rate') ? '%' : ''}}</span>
</template>

<script>
  export default {
      props: {
          val: [Number, String],
          type: {
              type: String,
              default: 'num'
          }
      },
      data () {
          return {
              spanText: ''
          }
      },
      methods: {
         updateSpanText () {
             if (this.val || this.val === 0 || !isNaN(this.val)) {
                 let tmpVal = this.val.toString()
                 let decimal = ''
                 if (tmpVal.includes('.')) {
                     decimal = tmpVal.substring(tmpVal.indexOf('.'))
                     tmpVal = tmpVal.substring(0, tmpVal.indexOf('.'))
                 }
                 this.spanText = tmpVal.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + decimal
             }
         }
      },
      watch: {
          val (newVal, oldVal) {
              this.updateSpanText()
          }
      },
      mounted () {
          this.updateSpanText()
      }
  }
</script>

<style>

</style>
