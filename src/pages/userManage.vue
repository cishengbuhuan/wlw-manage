<template>
	<div class="customerList-wrap">
		<div class="content">
			<!-- 客户列表 -->
			<div class="customer-list">
				<!-- 工具栏 -->
				<div class="list-tools">
					<!-- 上面的筛选组 -->
					<div class="search-group">
						<!-- 客户姓名/销售经理 -->
						<el-input
								class="name"
								clearable
								placeholder="客户姓名/销售经理"
								@change="btnSearch"
								v-model="search.name">
						</el-input>
						<!-- 手机号 -->
						<el-input
								class="tel"
								clearable
								@change="btnSearch"
								placeholder="手机号"
								v-model="search.phone">
						</el-input>
						<!-- 公司名称 -->
						<el-input
								class="company"
								clearable
								@change="btnSearch"
								placeholder="公司名称"
								v-model="search.company">
						</el-input>
					</div>
					<!-- 下面的按钮组 -->
					<div class="btn-group">
						<el-button type="primary" @click="addData.isShow = true">添加</el-button>
						<el-button type="danger" @click="batchDelete">删除</el-button>
						<el-button type="primary" @click="btnEnable(1)">启用</el-button>
						<el-button type="primary" @click="btnEnable(0)">禁用</el-button>
					</div>
				</div>
				<!-- 表格 -->
				<div class="list-table">
					<el-table
							:data="userData"
							border
							@select="selectRows"
							@select-all="selectAll"
							style="width: 100%">
						<el-table-column type="selection" width="55" align="center"></el-table-column>
						<el-table-column prop="account" label="登录账号" align="center"></el-table-column>
						<el-table-column prop="name" label="姓名" align="center"></el-table-column>
						<el-table-column prop="role" label="角色" align="center"></el-table-column>
						<el-table-column prop="tel" label="手机号" align="center"></el-table-column>
						<el-table-column prop="email" label="邮箱" align="center"></el-table-column>
						<el-table-column prop="status" label="当前状态" width='70' align="center"></el-table-column>
						<el-table-column label="操作" align="center" width="300">
							<template slot-scope="scope">
								<span @click="btnWatch(scope.row)">查看</span>
								<span @click="btnEdit(scope.row)">修改</span>
								<span @click="roleConfig(scope.row)">角色配置</span>
								<span @click="resetPsw(scope.row)">密码重置</span>
								<span @click="btnDisable(scope.row)">禁用</span>
								<span @click="btnDelete(scope.row)">删除</span>
							</template>
						</el-table-column>
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
		<!-- 添加用户的弹出框 -->
		<div class="add-user-modal" @click.self="addData.isShow = false" v-show="addData.isShow">
			<div class="add-box">
				<div class="box-header">添加用户</div>
				<div class="box-body">
					<div class="form">
						<!-- 登录账号 -->
						<div class="form-item">
							<div class="label">
								<div class="icon"></div>
								<span>登录账号<i>*</i> :</span>
							</div>
							<el-input
									clearable
									placeholder="请输入登录账号"
									v-model="addData.form.loginAccount">
							</el-input>
						</div>
						<!-- 真实姓名 -->
						<div class="form-item">
							<div class="label">
								<div class="icon"></div>
								<span>真实姓名<i>*</i> :</span>
							</div>
							<el-input
									clearable
									placeholder="请输入真实姓名"
									v-model="addData.form.name">
							</el-input>
						</div>
						<!-- 手机号码 -->
						<div class="form-item">
							<div class="label">
								<div class="icon"></div>
								<span>手机号码<i>*</i> :</span>
							</div>
							<el-input
									clearable
									placeholder="请输入手机号码"
									v-model="addData.form.tel">
							</el-input>
						</div>
						<!-- 邮箱地址 -->
						<div class="form-item">
							<div class="label">
								<div class="icon"></div>
								<span>邮箱地址<i>*</i> :</span>
							</div>
							<el-input
									clearable
									placeholder="请输入邮箱地址"
									v-model="addData.form.email">
							</el-input>
						</div>
						<!-- 按钮组 -->
						<div class="btn-group">
							<el-button type="primary" @click="saveEdit(1)">保存</el-button>
							<el-button @click="saveEdit(0)">取消</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 编辑详情的弹出框 -->
		<div class="edit-detail-modal" @click.self="editData.editDetail = false" v-show="editData.editDetail">
			<div class="edit-box">
				<div class="box-header">编辑详情</div>
				<div class="box-body">
					<div class="form">
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
										v-model="editData.form.customerName">
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
										v-model="editData.form.companyName">
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
										v-model="editData.form.customerAccount">
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
										v-model="editData.form.password">
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
										v-model="editData.form.salesPhone">
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
										v-model="editData.form.salesManager">
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
										v-model="editData.form.email">
								</el-input>
							</div>
						</div>
						<!-- 保存按钮 -->
						<div class="save" @click="saveEdit">保存</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {timestampToTime, format} from '../api/dataUtil'

	export default {
		data() {
			return {
				// 搜索框的相关值
				search: {
					name: '',
					phone: '',
					company: ''
				},
				// 客户列表
				userData: [
					{
						account: '1234567890',
						name: '张三',
						role: '管理员',
						tel: '12345678',
						email: '12345678jhtgrfe',
						status: '已启用'
					},
					{
						account: '1234567890',
						name: '张三',
						role: '管理员',
						tel: '12345678',
						email: '12345678jhtgrfe',
						status: '已启用'
					}
				],
				// 分页需要的数据
				totalCount: 0,
				pageSize: 20,
				pageNo: 1,

				// 表格流量排序
				sortData: '',
				direct: '',

				// 编辑详情的弹框
				editData: {
					editDetail: false,
					form: {
						customerName: '',
						companyName: '',
						customerAccount: '',
						password: '',
						salesPhone: '',
						salesManager: '',
						email: '',
					}
				},

				// 添加用户
				addData: {
					isShow: false,
					form: {
						loginAccount: '',
						name: '',
						tel: '',
						email: ''
					}
				},
				// 当前选中的数组
				currentArr: []
			};
		},
		mounted() {
			this.getUserList()
		},
		methods: {
			// 改变当前页数
			changePageNo(val) {
				this.pageNo = val;
				this.getUserList();
			},
			// 改变每页显示的条数
			changeSize(val) {
				this.pageSize = val;
				this.getUserList();
			},
			// 选中某几行
			selectRows(selection, row) {
				this.currentArr = selection
			},
			// 全选
			selectAll(selection){
				this.currentArr = selection
			},

			// 获取用户列表
			getUserList() {
				this.$axios({
					url: '/api/manager/customer/list',
					method: 'post',
					params: {
						pageSize: this.pageSize,
						pageNo: this.pageNo,
						userName: this.search.name,
						phone: this.search.phone,
						companyName: this.search.company,
					}
				}).then(res => {
					let data = res.data.data
					this.totalCount = res.data.totalCount
					this.customerData = []
					for (let i = 0; i < data.length; i++) {
						this.customerData.push({
							sortNum: data[i].no,
							contactName: data[i].userName,
							contactTel: data[i].phone,
							password: data[i].password,
							email: data[i].email,
							companyName: data[i].companyName,
							balance: data[i].amount,
							salesManager: data[i].realName,
							salesTel: data[i].sellMobile,
							whetherEnable: data[i].enable == '1' ? '是' : '否',
							companyId: data[i].companyId
						})
					}
				})
			},

			// 批量删除
			batchDelete(){
				if (this.currentArr.length == 0) {
					this.$message('请选择至少一项进行操作！');
				}else {
					this.$confirm('是否批量删除选中的项?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				}
			},
			// 启用、禁用按钮
			btnEnable(i) {
				if (this.currentArr.length == 0) {
					this.$message('请选择至少一项进行操作！');
				} else {
					let phoneStr = ''
					for (let i = 0; i < this.currentArr.length; i++) {
						phoneStr += ',' + this.currentArr[i].contactTel
					}
					let resStr = phoneStr.slice(1, phoneStr.length)

					this.$axios({
						url: '/api/manager/customer/modifyStatus',
						method: 'post',
						params: {
							mobiles: resStr,
							enable: i
						}
					}).then(res => {
						if (res.data.code == 1) {
							if (i == 1) {
								this.$message.success('启用成功！');
							} else {
								this.$message.success('禁用成功！');
							}
						}
						this.customerData = []
						this.getUserList()
					})
				}
			},
			// 筛选组
			btnSearch() {
				this.customerData = [];
				this.pageNo = 1
				this.getUserList()
			},
			// 点击编辑详情按钮
			btnEdit(row) {
				this.editData.editDetail = true

				let form = this.editData.form;
				form.customerName = row.contactName
				form.companyName = row.companyName
				form.customerAccount = row.contactTel
				form.salesPhone = row.salesTel
				form.salesManager = row.salesManager
				form.email = row.email
				form.companyId = row.companyId
			},
			// 点击保存按钮
			saveEdit() {
				this.$axios({
					url: '/api/manager/customer/updateCustomer',
					method: 'post',
					params: {
						userName: this.editData.form.customerName,
						companyName: this.editData.form.companyName,
						phone: this.editData.form.customerAccount,
						password: this.editData.form.password,
						sellMobile: this.editData.form.salesPhone,
						sellManager: this.editData.form.salesManager,
						email: this.editData.form.email,
						companyId: this.editData.form.companyId
					}
				}).then(res => {
					this.$message.success('保存成功！');
					this.editData.editDetail = false;

					this.getUserList()
				})
			},

			// ----------------------------- 表格内的操作 -----------------------------
			// 查看详情
			btnWatch(data){
				let companyId = data.companyId
				this.$router.push({
					path: '/userInfoDetail',
					query: {
						companyId: companyId
					}
				})
			}
		}
	};
</script>

<style lang="stylus" scoped>
	mainBlue = #4cb2ff;
	.customerList-wrap {
		padding-top: 50px;
		padding-left: 200px;
		.content {
			width: 100%;
			height: calc(100vh - 50px);
			padding: 20px;
			overflow-y: scroll;
			/* 客户列表 */
			.customer-list {
				width: 100%;
				padding: 30px 30px 40px 30px;
				box-shadow: 0 0 5px rgba(187, 187, 187, 0.8);
				border-radius: 5px;
				/* 工具栏 */
				.list-tools {
					width: 100%;
					/* 上面的搜索组 */
					.search-group {
						display: flex;
						flex: 3;
						height: 40px;
						.name {
							width: 180px;
						}
						.tel {
							width: 180px;
							margin: 0 40px;
						}
						.company {
							width: 200px;
						}
					}
					/* 下面的按钮组 */
					.btn-group {
						margin-top: 20px;
					}
				}
				/* 表格 */
				.list-table {
					margin-top: 30px;
					.cell {
						span {
							color: mainBlue;
							cursor: pointer;
						}
					}
					.el-pagination {
						margin-top: 30px;
						text-align: center;
					}
				}
			}
		}
		/* 添加的弹出框 */
		.add-user-modal {
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 999;
			background-color: rgba(0, 0, 0, 0.2);
			.add-box {
				width: 40%;
				height: 60%;
				background-color: #fff;
				border-radius: 5px;
				position: absolute;
				transform: translate(-50%, -50%);
				left: 50%;
				top: 50%;
				.box-header {
					width: 100%;
					height: 50px;
					line-height: 50px;
					background-color: mainBlue;
					border-top-left-radius: 5px;
					border-top-right-radius: 5px;
					font-size: 22px;
					color: #fff;
					text-align: center;
				}
				.box-body {
					padding: 0 10%;
					.form-item {
						display: flex;
						line-height: 36px;
						margin-top: 20px;
						.label {
							flex: 1;
							span {
								font-size: 18px;
								i {
									font-size: 18px;
									color: red;
								}
							}
						}
						.el-input {
							flex: 3;
						}
					}
					.btn-group {
						display: flex;
						justify-content: center;
						margin-top: 20px;
					}
				}
			}
		}
		/* 编辑详情的弹出框 */
		.edit-detail-modal {
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 999;
			background-color: rgba(0, 0, 0, 0.2);
			.edit-box {
				width: 80%;
				height: 80%;
				background-color: #fff;
				border-radius: 5px;
				position: absolute;
				transform: translate(-50%, -50%);
				left: 50%;
				top: 50%;
				.box-header {
					width: 100%;
					height: 50px;
					line-height: 50px;
					background-color: mainBlue;
					border-top-left-radius: 5px;
					border-top-right-radius: 5px;
					font-size: 22px;
					color: #fff;
					text-align: center;
				}
				.box-body {
					padding: 0 10%;
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
							.el-input {
								width: 250px;
								margin-left: 20px;
							}
						}
					}
					.save {
						width: 70px;
						height: 34px;
						background-color: mainBlue;
						border-radius: 5px;
						cursor: pointer;
						color: #fff;
						text-align: center;
						line-height: 34px;
						font-size: 18px;
						margin: 50px auto 0;
					}
				}
			}
		}
	}
</style>


