import Vue from 'vue'
import App from '../user/App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import router from '../admin/router'

Vue.config.productionTip = false

import VueCropper from 'vue-cropper'
import Cookie from '../../utils/cookie'
Vue.use(VueCropper)


// import store from '../user/store'

new Vue({
  router,
  // store,
  render: h => h(App),
}).$mount('#app')
