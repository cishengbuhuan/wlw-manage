import Vue from 'vue'
import Router from 'vue-router'

import login from '../pages/login.vue'
import index from '../pages/index.vue'
import customerList from '../pages/customerList.vue'
import newAdd from '../pages/newAdd.vue'
import netWorkCard from '../pages/netWorkCard.vue'
import testCard from '../pages/testCard.vue'
import prepaidCard from '../pages/prepaidCard.vue'
import flowPool from '../pages/flowPool.vue'
import rechargeDetails from '../pages/rechargeDetails.vue'
import deductionDetails from '../pages/deductionDetails.vue'
import invoiceManagement from '../pages/invoiceManagement.vue'
import dictionary from '../pages/dictionary.vue'
import system from '../pages/system.vue'

Vue.use(Router)

const router = new Router({
	linkActiveClass: 'active',
	routes: [
		{
			path: '/',
			redirect: '/login'
		},
		{
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/index',
			name: 'index',
			component: index
		},
		{
			path: '/customerList',
			name: 'customerList',
			component: customerList
		},
		{
			path: '/newAdd',
			name: 'newAdd',
			component: newAdd
		},
		{
			path: '/netWorkCard',
			name: 'netWorkCard',
			component: netWorkCard
		},
		{
			path: '/testCard',
			name: 'testCard',
			component: testCard
		},
		{
			path: '/prepaidCard',
			name: 'prepaidCard',
			component: prepaidCard
		},
		{
			path: '/flowPool/:type',
			name: 'flowPool',
			component: flowPool
		},
		{
			path: '/rechargeDetails',
			name: 'rechargeDetails',
			component: rechargeDetails
		},
		{
			path: '/deductionDetails',
			name: 'deductionDetails',
			component: deductionDetails
		},
		{
			path: '/invoiceManagement',
			name: 'invoiceManagement',
			component: invoiceManagement
		},
		{
			path: '/dictionary',
			name: 'dictionary',
			component: dictionary
		},
		{
			path: '/system',
			name: 'system',
			component: system
		}
	]
})

export default router
