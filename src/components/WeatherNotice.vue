<template>
  <notice>
    <template slot="notice-header-icon">
      <img class="notice-header-icon-img" src="images/weather.png"/>
    </template>
    <template slot="notice-header-title">
      天气
    </template>
    <template slot="notice-body">
      <div class="weather-item">
        <div class="weather-city">{{weather.city}}</div>
        <div class="weather-type">{{weather.type}}</div>
        <div class="weather-temperature">{{weather.temperature}}</div>
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
  .weather-item {
    height: 35px;
    line-height: 35px;
  }

  .weather-item div {
    display: inline-block;
    text-align: center;
  }

  .weather-city {
    width: 20%;
    float: left;
  }

  .weather-type {
    width: 55%;
    text-align: right !important;
  }

  .weather-temperature {
    width: 20%;
    float: right;
  }
</style>