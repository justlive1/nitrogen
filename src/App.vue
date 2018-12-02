<template>
  <div id="app">
    <tools v-on:showMessage="showMessage"></tools>
    <desktop></desktop>
    <dock :docks="docks"></dock>
    <message :messageVisible="messageVisible"></message>
  </div>
</template>

<script>
  import Desktop from './components/Desktop';
  import Dock from './components/Dock';
  import Tools from './components/Tools';
  import Message from './components/Message';

  export default {
    name: 'app',
    components: {
      Desktop, Dock, Tools, Message
    },
    data() {
      return {
        mainUrl: 'url(images/main.jpg)',
        docks: [],
        messageVisible: false
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
      showMessage: function (payload) {
        this.messageVisible = payload;
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
