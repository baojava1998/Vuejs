/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require('./bootstrap');
import Vue from 'vue'
import App from './app.vue';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import axios from 'axios';
import { routes } from './routes';

import Default from './layout/Default';
import Login from './layout/Login';
import Paginate from 'vuejs-paginate'
import store from './store/index';
import { initialize } from "./helpers/general";
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false
Vue.component('paginate', Paginate)
Vue.component('default-layout', Default);
Vue.component('login-layout', Login);

window.Vue = Vue

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',
}))
const router = new VueRouter({
    mode: 'history',
    routes: routes
});

initialize(store, router);

const app = new Vue({
    el: '#app',
    router: router,
    store,
    render: h => h(App),
});
