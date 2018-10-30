<template>
	<div class="flowPool-wrap">
		<div class="content">
			<!-- 流量池列表 -->
			<div class="flow-list">
				<!-- 表格工具栏 -->
				<div class="list-tools">
					<div class="tools-top">
						<!-- 地区 -->
						<el-select class="select"
						           clearable
						           v-model="valueArea"
						           value-key="value"
						           @change="areaChange"
						           placeholder="请选择地区">
							<el-option
									v-for="item in areaOptions"
									:key="item.value"
									:label="item.area"
									:value="item.value">
							</el-option>
						</el-select>
						<!-- 流量池套餐 -->
						<el-select class="select"
						           clearable
						           value-key="value"
						           v-if="isShowPackage"
						           @change="packageChange"
						           v-model="valuePackages"
						           placeholder="请选择流量池套餐">
							<el-option
									v-for="item in packageOptions"
									:key="item.value"
									:label="item.packages"
									:value="item.value">
							</el-option>
						</el-select>
						<!-- 搜索公司名称 -->
						<el-input
								clearable
								class="search"
								@change="searchCompanyName"
								placeholder="公司名称"
								prefix-icon="el-icon-search"
								v-model="valueCompanyName">
						</el-input>
					</div>
					<div class="tools-bottom"></div>
				</div>
				<!-- 测试卡表格 -->
				<div class="table-box">
					<el-table
							:data="flowData"
							border
							style="width: 100%">
						<el-table-column prop="serialNum" label="序号" align="center"></el-table-column>
						<el-table-column prop="cardNum" label="卡号" align="center"></el-table-column>
						<el-table-column prop="iccid" label="ICCID" align="center"></el-table-column>
						<el-table-column prop="area" label="归属地" align="center"></el-table-column>
						<el-table-column prop="flowPackages" width="130" label="流量池套餐(M)(归入池)"
						                 align="center"></el-table-column>
						<el-table-column prop="actualFlow" width="130" label="实际开卡流量(M)(客户订购流量)"
						                 align="center"></el-table-column>
						<el-table-column prop="usageFlow" label="已使用流量" align="center"></el-table-column>
						<el-table-column prop="rate" label="商户流量池占比" align="center"></el-table-column>
						<el-table-column prop="customerName" label="商户名称" align="center"></el-table-column>
						<el-table-column prop="entryTime" label="录入时间" align="center"></el-table-column>
					</el-table>
					<el-pagination
							v-if="totalCount > pageSize"
							layout="total, sizes, prev, pager, next, jumper"
							:page-size="pageSize"
							:current-page="pageNo"
							:total="totalCount"
							:page-sizes="[20, 50, 100]"
							@size-change="changeSize"
							@current-change="changePageNo">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {timestampToTime,returnOperator} from '../api/dataUtil'

	export default {
		data() {
			return {
				// 地区的筛选
				areaOptions: [],
				// 运营商的值
				valueArea: '',
				defaultDictId: '',

				// 流量池套餐的筛选
				packageOptions: [],
				isShowPackage: false,
				// 流量池套餐的值
				valuePackages: '',
				defaultPoolName: '',

				// 公司名称
				valueCompanyName: '',

				// 流量池列表
				flowData: [],
				// 分页需要的数据
				totalCount: 0,
				pageSize: 5,
				pageNo: 1,
				netWork: ''
			};
		},
		beforeRouteUpdate(to, from, next) {
			next()
			this.typeChange()
		},
		mounted() {
			this.getNetWork()
			this.getAreaOptions()
		},
		methods: {
			// 改变type的类型，即跳转不同的路由
			typeChange() {
				this.netWork = this.$route.params.type
				console.log(this.netWork)


				this.valueArea = ''
				this.valuePackages = ''
				this.poolName = ''

				this.areaOptions = []
				this.packageOptions = []
				this.flowData = []


				this.getAreaOptions()
			},
			getNetWork() {
				this.netWork = this.$route.params.type
			},
			// 改变当前页数
			changePageNo(val) {
				this.pageNo = val;
			},
			// 改变每页显示的条数
			changeSize(val) {
				this.pageSize = val;
			},
			// 获取地区选项
			getAreaOptions() {
				this.$axios({
					url: '/api/manager/dict/getArea',
					method: 'post',
					params: {
						netWork: this.netWork
					}
				}).then(res => {
					let data = res.data.data
					this.valueArea = data[0].dictName
					this.defaultDictId = data[0].dictId
					for (let i = 0; i < data.length; i++) {
						this.areaOptions.push({
							area: data[i].dictName,
							value: data[i].dictId
						})
					}
					this.getPackagesOptions()
				})
			},
			// 地区选项发生变化的时候触发
			areaChange(val) {
				this.dictId = val;
				this.packageOptions = []
				this.flowData = []
				this.getPackagesOptions()
			},
			// 获取套餐选项
			getPackagesOptions() {
				this.$axios({
					url: '/api/manager/pool/getPoolNames',
					method: 'post',
					params: {
						netWork: this.netWork,
						dictId: this.dictId ? this.dictId : this.defaultDictId
					}
				}).then(res => {
					let data = res.data.data
					this.valuePackages = data[0]
					this.defaultPoolName = data[0]
					for (let i = 0; i < data.length; i++) {
						this.packageOptions.push({
							packages: data[i],
							value: data[i]
						})
					}
					this.getTableData()
				})
			},
			// 套餐选项发生变化的时候触发
			packageChange(val) {
				this.poolName = val;

				this.flowData = []
				this.getTableData()
			},
			// 获取表格数据
			getTableData() {
				if (!this.poolName && !this.defaultPoolName) {
					return
				}
				this.$axios({
					url: '/api/manager/pool/list',
					method: 'post',
					params: {
						netWork: this.netWork,
						poolName: this.poolName ? this.poolName : this.defaultPoolName,
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						companyName: this.valueCompanyName
					}
				}).then(res => {
					let data = res.data.data
					this.totalCount = data.totalCount
					for (let i = 0; i < data.length; i++) {
						this.flowData.push({
							serialNum: data[i].no,
							contactName: data[i].userName,
							companyName: data[i].companyName,
							operator: returnOperator(data[i].netWork),
							area: data[i].area,
							actualFlow: data[i].poolSize,
							entryTime: timestampToTime(data[i].insertTime)
						})
					}
				})
			},
			// 输入公司名称
			searchCompanyName() {
				this.flowData = []
				this.getTableData()
			},
			// 点击查看详情
			goDetail(data) {
				let deviceId = data.deviceId
				this.$router.push({
					path: '/flowPoolDetail',
					query: {
						deviceId: deviceId
					}
				})
			}
		},
		watch: {
			'flowData'(val) {
				if (val.length > 0) {
					this.isShowPackage = true
				}
			}
		}
	};
</script>

<style lang="stylus" scoped>
	mainBlue = #4cb2ff;
	.flowPool-wrap {
		padding-top: 50px;
		padding-left: 200px;
		.content {
			width: 100%;
			height: calc(100vh - 50px);
			padding: 20px;
			overflow-y: scroll;
			/* 流量池列表 */
			.flow-list {
				width: 100%;
				border-radius: 5px;
				box-shadow: 0 0 5px rgba(187, 187, 187, 0.8);
				padding: 40px;
				/* 表格工具栏 */
				.list-tools {
					.tools-top {
						display: flex;
						flex: 10;
						.search {
							width: 300px;
							margin-left: 40px;
						}
						.select {
							width: 200px;
							margin-right: 40px;
						}
					}
				}
				/* 测试卡表格 */
				.table-box {
					margin-top: 50px;
					.cell {
						.more {
							cursor: pointer;
							color: mainBlue;
						}
					}
					.el-pagination {
						text-align: center;
						margin-top: 20px;
					}
				}
			}
		}
	}
</style>