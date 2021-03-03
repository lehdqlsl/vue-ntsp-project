/*!

 =========================================================
 * Vue Light Bootstrap Dashboard - v2.0.0 (Bootstrap 4)
 =========================================================

 * Product Page: http://www.creative-tim.com/product/light-bootstrap-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { store } from "./store/store";
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ko'
import 'element-ui/lib/theme-chalk/index.css'
import VueDataTables from 'vue-data-tables'
// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'
import VueCookies from "vue-cookies";

// router setup
import routes from './routes/routes'

import './registerServiceWorker'
import {createNamespacedHelpers} from "vuex";
import axios from "axios";
import auth from "./store/auth";

// axios setting
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"

// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)
Vue.use(ElementUI, {locale} )
Vue.use(VueDataTables)
Vue.use(VueCookies)

Vue.$cookies.config("7d");
// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active',
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
})


axios.interceptors.request.use(function (config) {
  let token = Vue.$cookies.get('token');
  config.headers.token =  token;
  return config;
});

axios.interceptors.response.use(function (response) {
  return response
}, function (error){
  if(error.response.status == 401 && error.response.message != 'AUTH_002'){
    location.href="/"
  }
  return error
});


router.beforeEach((to, from, next) => {
  let token = Vue.$cookies.get('token');

  if(to.path == '/login'){
    next()
  }else if (to.name !== 'Login' && (token == null || token == 'null')) {
    location.href='/'
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  render: h => h(App),
  router
})
