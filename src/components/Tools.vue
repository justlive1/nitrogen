<template>
  <div class="tools">
    <div class="tools-left">
      <div class="tools-icon"><span class="fa fa-apple"></span></div>
      <div class="tools-icon"><span class="fa fa-safari"></span></div>
    </div>
    <div class="tools-middle"></div>
    <div class="tools-right">
      <div class="tools-icon copyright">
        <img src="images/beian.png" style="float: left;">
        <span class="copyright-beian">粤公网安备 44010302000485号</span>
        <span class="copyright-icp">粤ICP备18059277号-1</span>
        <span>&nbsp;</span>
      </div>
      <div class="tools-icon"><span class="fa fa-battery-full"></span></div>
      <timer></timer>
      <div class="tools-icon tools-notification-center" @click="notificationCenterClick()"><span
          class="fa fa-list-ul"></span>
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
      return {notificationCenterVisible: false}
    },
    methods: {
      notificationCenterClick: function () {
        this.notificationCenterVisible = !this.notificationCenterVisible;
        this.$emit('showNotificationCenter', this.notificationCenterVisible);
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
  }

  .tools-icon {
    text-align: center;
    width: 30px;
    height: 100%;
    display: inline-block;
  }

  .tools-icon.copyright {
    width: 200px;
    font-size: 10px;
    position: relative;
  }

  .copyright-beian {
    position: absolute;
    left: 25px;
    top: -7px;
  }

  .copyright-icp {
    position: absolute;
    left: 25px;
    top: 7px;
  }

  .tools .tools-icon:hover {
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