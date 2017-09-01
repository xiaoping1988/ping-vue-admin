<template>
  <div :style="{ textAlign: 'center', paddingBottom: nohr ? '0px' : '20px' }">
    <hr v-if="!nohr"/>
    <Button style="margin-right: 10px;" @click="handleSubmit" type="primary" icon="arrow-up-c">提交</Button>
    <Button style="margin-left: 10px;" @click="handleCancel" icon="arrow-left-c">取消</Button>
  </div>
</template>

<script>
  export default {
      props: {
        nohr: {
          type: Boolean,
          default: false
        }
      },
      methods: {
        handleSubmit () {
            this.$emit('on-submit')
        },
        handleCancel () {
          this.$emit('on-cancel')
        }
      }
  }
</script>

<style>

</style>
