<template>
  <transition name="slide">
    <div class="message" v-show="messageVisible">
      <div class="message-header">
        <div :class="{active: messageType === 0}" @click="messageTypeChange(0)">今天</div>
        <div :class="{active: messageType === 1}" @click="messageTypeChange(1)">通知</div>
      </div>
      <div class="message-body">

      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "Message",
    props: ['messageVisible'],
    data() {
      return {
        messageType: 0
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