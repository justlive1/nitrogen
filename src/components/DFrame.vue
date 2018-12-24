<template>
  <div v-show="data.isShow" v-drag :class="['d-frame', {'d-frame-full': fullScreen}]" :data-id="data.id"
       v-bind:style="{left: data.leftOffset + '%', top: data.topOffset + '%', 'z-index': 125 + data.order}">
    <div class="d-frame-title" @click="frameClick()">
      <div class="d-frame-title-operation">
        <i class="fa fa-circle d-frame-operation-close" @click="closeFrame()"></i>
        <i class="fa fa-circle d-frame-operation-minus" @click="minFrame()"></i>
        <i class="fa fa-circle d-frame-operation-full" @click="changeFullScreen()"></i>
      </div>
      <div class="d-frame-title-content">
        <img :src="data.icon"/>
        <span>{{data.title}}</span>
      </div>
    </div>
    <div class="d-frame-content">
      <iframe :src="data.url"></iframe>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DFrame",
    props: {
      data: Object
    },
    data() {
      return {
        fullScreen: false
      }
    },
    methods: {
      closeFrame: function () {
        this.$store.dispatch('desktop/closeFrame', this.data);
        this.refreshDock();
      },
      changeFullScreen: function () {
        this.fullScreen = !this.fullScreen;
      },
      frameClick: function () {
        this.$store.commit('desktop/refreshFrame', this.data);
      },
      minFrame: function () {
        this.$store.commit('desktop/addMinDock', {
          id: this.data.id,
          src: this.data.icon,
          alt: this.data.title,
          type: "3"
        });
        this.refreshDock();
      },
      refreshDock: function () {
        setTimeout(function () {
          const dockItems = document.getElementsByClassName('dock-item');
          const dockMask = document.getElementsByClassName('dock-mask')[0];
          for (let i = 0; i < dockItems.length; i++) {
            dockItems[i].width = 60;
          }
          dockMask.style.width = dockItems.length * 60 + 40 + 'px';
        }, 10);
      }
    },
    directives: {
      drag(el) {
        el.onmousedown = function (e) {
          let disx = e.pageX - el.offsetLeft;
          let disy = e.pageY - el.offsetTop;
          document.onmousemove = function (e) {
            el.style.left = e.pageX - disx + 'px';
            el.style.top = e.pageY - disy + 'px';
          };
          document.onmouseup = function () {
            document.onmousemove = document.onmouseup = void 0;
          };
        }
      }
    }
  }
</script>

<style scoped>
  .d-frame {
    width: 80%;
    height: 80%;
    position: fixed;
  }

  .d-frame.d-frame-full {
    width: 100%;
    height: 100%;
    left: 0 !important;
    top: 0 !important;
  }

  .d-frame .d-frame-title {
    height: 30px;
    background-color: #e0e0e0;
    border-radius: 4px 4px 0 0;
    border-top: 1px solid #d0d0d0;
    border-left: 1px solid #d0d0d0;
    border-right: 1px solid #d0d0d0;
  }

  .d-frame-title-operation {
    position: absolute;
    line-height: 30px;
    left: 5px;
  }

  .d-frame-title-operation i {
    margin: 0 3px;
  }

  .d-frame-operation-close {
    color: red;
  }

  .d-frame-title-operation:hover .d-frame-operation-close::before {
    content: '\f057';
  }

  .d-frame-operation-minus {
    color: #fbb450;
  }

  .d-frame-title-operation:hover .d-frame-operation-minus::before {
    content: '\f056';
  }

  .d-frame-operation-full {
    color: #00d800;
  }

  .d-frame-title-operation:hover .d-frame-operation-full::before {
    content: '\f055';
  }

  .d-frame-title-content {
    line-height: 30px;
    text-align: center;
  }

  .d-frame-title-content img {
    width: 25px;
    height: 25px;
    position: relative;
    top: 3px;
  }

  .d-frame-title-content span {
    position: relative;
    top: -3px;
  }

  .d-frame-content {
    width: 100%;
    height: calc(100% - 30px);
    border-radius: 0 0 4px 4px;
    background-color: azure;
  }

  .d-frame-content iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
</style>