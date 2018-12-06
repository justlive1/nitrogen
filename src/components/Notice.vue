<template>
  <div class="notice">
    <div class="notice-header">
      <span class="notice-header-icon" v-html="icon"></span>
      <span class="notice-header-title">{{title}}</span>
    </div>
    <div class="notice-body">
      <div class="notice-body-text" v-if="type === 0">{{raw}}</div>
      <div class="notice-body-html" v-if="type === 1" v-html="raw"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Notice",
    props: {
      icon: String,
      title: String,
      type: Number,
      raw: String,
      time: Date
    }
  }
</script>

<style scoped>
  .notice {
    width: 100%;
    height: 100px;
  }

  .notice .notice-header {
    background-color: #dee7e7;
    height: 25px;
    border-radius: 5px 5px 0 0;
  }

  .notice-header-icon {
    margin: 2px 5px;
    vertical-align: middle;
  }

  .notice-header-icon >>> img {
    width: 15px;
    height: 15px;
  }

  .notice-header-title {
    font-size: 10px;
    margin: 0 5px;
  }

  .notice .notice-body {
    background-color: #eff0f2;
    border-radius: 0 0 5px 5px;
  }

  .notice .notice-header, .notice .notice-body {
    width: 95%;
    margin: 0 auto;
  }
</style>