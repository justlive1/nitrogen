<template>
  <notice v-if="this.$store.state.desktop.weather">
    <template slot="notice-header-icon">
      <img class="notice-header-icon-img" src="images/weather.png"/>
    </template>
    <template slot="notice-header-title">
      天气
    </template>
    <template slot="notice-body">
      <div class="weather-item">
        <div class="weather-city">
          <span class="weather-city-time">{{currentTime()}}</span>
          <span class="weather-city-text">{{this.$store.state.desktop.weather.city}}</span>
        </div>
        <div class="weather-type">
          <img :src="this.$store.state.desktop.weather.icon"
               :alt="this.$store.state.desktop.weather.type"/>
        </div>
        <div class="weather-temperature">{{this.$store.state.desktop.weather.temperature}}</div>
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
    methods: {
      currentTime: function () {
        let hour = this.$store.state.desktop.currentDate.getHours();
        let mins = this.$store.state.desktop.currentDate.getMinutes();
        let value = '上午';
        if (hour > 12) {
          value = '下午';
          hour -= 12;
        }
        value += hour + ":";
        if (mins < 10) {
          value += "0";
        }
        value += mins;
        return value;
      }
    }
  }
</script>

<style scoped>
  .weather-item {
    height: 50px;
  }

  .weather-item div {
    display: inline-block;
    text-align: center;
  }

  .weather-city {
    float: left;
  }

  .weather-city .weather-city-time {
    display: block;
    font-size: 10px;
    font-weight: 400;
    text-align: left;
    margin: 5px 0 2px 10px;
    color: #868585;
  }

  .weather-city .weather-city-text {
    font-size: 15px;
    font-weight: 400;
    display: block;
    text-align: left;
    margin: 0 0 5px 10px;
  }

  .weather-type {
    position: absolute;
    right: 70px;
  }

  .weather-type img {
    width: 30px;
    margin: 5px;
  }

  .weather-temperature {
    float: right;
    font-size: 35px;
    font-weight: 200;
    margin-right: 10px;
  }
</style>