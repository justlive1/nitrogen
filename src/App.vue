<template>
  <div id="app">
    <tools></tools>
    <desktop></desktop>
    <dock></dock>
    <notification-center></notification-center>
  </div>
</template>

<script>
  import Desktop from './components/Desktop';
  import Dock from './components/Dock';
  import Tools from './components/Tools';
  import NotificationCenter from './components/NotificationCenter';

  export default {
    name: 'app',
    components: {
      Desktop, Dock, Tools, NotificationCenter
    },
    data() {
      return {
        mainUrl: 'url(images/main.jpg)'
      }
    },
    created() {
    },
    mounted() {
      document.getElementById('app').style.backgroundImage = this.mainUrl;

      let _that = this;

      axios.get("messages.json").then(function (res) {
        res.data.forEach(function (item) {
          _that.addMessage(item);
        });
      });

      setTimeout(function () {
        _that.addMessage({
          id: 'N1',
          icon: 'images/frost.png',
          tip: '分布式任务调度',
          title: '默认账号',
          body: '账号：frost 密码：frost',
          time: new Date()
        }, true);
      }, 3000);

      setTimeout(function () {
        _that.addMessage({
          id: 'N2',
          icon: 'images/message.png',
          tip: '消息',
          title: '官方QQ',
          body: '1106088328',
          time: new Date()
        }, true);
      }, 6000);

    },
    methods: {
      addMessage: function (message, ding) {
        this.$store.dispatch('desktop/addMessage', message);
        if (ding) {
          new Audio('sounds/ping.mp3').play();
        }
      }
    }
  }
</script>

<style>
  html {
    height: 100%;
  }

  body {
    padding: 0;
    margin: 0;
    height: 100%;
    overflow: hidden;
  }

  #app {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
  }
</style>
