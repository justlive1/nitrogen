<template>
  <div class="tools-icon tools-time"><span v-html="timer"></span></div>
</template>

<script>
  const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  export default {
    name: "Timer",
    data() {
      return {
        timer: this.getTime()
      }
    },
    created() {
      setInterval(() => {
        this.timer = this.getTime();
      }, 1000);
    },
    methods: {
      getTime: function () {
        const date = new Date();
        let value = (date.getMonth() + 1) + "月" + date.getDate() + "日 " + weeks[date.getDay()] + " "
            + date.getHours() + ":";
        let minutes = date.getMinutes();
        if (minutes < 10) {
          value += 0;
        }
        value += minutes;
        return value;
      }
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