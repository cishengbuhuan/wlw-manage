<template>
	<div class="recharge-wrap">
		<div class="content">
			<!-- 基本信息 -->
			<div class="base-info">
				<div class="tips">基本信息</div>
				<div class="info-content">
					<div class="company-balance">
						<div class="company-name">
							<span>公司名称：</span>
							<div>{{ baseInfo.companyName }}</div>
						</div>
						<div class="account-balance">
							<span>账户余额：</span>
							<div>{{ baseInfo.accountBalance }}元</div>
						</div>
					</div>
					<div class="contact-name">
						<span>联系人姓名：</span>
						<div>{{ baseInfo.contactName }}</div>
					</div>
				</div>
			</div>
			<!-- 充值金额 -->
			<div class="recharge-amount">
				<div class="tips">充值金额</div>
				<div class="nav">
					<el-radio v-model="nav" label="0">线下交收</el-radio>
					<el-radio v-model="nav" label="1">银行转帐</el-radio>
				</div>
				<div class="form-content">
					<!-- 线下交收 -->
					<div class="offline" v-show="nav == 0">
						<el-form ref="form" :model="formOffline" label-width="90px">
							<el-form-item label="充值金额：">
								<el-input v-model="formOffline.amount"></el-input>
							</el-form-item>
							<el-form-item label="入款账号：">
								<el-input v-model="formOffline.account"></el-input>
							</el-form-item>
							<el-form-item label="充值时间：">
								<el-date-picker
										v-model="formOffline.rechargeTime"
										type="date"
										placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
							<el-form-item label="凭证上传：">
								<el-upload
										action="123"
										ref="upload">
									<div class="btn-upload">选择文件</div>
								</el-upload>
							</el-form-item>
						</el-form>
					</div>
					<!-- 银行转帐 -->
					<div class="bank" v-show="nav == 1">
						<el-form ref="form" :model="formBank" label-width="90px">
							<el-form-item label="转账银行：">
								<el-input v-model="formBank.bank"></el-input>
							</el-form-item>
							<el-form-item label="转账账号：">
								<el-input v-model="formBank.transferAccount"></el-input>
							</el-form-item>
							<el-form-item label="入款账号：">
								<el-input v-model="formBank.depositAccount"></el-input>
							</el-form-item>
							<el-form-item label="充值金额：">
								<el-input v-model="formBank.amount"></el-input>
							</el-form-item>
							<el-form-item label="充值时间：">
								<el-date-picker
										v-model="formBank.rechargeTime"
										type="date"
										placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
							<el-form-item label="凭证上传：">
								<el-upload
										action="123"
										ref="upload">
									<div class="btn-upload">选择文件</div>
								</el-upload>
							</el-form-item>
						</el-form>
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
				// 基本信息
				baseInfo: {
					companyId: '',
					companyName: '',
					accountBalance: 0,
					contactName: ''
				},
				nav: '0',
				// 线下交收
				formOffline: {
					amount: '',
					account: '',
					rechargeTime: ''
				},
				// 银行转帐
				formBank: {
					bank: '',
					transferAccount: '',
					depositAccount: '',
					amount: '',
					rechargeTime: ''
				}
			};
		},
		mounted() {
			this.getParams()
			this.getAccountBalance()
			this.getAccountInfo()
		},
		methods: {
			// 获取到传递过来的参数
			getParams(){
				this.platformRecharge.baseInfo.companyId = this.$route.query.companyId
				this.platformRecharge.baseInfo.companyName = this.$route.query.companyName
				this.platformRecharge.baseInfo.contactName = this.$route.query.contactName
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
			}
		}
	};
</script>

<style lang="stylus" scoped>
	mainBlue = #4cb2ff;
	.recharge-wrap {
		padding-top: 50px;
		padding-left: 200px;
		.content {
			width: 100%;
			height: calc(100vh - 50px);
			padding: 20px;
			overflow-y: scroll;
			/* 基本信息 */
			.base-info {
				width: 100%;
				border-radius: 5px;
				box-shadow: 0 0 5px rgba(187, 187, 187, 0.8);
				padding: 20px 40px 40px;
				margin-bottom: 20px;
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
				width: 100%;
				border-radius: 5px;
				box-shadow: 0 0 5px rgba(187, 187, 187, 0.8);
				padding: 20px 40px 40px;
				.tips {
					font-size: 20px;
					line-height: 50px;
					margin-top: 20px;
				}
				.nav {
					margin-bottom: 20px;
					display: flex;
					justify-content: center;
				}
				.form-content {
					.btn-upload {
						background-color: mainBlue;
						border-radius: 5px;
						color: #fff;
						padding: 0 10px;
					}
				}
			}
		}
	}
</style>