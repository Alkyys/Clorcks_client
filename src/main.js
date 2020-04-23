import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAnalytics from 'vue-analytics'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'UA-159949389-1',
  router
})

Vue.use(VueClipboard)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
