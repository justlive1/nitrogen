<template>
  <div class="dock">
    <div class="dock-container">
      <a class="dock-item">
        <span>finder</span>
        <img src="../../public/images/finder.png" alt="finder"/>
      </a>
      <a class="dock-item">
        <span>launchpad</span>
        <img src="../../public/images/launchpad.png" alt="launchpad"/>
      </a>
      <a class="dock-item">
        <span>gitee</span>
        <img src="../../public/images/gitee.png" alt="gitee"/>
      </a>
      <a class="dock-item">
        <span>github</span>
        <img src="../../public/images/github.png" alt="github"/>
      </a>
      <a class="dock-item">
        <span>blog</span>
        <img src="../../public/images/blog.png" alt="blog"/>
      </a>
      <a class="dock-item">
        <span>book</span>
        <img src="../../public/images/iBooks.png" alt="book"/>
      </a>
      <a class="dock-item">
        <span>maps</span>
        <img src="../../public/images/maps.png" alt="maps"/>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Dock",
    data() {
      return {
        originalWidth: [],
        dockX: 0,
        dockY: 0,
        dockScale: 0
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init: function () {
        let dockWrap = document.getElementsByClassName('dock-container')[0];
        let dockItems = dockWrap.getElementsByClassName('dock-item');
        for (let i = 0; i < dockItems.length; i++) {
          this.originalWidth.push(dockItems[i].offsetWidth);
          dockItems[i].width = parseInt(dockItems[i].offsetWidth / 2);
        }

        let _this = this;
        dockWrap.onmousemove = function (e) {
          e = e || window.event;
          for (let i = 0; i < dockItems.length; i++) {
            _this.dockX = e.clientX - (dockItems[i].offsetLeft + dockItems[i].offsetWidth / 2);
            _this.dockY = dockItems[i].offsetTop + _this.getOffsetTop(dockWrap)
                + dockItems[i].offsetHeight / 2
                - e.clientY;
            _this.dockScale = 1 - Math.sqrt(_this.dockX * _this.dockX + _this.dockY * _this.dockY)
                / 300;
            if (_this.dockScale < 0.5) {
              _this.dockScale = 0.5;
            }
            dockItems[i].width = _this.originalWidth[i] * _this.dockScale;
          }
        };
      },

      getOffsetTop: function (el) {
        if (el.offsetParent == null) {
          return el.offsetTop;
        }
        return el.offsetTop + this.getOffsetTop(el.offsetParent);
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

  .dock-container {
    position: relative;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.45);
    width: 440px;
    margin: 0 auto;
  }

  .dock-container a.dock-item {
    display: inline-block;
    font: bold 12px Arial, Helvetica, sans-serif;
    width: 60px;
    height: 60px;
    color: #fff;
    bottom: 0px;
    position: relative;
    text-align: center;
    text-decoration: none;
  }

  .dock-item span {
    display: none;
    position: absolute;
    top: -20px;
    width: 100%;
    text-align: center;
  }

  .dock-item:hover {
    cursor: pointer;
  }

  .dock-item:hover span {
    display: unset;
  }

  .dock-item img {
    border: none;
    width: 100%;
    height: 60px;
  }
</style>