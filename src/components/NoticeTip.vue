<template>
  <transition name="tip-slide">
    <div class="notice-tip" v-show="count > 0">
      <div class="notice-tip-icon">
        <img :src="icon"/>
      </div>
      <div class="notice-tip-content">
        <div class="notice-tip-content-title">{{title}}</div>
        <div class="notice-tip-content-body" v-html="body"></div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "NoticeTip",
    data() {
      return {
        icon: '',
        title: '',
        body: '',
        count: 0
      }
    },
    created() {
      let _that = this;
      if (window.noticeTipIntervalArr) {
        window.noticeTipIntervalArr.forEach(item => clearInterval(item));
      }
      window.noticeTipIntervalArr = [setInterval(function () {
        _that.count -= 1;
      }, 1000)];
    },
    methods: {
      showTip: function (notice) {
        this.icon = notice.icon;
        this.title = notice.title;
        this.body = notice.body;
        this.count = 3;
      }
    }
  }
</script>

<style scoped>
  .notice-tip {
    position: absolute;
    right: 10px;
    top: 40px;
    height: 60px;
    width: 250px;
    background-color: rgba(200, 200, 200, 0.7);
    z-index: 140;
    border-radius: 5px;
  }

  .notice-tip-icon {
    display: inline-block;
    float: left;
  }

  .notice-tip-icon img {
    width: 40px;
    height: 40px;
    margin: 8px;
  }

  .notice-tip-content {
    display: inline-block;
    padding: 8px;
    width: 170px;
  }

  .notice-tip-content-title {
    color: #333333;
  }

  .notice-tip-content-body {
    color: #333333;
    overflow: hidden;
    height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .tip-slide-enter-active {
    transition: all 0.5s;
  }

  .tip-slide-leave-active {
    transition: all 0.5s;
  }

  .tip-slide-enter, .tip-slide-leave-to {
    transform: translateX(260px);
  }
</style>