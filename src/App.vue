<template>
  <div id="app">
    <tools v-on:showNotificationCenter="showNotificationCenter"></tools>
    <desktop></desktop>
    <dock :docks="docks"></dock>
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
        docks: [],
        notificationCenterVisible: false,
        messageNotices: []
      }
    },
    created() {
      if (process.env.VUE_APP_DOCK_MODE === 'static') {
        this.docks = JSON.parse(process.env.VUE_APP_DOCK_VAL);
      } else {
        //ajax
      }
    },
    mounted() {
      document.getElementById('app').style.backgroundImage = this.mainUrl;

      this.addMessage({
        id: ~~(Math.random() * 10000),
        icon: 'images/message.png',
        tip: '消息',
        title: '分布式任务调度',
        body: '登录账号：frost 登录密码：frost',
        time: new Date()
      });
    },
    methods: {
      showNotificationCenter: function (payload) {
        this.notificationCenterVisible = payload;
      },
      addMessage: function (message) {
        this.messageNotices.push(message);
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
