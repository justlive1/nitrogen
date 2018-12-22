<template>
  <div id="app">
    <tools></tools>
    <desktop></desktop>
    <dock ref="dock_model"></dock>
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
        mainUrl: ''
      }
    },
    created() {
    },
    mounted() {

      let _that = this;
      // eslint-disable-next-line
      axios.get(process.env.VUE_APP_USER_DATA_URL).then(function (res) {
        if (res.data.success) {
          document.getElementById('app').style.backgroundImage = res.data.data.mainUrl;
          res.data.data.docks.forEach(function (item) {
            _that.$store.commit('desktop/addDock', item);
          });
        } else {
          document.getElementById('app').style.backgroundImage = "url(images/main.jpg)";
        }
        setTimeout(function () {
          _that.$refs.dock_model.initDockItem();
        }, 0);
      });
      // eslint-disable-next-line
      axios.get(process.env.VUE_APP_MESSAGE_URL).then(function (res) {
        if (res.data.success) {
          res.data.data.forEach(function (item) {
            _that.addMessage(item);
          })
        }
      });
      // eslint-disable-next-line
      axios.get(process.env.VUE_APP_WEATHER_URL).then(function (res) {
        if (res.data.success) {
          _that.addWeather(res.data.data);
        }
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
      },
      addWeather: function (weather) {
        this.$store.commit('desktop/addWeather', weather);
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

  ::selection {
    background: none;
  }

  ::-moz-selection {
    background: none;
  }

  ::-webkit-selection {
    background: none;
  }
</style>
