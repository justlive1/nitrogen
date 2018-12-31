<template>
  <div class="desktop">
    <d-frame v-for="item in this.$store.state.desktop.frames" :data="item" :key="item.id"></d-frame>
    <safari :data="$store.state.desktop.safari" v-if="$store.state.desktop.safari.active"></safari>
  </div>
</template>

<script>
  import DFrame from './DFrame';
  import Safari from './Safari';

  export default {
    name: "Desktop",
    components: {
      DFrame, Safari
    }
  }
</script>

<style scoped>
  .desktop {
    width: 100%;
    height: 100%;
  }
</style>