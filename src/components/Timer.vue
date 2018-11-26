<template>
  <div class="tools-icon tools-time"><span v-html="timer"></span></div>
</template>

<script>
  const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  export default {
    name: "Timer",
    data() {
      return {
        timer: '&nbsp;'
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
        let value = weeks[date.getDay()]
        const hour = date.getHours();
        if (hour >= 0 && hour < 12) {
          value += ' 上午' + hour;
        } else {
          value += ' 下午' + (hour - 12);
        }
        value += ":";
        let minutes = date.getMinutes();
        if (minutes < 10) {
          value += 0;
        }
        value += minutes
        return value;
      }
    }
  }
</script>

<style scoped>
  .tools-icon.tools-time {
    width: 125px;
  }
</style>