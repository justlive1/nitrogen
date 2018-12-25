<template>
  <div class="dock"
       v-if="this.$store.state.desktop.docks && this.$store.state.desktop.docks.length > 0">
    <div class="dock-mask"></div>
    <div class="dock-container">
      <div v-for="dock in this.$store.state.desktop.docks" :key="dock.id" class="dock-item-wrap">
        <a @click="dockClick(dock)">
          <span>{{dock.alt}}</span>
          <img class="dock-item" :src="dock.src" :alt="dock.alt"/>
        </a>
        <img v-show="dock.isOpen" class="dock-item-dot" src="images/circle.png"/>
      </div>
      <a class="dock-item-split">
        <img src="images/split.jpg" alt="split"/>
      </a>
      <div v-for="dock in this.$store.state.desktop.minDocks" :key="dock.id" class="dock-item-wrap">
        <a @click="dockClick(dock)">
          <span>{{dock.alt}}</span>
          <img class="dock-item" :src="dock.src" :alt="dock.alt"/>
        </a>
      </div>
      <div class="dock-item-wrap">
        <a>
          <span>trash</span>
          <img class="dock-item" src="images/trash.png" alt="trash"/>
        </a>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "Dock",
    methods: {
      getOffsetTop: function (el) {
        if (el.offsetParent == null) {
          return el.offsetTop;
        }
        return el.offsetTop + this.getOffsetTop(el.offsetParent);
      },
      initDockItem: function () {
        const dockWrap = document.getElementsByClassName('dock-container')[0];
        this.resetDockItem();
        dockWrap.addEventListener('mousemove', e => this.mouseOnDockItem(e, dockWrap));
        dockWrap.addEventListener('mouseleave', () => this.resetDockItem());
      },
      resetDockItem: function () {
        const dockItems = document.getElementsByClassName('dock-item');
        const dockMask = document.getElementsByClassName('dock-mask')[0];
        for (let i = 0; i < dockItems.length; i++) {
          dockItems[i].width = 60;
          if (dockItems[i].parentNode.nextElementSibling) {
            dockItems[i].parentNode.nextElementSibling.style.marginLeft = "-35px";
          }
        }
        dockMask.style.width = dockItems.length * 60 + 40 + 'px';
      },
      mouseOnDockItem: function (e, dockWrap) {
        const dockItems = document.getElementsByClassName('dock-item');
        const dockMask = document.getElementsByClassName('dock-mask')[0];
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
          if (dockItems[i].parentNode.nextElementSibling) {
            dockItems[i].parentNode.nextElementSibling.style.marginLeft = (-5 - dockItems[i].width
                / 2) + "px";
          }
          originalMaskWidth += dockItems[i].width;
        }
        dockMask.style.width = originalMaskWidth + 40 + 'px';
      },
      dockClick: function (dock) {
        if (dock.type === '1') {
          window.open(dock.url);
        } else if (dock.type === '2') {
          this.$store.dispatch('desktop/addFrame', {
            id: dock.id,
            icon: dock.src,
            title: dock.alt,
            url: dock.url
          });
        } else if (dock.type === '3') {
          this.$store.commit('desktop/resetMinFrame', dock.id);
          this.resetDockItem();
        }
      }
    }
  }
</script>

<style scoped>

  .dock {
    width: 100%;
    height: 75px;
    z-index: 120;
    position: absolute;
    bottom: 0;
  }

  .dock .dock-mask {
    background-color: rgba(15, 15, 0, 0.45);
    width: 520px;
    height: 75px;
    border-radius: 5px;
    margin: 0 auto;
  }

  .dock .dock-container {
    position: absolute;
    bottom: 5px;
    text-align: center;
    width: 100%;
    z-index: 120;
  }

  .dock .dock-container .dock-item-wrap {
    display: inline-block;
  }

  .dock .dock-container .dock-item-wrap span {
    display: none;
    padding: 2px 0;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.45);
    position: absolute;
    top: -25px;
    width: 105px;
    color: #fff;
  }

  .dock .dock-container .dock-item-dot {
    position: absolute;
    bottom: -5px;
    color: #b9b9b9;
    width: 10px;
    height: 10px;
  }

  .dock .dock-container .dock-item-split {
    margin: 0 5px;
  }

  .dock .dock-container .dock-item-split img {
    width: 1px;
    height: 60px;
  }

  .dock .dock-container img {
    max-width: 130px;
  }

  .dock .dock-container img:hover {
    cursor: pointer;
  }

  .dock .dock-container a:hover span {
    display: unset;
  }

</style>