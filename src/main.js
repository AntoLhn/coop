import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import milligram from 'milligram'
import style from './assets/style.css'


//AXIOS
window.api = axios.create({
  baseURL: 'https://allweb.fun/coop/api/',
  headers: { Authorization: '7e28b2e55530903b5d3190e648a2ef8d7b961a58' }
});

Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false;

new Vue({
  beforeCreate() {
    api.interceptors.request.use(config => {
      if(this.$store.state.token) {
        config.url+='?token='+this.$store.state.token;
      }
      return config;
    })
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
