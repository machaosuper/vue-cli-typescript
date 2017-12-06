// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import initConfig from './init-config'

Vue.config.productionTip = false

// console.log(process.env)
// if ((window as any).VERSION) {
//   console.log((window as any).VERSION)
// }
declare const VERSION: string
console.log(VERSION)
declare const API_ENV: string
console.log(API_ENV)
// initConfig()
/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})