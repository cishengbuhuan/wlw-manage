import Vue from 'vue'
import Router from 'vue-router'

import login from '../pages/login.vue'
import index from '../pages/index.vue'
import customerList from '../pages/customerList.vue'
import newAdd from '../pages/newAdd.vue'
import netWorkCard from '../pages/netWorkCard.vue'
import recharge from '../pages/recharge.vue'
import testCard from '../pages/testCard.vue'
import testCardDetail from '../pages/testCardDetail.vue'
import cardDetail from '../pages/cardDetail.vue'
import prepaidCard from '../pages/prepaidCard.vue'
import flowPool from '../pages/flowPool.vue'
import flowRate from '../pages/flowRate.vue'
import flowPoolDetail from '../pages/flowPoolDetail.vue'
import rechargeDetails from '../pages/rechargeDetails.vue'
import deductionDetails from '../pages/deductionDetails.vue'
import invoiceManagement from '../pages/invoiceManagement.vue'
import businessBalanceDetail from '../pages/businessBalanceDetail.vue'
import dictionary from '../pages/dictionary.vue'
import system from '../pages/system.vue'
import userManage from '../pages/userManage.vue'
import userInfoDetail from '../pages/userInfoDetail.vue'
import roleManage from '../pages/roleManage.vue'
import roleDetail from '../pages/roleDetail.vue'
import roleConfig from '../pages/roleConfig.vue'

import upload from '../pages/upload.vue'
import abnormalCard from '../pages/abnormalCard.vue'
import flowCard from '../pages/flowCard.vue'

import testPages from '../pages/testPages.vue'

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
			path: '/recharge',
			name: 'recharge',
			component: recharge
		},
		{
			path: '/testCard',
			name: 'testCard',
			component: testCard
		},
		{
			path: '/testCardDetail',
			name: 'testCardDetail',
			component: testCardDetail
		},
		{
			path: '/cardDetail',
			name: 'cardDetail',
			component: cardDetail
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
			path: '/flowRate',
			name: 'flowRate',
			component: flowRate
		},
		{
			path: '/flowPoolDetail',
			name: 'flowPoolDetail',
			component: flowPoolDetail
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
			path: '/businessBalanceDetail',
			name: 'businessBalanceDetail',
			component: businessBalanceDetail
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
		},
		{
			path: '/testPages',
			name: 'testPages',
			component: testPages
		},
		{
			path: '/upload',
			name: 'upload',
			component: upload
		},
		{
			path: '/abnormalCard',
			name: 'abnormalCard',
			component: abnormalCard
		},
		{
			path: '/flowCard',
			name: 'flowCard',
			component: flowCard
		},
		{
			path: '/userManage',
			name: 'userManage',
			component: userManage
		},
		{
			path: '/userInfoDetail',
			name: 'userInfoDetail',
			component: userInfoDetail
		},
		{
			path: '/roleManage',
			name: 'roleManage',
			component: roleManage
		},
		{
			path: '/roleDetail',
			name: 'roleDetail',
			component: roleDetail
		},
		{
			path: '/roleConfig',
			name: 'roleConfig',
			component: roleConfig
		}
	]
})

export default router
