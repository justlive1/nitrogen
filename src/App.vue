<template>
  <div id="app">
    <tools></tools>
    <desktop></desktop>
    <dock></dock>
  </div>
</template>

<script>
  import Desktop from './components/Desktop';
  import Dock from './components/Dock';
  import Tools from './components/Tools';

  export default {
    name: 'app',
    components: {
      Desktop, Dock, Tools
    },
    mounted() {
      document.getElementById('app').style.backgroundImage = 'url(images/main.jpg)';
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
