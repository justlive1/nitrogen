/* eslint-disable */
import App from './App.vue';
import store from './store'

new Vue({
  el: '#app',
  store,
  render: h => h(App)
}).$mount('#app');