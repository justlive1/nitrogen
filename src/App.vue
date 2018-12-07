<template>
  <div id="app">
    <tools v-on:showNotificationCenter="showNotificationCenter"></tools>
    <desktop></desktop>
    <dock :docks="docks"></dock>
    <notification-center
        :notificationCenterVisible="notificationCenterVisible"></notification-center>
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
        notificationCenterVisible: false
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
    },
    methods: {
      showNotificationCenter: function (payload) {
        this.notificationCenterVisible = payload;
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
