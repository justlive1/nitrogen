<template>
  <d-frame :data="data" class="safari">
    <template slot="d-frame-title-content">
      <div class="safari-href">
        <input type="text" v-model="href" @keyup.enter="searchSafari()"/>
      </div>
    </template>
  </d-frame>
</template>

<script>

  import DFrame from './DFrame';

  export default {
    name: "Safari",
    components: {
      DFrame
    },
    props: {
      data: Object
    },
    data() {
      return {
        href: ''
      }
    },
    methods: {
      searchSafari: function () {
        if (this.href.indexOf("http") <= -1) {
          this.href = "http://" + this.href;
        }
        this.data.url = this.href;
      }
    }
  }
</script>

<style scoped>
  .safari .safari-href {
    text-align: center;
  }

  .safari .safari-href input {
    width: 200px;
  }
</style>