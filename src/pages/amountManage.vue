<template>
	<div class="amountManage-wrap">
		<div class="content">
			<!-- 资金详情 -->
			<div class="amount-detail">
				<!-- nav-tab -->
				<div class="nav-tab">
					<span>资金详情</span>
					<!-- tab栏切换 -->
					<div class="nav">
						<div :class="[{current: navIndex == 0},'nav-item']" @click="toggleNav(0)">平台充值</div>
						<div :class="[{current: navIndex == 1},'nav-item']" @click="toggleNav(1)">线下转账</div>
						<div :class="[{current: navIndex == 2},'nav-item']" @click="toggleNav(2)">账户明细</div>
					</div>
				</div>
				<!-- nav-content -->
				<div class="nav-content">
					<!-- 平台充值 -->
					<div class="recharge" v-show="navIndex == 0">
						<!-- 基本信息 -->
						<div class="base-info">
							<div class="tips">基本信息</div>
							<div class="info-content">
								<div class="company-balance">
									<div class="company-name">
										<span>公司名称：</span>
										<div>{{ platformRecharge.baseInfo.companyName }}</div>
									</div>
									<div class="account-balance">
										<span>账户余额：</span>
										<div>{{ platformRecharge.baseInfo.accountBalance }}元</div>
									</div>
								</div>
								<div class="contact-name">
									<span>联系人姓名：</span>
									<div>{{ platformRecharge.baseInfo.contactName }}</div>
								</div>
							</div>
						</div>
						<!-- 充值金额 -->
						<div class="recharge-amount">
							<div class="tips">充值金额</div>
							<div class="amount-content">
								<ul>
									<li v-for="(item,index) in platformRecharge.rechargeAmount.amount"
									    :class="[{current: item.isChecked}]"
									    @click="toggleRechargeAmount(index)"
									    :key="index">
										{{ item.num }}
									</li>
									<li :class="[{current: platformRecharge.rechargeAmount.customAmount != '自定义金额'}]">
										<input type="tel"
										       @blur="toggleHolder(1)"
										       @focus="toggleHolder(0)"
										       v-model="platformRecharge.rechargeAmount.customAmount">
									</li>
								</ul>
								<div class="btn-recharge" @click="btnRecharge">立即充值</div>
							</div>
						</div>
					</div>
					<!-- 线下转账 -->
					<div class="offline" v-show="navIndex == 1">
						<el-table
								:data="offline.tableData"
								border
								style="width: 100%">
							<el-table-column prop="transfer" label="转款人" align="center"></el-table-column>
							<el-table-column prop="bank" label="转款银行" align="center"></el-table-column>
							<el-table-column prop="cardNumber" label="银行卡号" align="center"></el-table-column>
							<el-table-column prop="time" label="转款时间" align="center"></el-table-column>
							<el-table-column prop="amount" label="充值金额" width='70' align="center"></el-table-column>
							<el-table-column label="操作" align="center">
								<template slot-scope="scope">
									<span class="sure" @click="openSure(scope.row)">确认到账</span>
									<span class="refuse" @click="openSure(scope.row)">拒绝</span>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<!-- 账户明细 -->
					<div class="account-detail" v-show="navIndex == 2">
						<!-- 账户明细的tab栏切换 -->
						<div class="nav-account">
							<div class="nav-item" @click="toggleAccountNav(0)"
							     :class="[{ current: accountDetail.navAccount == 0 }]">充值记录
							</div>
							<div class="nav-item" @click="toggleAccountNav(1)"
							     :class="[{ current: accountDetail.navAccount == 1 }]">消费记录
							</div>
						</div>
						<!-- 账户明细的内容 -->
						<div class="account-content">
							<!-- 充值记录 -->
							<div class="recharge-record" v-show="accountDetail.navAccount == 0">
								<el-table
										:data="accountDetail.recharge.rechargeRecord"
										border
										style="width: 100%">
									<el-table-column prop="amount" label="充值金额" align="center"></el-table-column>
									<el-table-column prop="time" label="充值时间" align="center"></el-table-column>
									<el-table-column prop="way" label="充值方式" align="center"></el-table-column>
								</el-table>
							</div>
							<!-- 消费记录 -->
							<div class="expenses-record" v-show="accountDetail.navAccount == 1">
								<el-table
										:data="accountDetail.expenses.expensesRecord"
										border
										style="width: 100%">
									<el-table-column prop="type" label="消费类型" align="center"></el-table-column>
									<el-table-column prop="amount" label="消费金额" align="center"></el-table-column>
									<el-table-column prop="time" label="消费时间" align="center"></el-table-column>
									<el-table-column prop="way" label="扣款方式" align="center"></el-table-column>
								</el-table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {timestampToTime} from '../api/dataUtil'

	export default {
		data() {
			return {
				// tab切换的索引
				navIndex: 0,
				accountId: '',
				// 平台充值
				platformRecharge: {
					// 基本信息
					baseInfo: {
						companyId: '',
						companyName: '',
						accountBalance: '',
						contactName: ''
					},
					// 充值金额
					rechargeAmount: {
						// 充值金额的选项
						amount: [
							{
								num: '1000',
								isChecked: false
							},
							{
								num: '3000',
								isChecked: false
							},
							{
								num: '5000',
								isChecked: false
							},
							{
								num: '8000',
								isChecked: false
							},
							{
								num: '10000',
								isChecked: false
							}
						],
						// 自定义金额
						customAmount: '自定义金额',
						// 当前选中的金额
						currentAmount: ''
					}
				},
				// 线下转账
				offline: {
					tableData: []
				},
				// 账户明细
				accountDetail: {
					navAccount: 0,
					// 充值记录的表格数据
					recharge: {
						rechargeRecord: [],
					},
					// 消费记录的表格数据
					expenses: {
						expensesRecord: []
					}
				}
			};
		},
		mounted() {
			this.getParams()
			this.getOfflineRecord()
			this.getRechargeRecord()
			this.getExpensesRecord()
			this.getAccountBalance()
			this.getAccountInfo()
		},
		methods: {
			// 获取到传递过来的参数
			getParams(){
				this.platformRecharge.baseInfo.companyId = this.$route.query.companyId
				this.platformRecharge.baseInfo.companyName = this.$route.query.companyName
				this.platformRecharge.baseInfo.contactName = this.$route.query.contactName
//				console.log(this.companyId,this.companyName,this.contactName)
			},
			// 获取到当前登录者的信息
			getAccountInfo(){
				this.$axios({
					url: '/api/pay/getAccount',
					method: 'post'
				}).then(res => {
					let data = res.data.data
					this.accountId = data.accountid
					console.log(data,this.accountId)
				})
			},
			// 切换头部的tab栏
			toggleNav(i) {
				this.navIndex = i;
			},
			// ---------------- 平台充值的相关方法 ----------------
			// 获取到账户余额
			getAccountBalance(){
				this.$axios({
					url: '/api/pay/getCompany',
					method: 'post'
				}).then(res => {
					let data = res.data.data
					this.platformRecharge.baseInfo.accountBalance = data.amount
				})
			},
			// 切换选中的充值金额
			toggleRechargeAmount(index) {
				let amount = this.platformRecharge.rechargeAmount.amount
				for (let i = 0; i < amount.length; i++) {
					amount[i].isChecked = false;
				}
				amount[index].isChecked = true;

				this.platformRecharge.rechargeAmount.customAmount = '自定义金额'
				this.platformRecharge.rechargeAmount.currentAmount = parseInt(amount[index].num);
			},

			toggleHolder(state) {
				if (!state) {
					this.platformRecharge.rechargeAmount.customAmount = ''
					for (let i = 0; i < this.platformRecharge.rechargeAmount.amount.length; i++) {
						this.platformRecharge.rechargeAmount.amount[i].isChecked = false;
					}
				} else {
					if (this.platformRecharge.rechargeAmount.customAmount == '') {
						this.platformRecharge.rechargeAmount.customAmount == '自定义金额'
					}
				}
			},
			// 点击充值
			btnRecharge(){
				this.$confirm('确认充值嘛?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
						url: '/api/pay/order/save',
						method: 'post',
						params: {
							amount: this.platformRecharge.rechargeAmount.currentAmount,
							companyId: this.platformRecharge.baseInfo.companyId,
							payType: 1
						}
					}).then(res => {
						if(res.data.code === 1){
							this.$message.success(res.data.msg);
							this.getAccountBalance()
						}else {
							this.$message.error(res.data.msg);
						}
					})
				}).catch(() => {
					console.log(this)
					this.$message({
						type: 'info',
						message: '已取消充值！'
					});
				});
			},
			// ---------------- 线下转账的相关方法 ----------------
			// 获取线下转账记录
			getOfflineRecord() {
				this.$axios({
					url: '/api/manager/finance/offline/list',
					method: 'post'
				}).then(res => {
					let data = res.data.data
					this.totalCount = res.data.totalCount
					for (let i = 0; i < data.length; i++) {
						this.offline.tableData.push({
							transfer: data[i].userName,
							bank: data[i].bankName,
							cardNumber: data[i].bankNo,
							time: timestampToTime(data[i].transferTime),
							amount: data[i].amount,
							operate: data[i].type,
						})
					}
				})
			},
			// ---------------- 账户明细的相关方法 ----------------
			toggleAccountNav(i) {
				this.accountDetail.navAccount = i;
			},
			// 获取充值记录
			getRechargeRecord() {
				this.$axios({
					url: '/api/manager/finance/pay/list',
					method: 'post',
					params: {}
				}).then(res => {
					let data = res.data.data
					this.totalCount = res.data.totalCount
					for (let i = 0; i < data.length; i++) {
						this.accountDetail.recharge.rechargeRecord.push({
							amount: data[i].amount,
							time: timestampToTime(data[i].insertTime),
							way: data[i].type
						})
					}
				})
			},
			// 获取消费记录
			getExpensesRecord() {
				this.$axios({
					url: '/api/manager/finance/account/list',
					method: 'post'
				}).then(res => {
					let data = res.data.data
					this.totalCount = res.data.totalCount
					for (let i = 0; i < data.length; i++) {
						this.accountDetail.expenses.expensesRecord.push({
							type: data[i].type,
							amount: data[i].amount,
							time: timestampToTime(data[i].inserTime),
							way: data[i].type
						})
					}
				})
			}
		},
		watch: {
			'platformRecharge.rechargeAmount.customAmount'(val) {
//				console.log(this.platformRecharge.rechargeAmount.customAmount)
				if (val != '自定义金额') {
					this.platformRecharge.rechargeAmount.currentAmount = val
				}
			}
		}
	};
