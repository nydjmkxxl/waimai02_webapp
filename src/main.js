import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design'
import store from './store'
import 'view-design/dist/styles/iview.css'
import './assets/css/public/public.scss'
import './assets/css/public/icon.scss'

import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
Vue.prototype.bus = new Vue()
Vue.use(ViewUI)

Vue.config.productionTip = false
// console.log(VueAwesomeSwiper)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
