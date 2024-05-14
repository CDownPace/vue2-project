import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.use(ViewUI, {
  i18n: (key, value) => i18n.t(key, value)
})
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
