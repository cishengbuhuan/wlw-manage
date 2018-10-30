<template>
	<div class="roleManage-wrap">
		<div class="content">
			<!-- 客户列表 -->
			<div class="customer-list">
				<!-- 工具栏 -->
				<div class="list-tools">
					<!-- 上面的筛选组 -->
					<div class="search-group">
						<!-- 角色编码 -->
						<el-input
								class="name"
								clearable
								placeholder="请输入角色编码"
								@change="btnSearch"
								v-model="search.code">
						</el-input>
						<!-- 角色名称 -->
						<el-input
								class="tel"
								clearable
								@change="btnSearch"
								placeholder="请输入角色名称"
								v-model="search.role">
						</el-input>
					</div>
					<!-- 下面的按钮组 -->
					<div class="btn-group">
						<el-button type="primary" @click="addData.isShow = true">添加</el-button>
					</div>
				</div>
				<!-- 表格 -->
				<div class="list-table">
					<el-table
							:data="roleData"
							border
							style="width: 100%">
						<el-table-column prop="code" label="角色编码" align="center"></el-table-column>
						<el-table-column prop="name" label="角色名称" align="center"></el-table-column>
						<el-table-column prop="remark" label="备注" align="center"></el-table-column>
						<el-table-column label="操作" align="center" width="300">
							<template slot-scope="scope">
								<span @click="btnWatch(scope.row)">查看</span>
								<span @click="btnEdit(scope.row)">修改</span>
								<span @click="roleConfig(scope.row)">权限配置</span>
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
						<!-- 角色编码 -->
						<div class="form-item">
							<div class="label">
								<div class="icon"></div>
								<span>角色编码<i>*</i> :</span>
							</div>
							<el-input
									clearable
									placeholder="请输入角色编码"
									v-model="addData.form.code">
							</el-input>
						</div>
						<!-- 角色名称 -->
						<div class="form-item">
							<div class="label">
								<div class="icon"></div>
								<span>角色名称<i>*</i> :</span>
							</div>
							<el-input
									clearable
									placeholder="请输入角色名称"
									v-model="addData.form.name">
							</el-input>
						</div>
						<!-- 备注 -->
						<div class="form-item">
							<div class="label">
								<div class="icon"></div>
								<span>备注<i>*</i> :</span>
							</div>
							<el-input
									clearable
									placeholder="请输入备注内容"
									type="textarea"
									v-model="addData.form.remark">
							</el-input>
						</div>
						<!-- 按钮组 -->
						<div class="btn-group">
							<el-button type="primary" @click="addSave(1)">保存</el-button>
							<el-button @click="addSave(0)">取消</el-button>
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
				roleData: [
					{
						code: '1',
						name: '张三',
						remark: '管理员'
					},
					{
						code: '2',
						name: '李四',
						remark: '管理员'
					},
					{
						code: '3',
						name: '王五',
						remark: '管理员'
					}
				],
				// 分页需要的数据
				totalCount: 0,
				pageSize: 20,
				pageNo: 1,

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
				}
			};
		},
		mounted() {
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

			// 筛选组
			btnSearch() {
				this.customerData = [];
				this.pageNo = 1
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
			// 添加角色的保存按钮
			addSave(i){
				if(i==0){
					this.$message('取消保存！');
				}else {
					this.$message.success('保存成功！');
				}
				this.addData.isShow = false
			},

			// ----------------------------- 表格内的操作 -----------------------------
			// 查看详情
			btnWatch(data){
				let companyId = data.companyId
				this.$router.push({
					path: '/roleDetail',
					query: {
						companyId: companyId
					}
				})
			},
			// 修改
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
			// 权限配置按钮
			roleConfig(data){
				let companyId = data.companyId
				this.$router.push({
					path: '/roleConfig',
					query: {
						companyId: companyId
					}
				})
			},
			// 删除
			btnDelete(data){
				this.$confirm('是否删除' + data.name + '？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message.success('删除' + data.name + '成功！');
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}
		}
	};
</script>

<style lang="stylus" scoped>
	mainBlue = #4cb2ff;
	.roleManage-wrap {
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
						.el-input, .el-textarea {
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


