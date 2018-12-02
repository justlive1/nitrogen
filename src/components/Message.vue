<template>
  <div class="message" v-show="messageVisible"></div>
</template>

<script>
  export default {
    name: "Message",
    props: ['messageVisible']
  }
</script>

<style scoped>
  .message {
    height: 100%;
    width: 200px;
    margin-top: 30px;
    float: right;
  }
</style>