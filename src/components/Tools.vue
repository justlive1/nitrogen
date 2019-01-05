<template>
  <div class="tools">
    <div class="tools-left">
      <div :class="['tools-icon', {clicked:this.$store.state.desktop.preferenceVisiable}]"
           @click="togglePreference()"><span class="fa fa-apple"></span></div>
      <div class="tools-icon" @click="openSafari()"><span class="fa fa-safari"></span></div>
    </div>
    <div class="tools-middle"></div>
    <div class="tools-right">
      <div class="tools-icon"><span class="fa fa-battery-full"></span></div>
      <timer></timer>
      <div class="tools-icon tools-notification-center" @click="notificationCenterClick()">
        <span
            :class="['fa', {'fa-list-ul':notificationCenterNoMessage()}, {'fa-comment-o on-new-msg':!notificationCenterNoMessage()},{'fa-commenting-o':notificationCenterMessageFlicker()}]"></span>
      </div>
      <div class="tools-icon tools-show-desktop">
        <span>&nbsp;</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Timer from './Timer';

  export default {
    name: "Tools",
    components: {
      Timer
    },
    data() {
      return {
        notificationCenterVisible: false,
        notificationCenterMessageCount: 0,
      }
    },
    created() {
      let _that = this;
      if (window.toolIntervalArr) {
        window.toolIntervalArr.forEach(item => clearInterval(item));
      }
      window.toolIntervalArr = [setInterval(function () {
        _that.notificationCenterMessageCount += 1;
      }, 600)];
    },
    methods: {
      notificationCenterClick: function () {
        this.notificationCenterVisible = !this.notificationCenterVisible;
        this.$store.commit('desktop/changeNotificationCenterVisible',
            this.notificationCenterVisible);
      },
      notificationCenterNoMessage: function () {
        return this.$store.state.desktop.messageNotices.length === 0;
      },
      notificationCenterMessageFlicker: function () {
        return ((this.notificationCenterMessageCount % 2) === 0)
            && !this.notificationCenterNoMessage();
      },
      openSafari: function () {
        this.$store.commit("desktop/openSafari");
      },
      togglePreference: function () {
        this.$store.commit("desktop/togglePreference");
      }
    }
  }
</script>

<style scoped>
  .tools {
    width: 100%;
    position: fixed;
    top: 0;
    height: 30px;
    line-height: 30px;
    background-color: rgba(15, 15, 0, 0.4);
    z-index: 120;
    color: #fff;
  }

  .tools .tools-left {
    width: 200px;
    height: 100%;
    float: left;
    margin-left: 8px;
  }

  .tools-icon {
    text-align: center;
    width: 30px;
    height: 100%;
    display: inline-block;
  }

  .tools .tools-icon:hover, .tools .tools-icon.clicked {
    color: white;
    background-color: rgba(49, 156, 241, 0.71);
    cursor: pointer;
  }

  .tools .tools-right {
    float: right;
    height: 100%;
  }

  .tools .tools-right .tools-show-desktop {
    border-left: grey 1px solid;
    width: 5px;
    margin-left: 3px;
  }
</style>