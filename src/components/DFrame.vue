<template>
  <div class="d-frame">
    <div class="d-frame-title">
      <div class="d-frame-title-operation"></div>
      <div class="d-frame-title-content">
        <img :src="icon"/>
        <span>{{title}}</span>
      </div>
    </div>
    <div class="d-frame-content">
      <iframe :src="src"></iframe>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DFrame",
    props: ['icon', 'title', 'src']
  }
</script>

<style scoped>
  .d-frame {
    width: 80%;
    height: 80%;
  }

  .d-frame .d-frame-title {
    height: 30px;
  }

  .d-frame-content {
    width: 100%;
    height: calc(100% - 30px);
  }

  .d-frame-content iframe {
    width: 100%;
    height: 100%;
  }
</style>