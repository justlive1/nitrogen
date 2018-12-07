<template>
  <notice>
    <template slot="notice-header-icon">
      <img class="notice-header-icon-img" src="images/weather.png"/>
    </template>
    <template slot="notice-header-title">
      天气
    </template>
    <template slot="notice-body">
      <div>
        <span>{{weather.city}}</span>
        <span>{{weather.type}}</span>
        <span>{{weather.temperature}}</span>
      </div>
    </template>
  </notice>
</template>

<script>
  import Notice from './Notice';

  export default {
    name: "WeatherNotice",
    components: {
      Notice
    },
    data() {
      return {
        weather: {city: '广州', temperature: '24', type: '晴'}
      };
    }
  }
</script>

<style scoped>

</style>