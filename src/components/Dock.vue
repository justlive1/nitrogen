<template>
  <div class="dock">
    <div class="dock-mask"></div>
    <div class="dock-container">
      <a>
        <span>finder</span>
        <img class="dock-item" src="images/finder.png" alt="finder"/>
      </a>
      <a>
        <span>launchpad</span>
        <img class="dock-item" src="images/launchpad.png" alt="launchpad"/>
      </a>
      <a v-for="dock in this.$store.state.desktop.docks" :key="dock.alt" @click="dockClick(dock)">
        <span>{{dock.alt}}</span>
        <img class="dock-item" :src="dock.src" :alt="dock.alt"/>
      </a>
      <a @click="dockClick({type:'2', id:'maps', alt:'maps', url:'https://map.baidu.com', src: 'images/maps.png'})">
        <span>maps</span>
        <img class="dock-item" src="images/maps.png" alt="maps"/>
      </a>
      <a>
        <span>trash</span>
        <img class="dock-item" src="images/trash.png" alt="trash"/>
      </a>
    </div>
  </div>
</template>

<script>

  export default {
    name: "Dock",
    mounted() {
      let _that = this;
      // eslint-disable-next-line
      axios.get("docks.json").then(function (res) {
        res.data.forEach(function (item) {
          _that.$store.commit('desktop/addDock', item);
        });
        setTimeout(function () {
          const dockWrap = document.getElementsByClassName('dock-container')[0];
          const dockItems = document.getElementsByClassName('dock-item');
          const dockMask = document.getElementsByClassName('dock-mask')[0];
          _that.initDockItem(dockItems, dockMask);
          dockWrap.addEventListener('mousemove',
              e => _that.mouseOnDockItem(e, dockWrap, dockItems, dockMask));
          dockWrap.addEventListener('mouseleave', () => _that.initDockItem(dockItems, dockMask));
        }, 0);
      });
    },
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
          })
        }
      }
    }
  }
</script>

<style scoped>

  .dock {
    width: 100%;
    height: 70px;
    z-index: 120;
    position: absolute;
    bottom: 0;
  }

  .dock .dock-mask {
    background-color: rgba(15, 15, 0, 0.45);
    width: 520px;
    height: 70px;
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

  .dock .dock-container a span {
    display: none;
    padding: 2px 0;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.45);
    position: absolute;
    top: -25px;
    width: 105px;
    color: #fff;
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