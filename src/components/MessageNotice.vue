<template>
  <notice>
    <template slot="notice-header-icon">
      <img class="notice-header-icon-img" src="images/message.png"/>
    </template>
    <template slot="notice-header-title">
      消息
    </template>
    <template slot="notice-body">
      <div class="message-item">
        <div class="message-title" v-html="title"></div>
        <div class="message-body" v-html="body"></div>
      </div>
    </template>
  </notice>
</template>

<script>
  import Notice from './Notice';

  export default {
    name: "MessageNotice",
    components: {
      Notice
    },
    props: ['title', 'body']
  }
</script>

<style scoped>
  .message-item {
    padding: 10px 20px;
  }

  .message-item .message-title {
    font-weight: 600;
    font-size: 15px;
  }

  .message-item .message-body {
    font-size: 10px;
    color: #4e4e4e;
  }
</style>