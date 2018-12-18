<template>
  <div class="d-frame" :data-id="data.id">
    <div class="d-frame-title">
      <div class="d-frame-title-operation"></div>
      <div class="d-frame-title-content">
        <img :src="data.icon"/>
        <span>{{data.title}}</span>
      </div>
    </div>
    <div class="d-frame-content">
      <iframe :src="data.url"></iframe>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DFrame",
    props: {
      data: Object
    }
  }
</script>

<style scoped>
  .d-frame {
    width: 80%;
    height: 80%;
    position: fixed;
    left: 5%;
    top: 50px;
  }

  .d-frame .d-frame-title {
    height: 30px;
    background-color: #e0e0e0;
    border-radius: 4px 4px 0 0;
  }

  .d-frame-title-content {
    line-height: 30px;
    text-align: center;
  }

  .d-frame-title-content img {
    width: 25px;
    height: 25px;
    position: relative;
    top: 3px;
  }

  .d-frame-title-content span {
    position: relative;
    top: -3px;
  }

  .d-frame-content {
    width: 100%;
    height: calc(100% - 30px);
    border-radius: 0 0 4px 4px;
  }

  .d-frame-content iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
</style>