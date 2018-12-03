<template>
  <div class="tools-icon tools-time"><span v-html="timer"></span></div>
</template>

<script>
  import Calendar from './Calendar';

  export default {
    name: "Timer",
    data() {
      return {
        timer: Calendar.dateFormatMacOs()
      }
    },
    created() {
      setInterval(() => {
        this.timer = Calendar.dateFormatMacOs();
      }, 1000);
    }
  }
</script>

<style scoped>
  .tools-icon.tools-time {
    width: 125px;
    font-weight: bold;
    font-size: 12px;
  }
</style>