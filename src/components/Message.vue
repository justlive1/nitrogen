<template>
  <transition name="slide">
    <div class="message" v-show="messageVisible">
      <div class="message-header">
        <div :class="{active: messageType === 0}" @click="messageTypeChange(0)">今天</div>
        <div :class="{active: messageType === 1}" @click="messageTypeChange(1)">通知</div>
      </div>
      <div class="message-body" v-if="messageType === 0">
        <div class="message-body-calendar">
          <div class="message-body-calendar-date normal-date">{{normalDate}}</div>
          <div class="message-body-calendar-date lunar-date">{{lunarDate}}</div>
        </div>

        <notice v-for="item in todayNotices" :icon="item.icon" :title="item.title"
                :type="item.type" :raw="item.raw" v-bind:key="item.title"></notice>
      </div>
      <div class="message-body" v-if="messageType === 1">

      </div>
    </div>
  </transition>
</template>

<script>
  import Calender from './Calendar';
  import Notice from './Notice';

  export default {
    name: "Message",
    props: ['messageVisible'],
    components: {
      Notice
    },
    data() {
      return {
        messageType: 0,
        date: new Date(),
        normalDate: Calender.dateOfYear(this.date) + " " + Calender.weekOfDate(this.date, true),
        lunarDate: Calender.lunarDate(this.date),
        todayNotices: [{
          icon: '<img class="notice-header-icon-img" src="images/timg.jpg" width="15px" height="15px" />',
          title: '天气',
          type: 1,
          raw: 'xxxx'
        }]
      }
    },
    methods: {
      messageTypeChange: function (type) {
        if (this.messageType === type) {
          return;
        }
        this.messageType = type;
      }
    }
  }
</script>

<style scoped>
  .message {
    position: absolute;
    right: 0;
    top: 30px;
    height: calc(100% - 30px);
    width: 300px;
    background-color: rgba(200, 200, 200, 0.7);
    z-index: 140;
  }

  .message-header {
    height: 50px;
    text-align: center;
    border-bottom: 1px outset;
  }

  .message-header div {
    width: 130px;
    height: 20px;
    margin: 15px 0;
    display: inline-block;
    font-size: 14px;
    color: #eaeaea;
    background-color: rgba(121, 121, 121, 0.5);
  }

  .message-header div:hover {
    cursor: pointer;
  }

  .message-header div.active {
    background-color: rgba(255, 255, 255, 0.5);
    color: #000;
  }

  .message-body {

  }

  .message-body-calendar {
    margin: 15px 0;
  }

  .message-body-calendar .message-body-calendar-date {
    padding: 0 33px;
    color: #585858;
  }

  .message-body-calendar-date.normal-date {
    font-size: 30px;
  }

  .message-body-calendar-date.lunar-date {

  }

  .slide-enter-active {
    transition: all 0.5s;
  }

  .slide-leave-active {
    transition: all 0.5s;
  }

  .slide-enter, .slide-leave-to {
    transform: translateX(300px);
  }
</style>