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
    }
  }
</script>

<style>

</style>
