<template>
	<div class="newAdd-wrap">
		<div class="content">
			<!-- 编辑详情 -->
			<div class="edit">
				<!--  编辑的header-->
				<div class="edit-header">
					<div class="tips"><i></i><span>新增客户</span></div>
					<div class="save" @click="save">保存</div>
				</div>
				<!-- 提交的表单 -->
				<div class="edit-form">
					<div class="form-row">
						<!-- 客户名称 -->
						<div class="customer-name form-item">
							<div class="label">
								<div class="icon"></div>
								<span>客户名称<i>*</i> :</span>
							</div>
							<el-input
									clearable
									placeholder="请输入客户名称"
									v-model="form.customerName">
							</el-input>
						</div>
						<!-- 公司名称 -->
						<div class="company-name form-item">
							<div class="label">
								<div class="icon"></div>
								<span>公司名称<i>*</i> :</span>
							</div>
							<el-input
									clearable
									placeholder="请输入公司名称"
									v-model="form.companyName">
							</el-input>
						</div>
					</div>
					<div class="form-row">
						<!-- 客户账号 -->
						<div class="customer-account form-item">
							<div class="label">
								<div class="icon"></div>
								<span>客户账号<i>*</i> :</span>
							</div>
							<el-input
									clearable
									placeholder="请输入客户账号"
									v-model="form.customerAccount">
							</el-input>
						</div>
						<!-- 设置密码 -->
						<div class="set-password form-item">
							<div class="label">
								<div class="icon"></div>
								<span>设置密码<i>*</i> :</span>
							</div>
							<el-input
									clearable
									type="password"
									placeholder="请设置密码"
									v-model="form.password">
							</el-input>
						</div>
					</div>
					<div class="form-row">
						<!-- 销售电话 -->
						<div class="sales-phone form-item">
							<div class="label">
								<div class="icon"></div>
								<span>销售电话<i>*</i> :</span>
							</div>
							<el-input
									clearable
									placeholder="请输入销售电话"
									v-model="form.salesPhone">
							</el-input>
						</div>
						<!-- 销售经理 -->
						<div class="sales-manager form-item">
							<div class="label">
								<div class="icon"></div>
								<span>销售经理<i>*</i> :</span>
							</div>
							<el-input
									clearable
									placeholder="请输入销售经理的姓名"
									v-model="form.salesManager">
							</el-input>
						</div>
					</div>
					<div class="form-row">
						<!-- 邮件 -->
						<div class="email form-item">
							<div class="label">
								<div class="icon"></div>
								<span>电子邮件<i>*</i> :</span>
							</div>
							<el-input
									clearable
									placeholder="请输入邮箱"
									v-model="form.email">
							</el-input>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					customerName: '',
					companyName: '',
					customerAccount: '',
					password: '',
					salesPhone: '',
					salesManager: '',
					email: '',
				}
			};
		},
		mounted() {

		},
		methods: {
			// 保存按钮
			save() {
				this.$axios({
					url: '/api/manager/customer/updateCustomer',
					method: 'post',
					params: {
						userName: this.form.customerName,
						companyName: this.form.companyName,
						phone: this.form.customerAccount,
						password: this.form.password,
						sellMobile: this.form.salesPhone,
						sellManager: this.form.salesManager,
						email: this.form.email
					}
				}).then(res => {
					this.$message.success('保存成功！');
					this.form.customerName = ''
					this.form.companyName = ''
					this.form.customerAccount = ''
					this.form.password = ''
					this.form.salesPhone = ''
					this.form.salesManager = ''
					this.form.email = ''
				})
			}
		}
	};
</script>

<style lang="stylus" scoped>
	mainBlue = #4cb2ff;
	.newAdd-wrap {
		padding-top: 50px;
		padding-left: 200px;
		.content {
			width: 100%;
			height: calc(100vh - 50px);
			padding: 20px;
			overflow-y: scroll;
			/* 编辑详情 */
			.edit {
				width: 100%;
				border-radius: 5px;
				box-shadow: 0 0 5px rgba(187, 187, 187, 0.8);
				padding: 0 46px;
				/* 编辑的header */
				.edit-header {
					height: 120px;
					line-height: 120px;
					display: flex;
					border-bottom: 1px solid #bbb;
					justify-content: space-between;
					.tips {
						display: flex;
						i {
							display: block;
							width: 6px;
							height: 28px;
							background-color: mainBlue;
							margin-right: 10px;
							margin-top: 45px;
						}
						span {
							font-size: 24px;
						}
					}
					.save {
						width: 70px;
						height: 34px;
						line-height: 34px;
						background-color: mainBlue;
						text-align: center;
						color: #fff;
						font-size: 16px;
						cursor: pointer;
						margin-top: 43px;
						border-radius: 5px;
					}
				}
				/* 提交的表单 */
				.edit-form {
					padding: 10px 48px 50px;
					.form-row {
						display: flex;
						justify-content: space-between;
						margin-top: 40px;
						.form-item {
							display: flex;
							line-height: 36px;
							.label {
								.icon {

								}
								span {
									font-size: 18px;
									i {
										font-size: 18px;
										color: red;
									}
								}
							}
							/*input {
								width: 250px;
								height: 36px;
								border: 1px solid #666666;
								font-size: 16px;
								color: #999;
								padding-left: 10px;
								margin-left: 20px;
							}*/
							.el-input {
								width: 250px;
								margin-left: 20px;
							}
						}
					}
				}
			}
		}
	}
</style>


