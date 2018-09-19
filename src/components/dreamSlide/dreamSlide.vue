<template>
	<div class="dream-slide">
		<el-col :span="24">
			<el-menu
					:default-active="index"
					active-text-color="#4cb2ff"
					class="el-menu-vertical-demo"
					unique-opened>
				<template v-for="(item,index) in menus">
					<el-submenu v-if="item.menuTwo && item.menuTwo.length > 0" :index="item.index">
						<template slot="title">
							<span>{{ item.title }}</span>
						</template>
						<el-menu-item-group v-for="(child,i) in item.menuTwo" :key="i">
							<el-menu-item :index="child.index" @click="toPath(child)">
								{{ child.titleTwo }}
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-menu-item v-else :index="item.index" @click="toPath(item)">
						<span>{{ item.title }}</span>
					</el-menu-item>
				</template>
			</el-menu>
		</el-col>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				index: '1',
				menus: [
					{
						title: '首页',
						index: '1',
						path: '/index'
					},
					{
						title: '客户管理',
						index: '2',
						menuTwo: [
							{
								titleTwo: '客户列表',
								path: '/customerList',
								index: '2-1'
							},
							{
								titleTwo: '新增客户',
								path: '/newAdd',
								index: '2-2'
							},
							{
								titleTwo: '网卡管理',
								path: '/netWorkCard',
								index: '2-3'
							}
						]
					},
					{
						title: '卡片管理',
						index: '3',
						menuTwo: [
							{
								titleTwo: '测试卡',
								path: '/testCard',
								index: '3-1'
							},
							{
								titleTwo: '预付充值卡',
								path: '/prepaidCard',
								index: '3-2'
							}
						]
					},
					{
						title: '流量池管理',
						index: '4',
						menuTwo: [
							{
								titleTwo: '中国移动',
								path: '/flowPool/1',
								index: '4-1',
								type: 1
							},
							{
								titleTwo: '中国联通',
								path: '/flowPool/2',
								index: '4-2',
								type: 2
							},
							{
								titleTwo: '中国电信',
								path: '/flowPool/3',
								index: '4-3',
								type: 3
							}
						]
					},
					{
						title: '财务管理',
						index: '5',
						menuTwo: [
							{
								titleTwo: '充值明细',
								path: '/rechargeDetails',
								index: '5-1'
							},
							{
								titleTwo: '扣款明细',
								path: '/deductionDetails',
								index: '5-2'
							},
							{
								titleTwo: '发票管理',
								path: '/invoiceManagement',
								index: '5-3'
							}
						]
					},
					{
						title: '系统设置',
						index: '6',
						menuTwo: [
							{
								titleTwo: '字典管理',
								path: '/dictionary',
								index: '6-1'
							},
							{
								titleTwo: '系统管理',
								path: '/system',
								index: '6-2'
							}
						]
					}
				]
			};
		},
		mounted() {
		},
		methods: {
			toPath(path) {
				this.$router.replace(path)
			}
		}
	};
</script>

<style lang="stylus" scoped>
	.dream-slide {
		width: 200px;
		height: 100vh;
		background-color: #334766;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 990;
		padding-top: 95px;
		.active {
			background-color: #48576a;
		}
	}
</style>
<style lang="stylus">
	.dream-slide {
		.el-col {
			ul.el-menu {
				border-right: none;
				background-color: transparent;
				li.el-menu-item {
					font-size: 18px;
					color: #bbb;
					height: 52px;
					line-height: 52px;
				}
				li.el-menu-item:hover, li.el-menu-item:focus {
					background-color: #48576a;
				}
				li.el-submenu {
					.el-submenu__title {
						font-size: 18px;
						color: #bbb;
					}
					.el-submenu__title:hover, .el-submenu__title:focus {
						background-color: #48576a;
					}
					ul {
						li.el-menu-item-group {
							height: 36px;
							line-height: 36px;
							font-size: 16px;
							color: #999;
							.el-menu-item-group__title {
								padding: 0;
							}
						}
						li.el-menu-item {
							height: 36px;
							line-height: 36px;
							font-size: 16px;
							color: #999;
						}
					}
				}

			}
		}
		/*.is-active {
		  position: relative;
		}
		.is-active:after {
		  content: '';
		  display: block;
		  width: 10px;
		  height: 100%;
		  background-color: #4cb2ff;
		  position: absolute;
		  right: 0;
		  top: 0;
		}*/
	}
</style>

