// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.moment = moment
moment.locale('en')
//fix later
Vue.use(Vuetify, {
  theme: {
    primary: 'ef8a17',
    secondary: '#e2cab3',
    accent: '#ffc682',
    error: '#b71c1c'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
