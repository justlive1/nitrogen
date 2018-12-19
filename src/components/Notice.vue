<template>
  <div class="notice">
    <div class="notice-header">
      <span class="notice-header-icon">
        <slot name="notice-header-icon"></slot>
      </span>
      <span class="notice-header-title">
        <slot name="notice-header-title"></slot>
      </span>
    </div>
    <div class="notice-body">
      <slot name="notice-body"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Notice"
  }
</script>

<style scoped>
  .notice {
    width: 100%;
    margin: 5px 0;
  }

  .notice .notice-header {
    background-color: #dee7e7;
    height: 25px;
    border-radius: 5px 5px 0 0;
    line-height: 25px;
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