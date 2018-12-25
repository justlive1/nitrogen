<template>
  <div class="tools-icon tools-time"><span v-html="timer"></span></div>
</template>

<script>
  import Calendar from './Calendar';

  export default {
    name: "Timer",
    data() {
      return {
        timer: Calendar.dateFormatMacOs(this.$store.state.desktop.currentTime)
      }
    },
    created() {
      let _that = this;
      if (window.timerIntervalArr) {
        window.timerIntervalArr.forEach(item => clearInterval(item));
      }
      window.timerIntervalArr = [setInterval(function () {
        _that.$store.commit('desktop/refreshTime');
        _that.timer = Calendar.dateFormatMacOs(_that.$store.state.desktop.currentTime);
      }, 1000)];
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