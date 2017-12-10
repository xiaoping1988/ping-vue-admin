<template>
  <div>
    <hr v-if="!nohr"/>
    <div :style="{ textAlign: 'center', padding: nohr ? '0px' : '10px 0px 10px 0px' }">
      <el-button @click="handleSubmit" icon="el-icon-circle-check-outline" type="primary">保存</el-button>
      <el-button @click="handleCancel" icon="el-icon-circle-close-outline">取消</el-button>
    </div>
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
