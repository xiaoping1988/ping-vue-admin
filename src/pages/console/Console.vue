<template>
  <div id="wrapper" >
    <v-header></v-header>
    <div id="page-wrapper" style="margin: 0px;width: 100%;">
      <v-full-calendar lang="zh"></v-full-calendar>
      <v-footer></v-footer>
    </div>
  </div>
</template>

<script>
  import VHeader from '@/components/Header'
  import VFooter from '@/components/Footer'
  import VFullCalendar from 'vue-fullcalendar'

  export default {
    components: {
      VHeader,
      VFooter,
      VFullCalendar
    }
  }
</script>

<style scoped>

</style>
