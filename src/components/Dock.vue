<template>
  <div class="dock">
    <div class="dock-container">
      <img class="dock-item" src="../../public/images/finder.png" alt="finder"/>
      <img class="dock-item" src="../../public/images/launchpad.png" alt="launchpad"/>
      <img class="dock-item" src="../../public/images/gitee.png" alt="gitee"/>
      <img class="dock-item" src="../../public/images/github.png" alt="github"/>
      <img class="dock-item" src="../../public/images/blog.png" alt="blog"/>
      <img class="dock-item" src="../../public/images/iBooks.png" alt="book"/>
      <img class="dock-item" src="../../public/images/maps.png" alt="maps"/>
      <img class="dock-item" src="../../public/images/trash.png" alt="trash"/>
    </div>
  </div>
</template>

<script>

  export default {
    name: "Dck",
    methods: {
      getOffsetTop: function (el) {
        if (el.offsetParent == null) {
          return el.offsetTop;
        }
        return el.offsetTop + this.getOffsetTop(el.offsetParent);
      }
    },
    mounted() {
      const dockWrap = document.getElementsByClassName('dock-container')[0];
      const img = document.getElementsByClassName('dock-item');
      const originalWidth = [];
      let imgScale = 0;
      let x = 0, y = 0, i = 0;
      for (i = 0; i < img.length; i++) {
        originalWidth.push(120);
        img[i].width = 60;
      }
      let _this = this;
      dockWrap.onmousemove = function (e) {
        e = e || window.event;
        for (i = 0; i < img.length; i++) {
          x = e.clientX - (img[i].offsetLeft + img[i].offsetWidth / 2);
          y = img[i].offsetTop + _this.getOffsetTop(dockWrap) + img[i].offsetHeight / 2 - e.clientY;
          imgScale = 1 - Math.sqrt(x * x + y * y) / 300;
          if (imgScale < 0.5) {
            imgScale = 0.5;
          }
          img[i].width = originalWidth[i] * imgScale;
        }

      }
    }
  }
</script>

<style scoped>

  .dock {
    width: 100%;
    bottom: 0px;
    position: absolute;
    left: 0px;
    height: 65px;
    text-align: center;
    z-index: 120;
  }

  .dock .dock-container {
    position: absolute;
    width: 100%;
    bottom: 0;
    text-align: center;
  }

  .dock .dock-container img {
  }

</style>