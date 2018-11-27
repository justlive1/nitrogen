<template>
  <div class="dock">
    <div class="dock-mask"></div>
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
      },
      initDockItem: function (dockItems, dockMask) {
        for (let i = 0; i < dockItems.length; i++) {
          dockItems[i].width = 60;
        }
        dockMask.style.width = dockItems.length * 60 + 40 + 'px';
      },
      mouseOnDockItem: function (e, dockWrap, dockItems, dockMask) {
        e = e || window.event;
        let originalMaskWidth = 0;
        for (let i = 0; i < dockItems.length; i++) {
          let x = e.clientX - (dockItems[i].offsetLeft + dockItems[i].offsetWidth / 2);
          let y = dockItems[i].offsetTop + this.getOffsetTop(dockWrap) + dockItems[i].offsetHeight
              / 2 - e.clientY;
          let imgScale = 1 - Math.sqrt(x * x + y * y) / 300;
          if (imgScale < 0.5) {
            imgScale = 0.5;
          }
          dockItems[i].width = 120 * imgScale;
          originalMaskWidth += dockItems[i].width;
        }
        dockMask.style.width = originalMaskWidth + 40 + 'px';
      }
    },
    mounted() {
      const dockWrap = document.getElementsByClassName('dock-container')[0];
      const dockItems = document.getElementsByClassName('dock-item');
      const dockMask = document.getElementsByClassName('dock-mask')[0];
      this.initDockItem(dockItems, dockMask);
      dockWrap.addEventListener('mousemove',
          e => this.mouseOnDockItem(e, dockWrap, dockItems, dockMask));
      dockWrap.addEventListener('mouseleave', () => this.initDockItem(dockItems, dockMask));
    }
  }
</script>

<style scoped>

  .dock {
    width: 100%;
    height: 65px;
    z-index: 120;
    position: absolute;
    bottom: 0px;
  }

  .dock .dock-mask {
    background-color: rgba(255, 255, 255, 0.45);
    width: 520px;
    height: 65px;
    border-radius: 5px;
    margin: 0 auto;
  }

  .dock .dock-container {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
    z-index: 120;
  }

  .dock .dock-container img {
  }

</style>