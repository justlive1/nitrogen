<template>
  <div class="desktop">
    <d-frame v-for="item in this.$store.state.desktop.frames" :data="item" :key="item.id"></d-frame>
  </div>
</template>

<script>
  import DFrame from './DFrame';

  export default {
    name: "Desktop",
    components: {
      DFrame
    }
  }
</script>

<style scoped>
  .desktop {
    width: 100%;
    height: 100%;
  }
</style>