<template>
  <div id="app">
    <tools v-on:showNotificationCenter="showNotificationCenter"></tools>
    <desktop></desktop>
    <dock></dock>
    <notification-center :notificationCenterVisible="notificationCenterVisible"
                         :messageNotices="messageNotices"></notification-center>
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
        mainUrl: 'url(images/main.jpg)',
        notificationCenterVisible: false,
        messageNotices: []
      }
    },
    created() {
      let _that = this;
      if (process.env.VUE_APP_DOCK_MODE === 'static') {
        JSON.parse(process.env.VUE_APP_DOCK_VAL).forEach(function (item) {
          _that.$store.commit('desktop/addDock', item);
        });
      } else {
        //ajax
      }
    },
    mounted() {
      document.getElementById('app').style.backgroundImage = this.mainUrl;

      let _that = this;
      setTimeout(function () {
        _that.addMessage({
          id: ~~(Math.random() * 10000),
          icon: 'images/frost.png',
          tip: '分布式任务调度',
          title: '默认账号',
          body: '账号：frost 密码：frost',
          time: new Date()
        });
      }, 3000);

      setTimeout(function () {
        _that.addMessage({
          id: ~~(Math.random() * 10000),
          icon: 'images/message.png',
          tip: '消息',
          title: '官方QQ',
          body: '1106088328',
          time: new Date()
        });
      }, 6000);

    },
    methods: {
      showNotificationCenter: function (payload) {
        this.notificationCenterVisible = payload;
      },
      addMessage: function (message) {
        this.$store.dispatch('desktop/addMessage', message);
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