</script>

<style lang="stylus" scoped>
	mainBlue = #4cb2ff;
	.amountManage-wrap {
		padding-top: 50px;
		padding-left: 200px;
		.content {
			width: 100%;
			height: calc(100vh - 50px);
			padding: 20px;
			overflow-y: scroll;
			/* 资金详情 */
			.amount-detail {
				width: 100%;
				box-shadow: 0 0 5px rgba(187, 187, 187, 0.8);
				border-radius: 5px;
				padding: 20px 52px 0;
				margin-bottom: 20px;
				/* nav-tab */
				.nav-tab {
					border-bottom: 1px solid #bbb;
					display: flex;
					padding-bottom: 15px;
					span {
						font-size: 26px;
						line-height: 60px;
						margin-right: 100px;
					}
					/* tab栏切换 */
					.nav {
						display: flex;
						.nav-item {
							font-size: 22px;
							line-height: 60px;
							margin-right: 80px;
							cursor: pointer;
						}
						.current {
							color: mainBlue;
							border-bottom: 5px solid mainBlue;
						}
					}
				}
				/* nav-content */
				.nav-content {
					/* 平台充值 */
					.recharge {
						padding: 0 80px;
						/* 基本信息 */
						.base-info {
							border-bottom: 1px solid #bbb;
							.tips {
								font-size: 20px;
								line-height: 50px;
								margin-top: 20px;
							}
							.info-content {
								padding-bottom: 20px;
								.company-balance {
									display: flex;
								}
								.company-name, .account-balance, .contact-name {
									line-height: 40px;
									display: flex;
									span {
										font-size: 16px;
										color: #999;
									}
									div {
										font-size: 16px;
									}
								}
								.account-balance {
									margin-left: 100px;
									div {
										font-size: 24px;
									}
								}
							}
						}
						/* 充值金额 */
						.recharge-amount {
							padding-bottom: 40px;
							.tips {
								font-size: 20px;
								line-height: 50px;
								margin-top: 20px;
							}
							.amount-content {
								ul {
									width: 470px;
									display: flex;
									justify-content: space-between;
									flex-wrap: wrap;
									li {
										width: 120px;
										height: 40px;
										line-height: 40px;
										border: 1px solid #999;
										border-radius: 5px;
										font-size: 20px;
										text-align: center;
										cursor: pointer;
										margin-bottom: 40px;
										input {
											width: 100%;
											height: 100%;
											font-size: 20px;
											text-align: center;
											color: #333;
										}
									}
									.current {
										color: mainBlue;
										border-color: mainBlue;
									}
								}
								.btn-recharge {
									width: 160px;
									height: 40px;
									line-height: 40px;
									border-radius: 5px;
									background-color: mainBlue;
									color: #fff;
									font-size: 18px;
									text-align: center;
									cursor: pointer;
								}
							}
						}
					}
					/* 线下转账 */
					.offline {
						padding: 20px 0;
						.cell {
							.sure {
								cursor: pointer;
								color: mainBlue;
							}
							.refuse {
								cursor: pointer;
								color: #ff4c87;
								margin-left: 20px;
							}
						}
					}
					/* 账户明细 */
					.account-detail {
						/* 账户明细的tab栏切换 */
						.nav-account {
							display: flex;
							height: 60px;
							line-height: 60px;
							border-bottom: 1px solid #bbb;
							.nav-item {
								font-size: 20px;
								margin-right: 80px;
								cursor: pointer;
							}
							.current {
								color: mainBlue;
							}
						}
						/* 账户明细的内容 */
						.account-content {
							padding: 20px 0;
						}
					}
				}
			}
		}
	}
</style>