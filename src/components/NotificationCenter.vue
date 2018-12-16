<template>
  <transition name="slide">
    <div class="notification-center" v-show="this.$store.state.desktop.notificationCenterVisible">
      <div class="notification-center-header">
        <div :class="{active: notificationCenterType === 0}"
             @click="notificationCenterTypeChange(0)">今天
        </div>
        <div :class="{active: notificationCenterType === 1}"
             @click="notificationCenterTypeChange(1)">通知
        </div>
      </div>
      <div class="notification-center-body" v-if="notificationCenterType === 0">
        <div class="notification-center-body-calendar">
          <div class="notification-center-body-calendar-date normal-date">{{normalDate}}</div>
          <div class="notification-center-body-calendar-date lunar-date">{{lunarDate}}</div>
        </div>

        <weather-notice></weather-notice>

        <copyright></copyright>
      </div>
      <div class="notification-center-body" v-if="notificationCenterType === 1">
        <message-notice v-for="msg in this.$store.state.desktop.messageNotices" :icon="msg.icon"
                        :tip="msg.tip" :title="msg.title" :body="msg.body" :time="msg.time"
                        :showHeader="msg.showHeader" :id="msg.id" :key="msg.id"></message-notice>
      </div>
    </div>
  </transition>
</template>

<script>
  import Calender from './Calendar';
  import WeatherNotice from './WeatherNotice';
  import MessageNotice from './MessageNotice';
  import Copyright from './Copyright';

  export default {
    name: "NotificationCenter",
    components: {
      WeatherNotice, MessageNotice, Copyright
    },
    data() {
      return {
        notificationCenterType: 0,
        date: new Date(),
        normalDate: Calender.dateOfYear(this.date) + " " + Calender.weekOfDate(this.date, true),
        lunarDate: Calender.lunarDate(this.date)
      }
    },
    methods: {
      notificationCenterTypeChange: function (type) {
        if (this.notificationCenterType === type) {
          return;
        }
        this.notificationCenterType = type;
      }
    }
  }
</script>

<style scoped>
  .notification-center {
    position: absolute;
    right: 0;
    top: 30px;
    height: calc(100% - 30px);
    width: 300px;
    background-color: rgba(200, 200, 200, 0.7);
    z-index: 140;
  }

  .notification-center-header {
    height: 50px;
    text-align: center;
    border-bottom: 1px outset;
  }

  .notification-center-header div {
    width: 130px;
    height: 20px;
    margin: 15px 0;
    display: inline-block;
    font-size: 14px;
    color: #eaeaea;
    background-color: rgba(121, 121, 121, 0.5);
  }

  .notification-center-header div:hover {
    cursor: pointer;
  }

  .notification-center-header div.active {
    background-color: rgba(255, 255, 255, 0.5);
    color: #000;
  }

  .notification-center-body {
    position: relative;
    height: calc(100% - 70px);
    overflow-y: auto;
  }

  .notification-center-body-calendar {
    margin: 15px 0;
  }

  .notification-center-body-calendar .notification-center-body-calendar-date {
    padding: 0 33px;
    color: #585858;
  }

  .notification-center-body-calendar-date.normal-date {
    font-size: 30px;
  }

  .notification-center-body-calendar-date.lunar-date {

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