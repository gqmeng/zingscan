import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import draggable from 'vuedraggable';
import VueGridLayout from 'vue-grid-layout';
import App from './App';
import store from './store';
import eventBus from './eventBus.js';
import axios from 'axios';
import moment from 'moment'
import Toasted from 'vue-toasted';

Vue.use(Toasted,{position:'bottom-center',theme:'outline',duration:2000})

require('es6-promise').polyfill();
// Bootstrap 4
require('jquery');
require('tether');
require('bootstrap');
require('lodash');

// debug mode
Vue.config.debug = false;
Vue.prototype.$http = axios
Vue.prototype.$moment = moment
Vue.prototype.$eventBus= eventBus
// install router
Vue.use(VueRouter);

//install vuex
Vue.use(Vuex);

// create router
const routes = [
                { path : '/', component : require('./components/frontpage.vue')	}
                      	    ];

const router = new VueRouter({
	routes : routes,
  history: true,
  hashbang : false,
});


var vm = new Vue({
	router : router,
	el: '#app',
  store,
	data : {},
	components:{	App: App	},
	created: function(){
    // console.log('Racktrack Web Application');
  	this.$eventBus.$on("return", function(){
			router.push({ path: '/' });
		});
	}
	}).$mount('#app');
