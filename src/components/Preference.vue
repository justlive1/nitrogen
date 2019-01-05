<template>
  <div class="preference" v-if="this.$store.state.desktop.preferenceVisiable">
    <div class="preference-item" @click="aboutUs()">关于我们</div>
    <div class="preference-split"></div>
    <div class="preference-item" @click="exitWindow()">退出</div>
  </div>
</template>

<script>
  export default {
    name: "Preference",
    methods: {
      aboutUs: function () {
        this.$store.dispatch('desktop/addFrame', {
          id: "SP0",
          icon: 'images/apple.png',
          title: '关于我们',
          html: `<div style="position:absolute;top: 80px;left: 20px;">
                  <div>作者邮箱: qq11419041@163.com</div>
                  <div>使用组件：vue、vuex、font-awesome</div>
                </div>
                <a href="https://gitee.com/justlive1/nitrogen" target="_blank" style="position:absolute;top: 30px;right:0;">
                  <img height="140" src="https://gitee.com/justlive1/nitrogen/widgets/widget_1.svg" alt="Fork me on Gitee" />
                </a>`,
          width: 360,
          height: 170
        });
      },
      exitWindow: function () {
        window.close();
      }
    }
  }
</script>

<style scoped>
  .preference {
    position: absolute;
    left: 8px;
    top: 30px;
    background-color: rgba(75, 75, 75, 0.6);
    z-index: 120;
    color: #fff;
    width: 150px;
    cursor: pointer;
    padding: 5px 0;
  }

  .preference-item {
    padding: 2px 15px;
    font-weight: 300;
    font-size: small;
  }

  .preference-item:hover {
    background-color: rgba(49, 156, 241, 0.71);
  }

  .preference-split {
    height: 1px;
    background: #9a9a9a;
    margin: 5px 0;
  }
</style>