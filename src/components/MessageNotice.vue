<template>
  <notice>
    <template slot="notice-header-icon">
      <img class="notice-header-icon-img" :src="icon"/>
    </template>
    <template slot="notice-header-title">
      <span class="message-tip">{{tip}}</span>
      <span class="message-time">{{timeAgo}}</span>
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
  import Calendar from './Calendar';

  export default {
    name: "MessageNotice",
    components: {
      Notice
    },
    props: {
      icon: String,
      tip: String,
      title: String,
      body: String,
      time: Date
    },
    computed: {
      timeAgo: function () {
        return Calendar.timeAgo(this.time);
      }
    }
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

  .message-time {
    float: right;
    margin-right: 10px;
    line-height: 22px;
  }
</style>