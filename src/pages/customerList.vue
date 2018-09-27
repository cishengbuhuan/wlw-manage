<template>
	<div class="customerList-wrap">
		<div class="content">
			<!-- 客户统计 -->
			<div class="customer-total">
				<div class="total-header"><i></i><span>客户统计</span></div>
				<div class="total-box">
					<!-- 总客户数 -->
					<div class="info-item">
						<div class="tips total"><i></i><span>总客户数</span></div>
						<div class="num">{{ customerCount.total }}</div>
					</div>
					<!-- 在线数 -->
					<div class="info-item">
						<div class="tips online"><i></i><span>在线数</span></div>
						<div class="num">{{ customerCount.online }}</div>
					</div>
					<!-- 离线数 -->
					<div class="info-item">
						<div class="tips offline"><i></i><span>离线数</span></div>
						<div class="num">{{ customerCount.offline }}</div>
					</div>
					<!-- 欠费数 -->
					<div class="info-item arrears">
						<div class="tips arrears"><i></i><span>欠费数</span></div>
						<div class="num">{{ customerCount.arrears }}</div>
					</div>
				</div>
			</div>
			<!-- 客户列表 -->
			<div class="customer-list">
				<!-- 工具栏 -->
				<div class="list-tools">
					<!-- 左侧的按钮组 -->
					<div class="btn-group">
						<div class="top">
							<div class="edit-detail" @click="btnEdit()">编辑详情</div>
							<router-link to="/netWorkCard">
								<div class="network-manage">网卡管理</div>
							</router-link>
							<router-link to="amountManage">
								<div class="amount-manage">金额管理</div>
							</router-link>
						</div>
						<div class="bottom">
							<div class="btn-enable" @click="btnEnable(1)">启用</div>
							<div class="btn-disable" @click="btnEnable(0)">禁用</div>
						</div>
					</div>
					<!-- 右侧的搜索框 -->
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
				</div>
				<!-- 表格 -->
				<div class="list-table">
					<el-table
							:data="customerData"
							border
							@select="selectRows"
							style="width: 100%">
						<el-table-column type="selection" width="55" align="center"></el-table-column>
						<!--<el-table-column prop="isSelected" label="选项" align="center"></el-table-column>-->
						<el-table-column prop="sortNum" label="序号" align="center"></el-table-column>
						<el-table-column prop="contactName" label="联系人姓名" align="center"></el-table-column>
						<el-table-column prop="contactTel" label="联系人电话" align="center"></el-table-column>
						<el-table-column prop="password" v-if="false" label="账户密码" align="center"></el-table-column>
						<el-table-column prop="email" label="电子邮箱" width='70' align="center"></el-table-column>
						<el-table-column prop="companyName" label="公司名称" align="center"></el-table-column>
						<el-table-column prop="balance" label="账户余额(元)" align="center"></el-table-column>
						<el-table-column prop="salesManager" label="销售经理" align="center"></el-table-column>
						<el-table-column prop="salesTel" label="销售电话" align="center"></el-table-column>
						<el-table-column prop="whetherEnable" label="是否启用" align="center"></el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<div class="more" @click="goDetail(scope.row)">查看详情</div>
								<div class="amount" @click="manageAmount(scope.row)">金额管理</div>
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
		<!-- 编辑详情的弹出框 -->
		<div class="edit-detail-modal" @click.self="closeEditDetail" v-show="editData.editDetail">
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
				// 客户统计
				customerCount: {
					total: 0,
					online: 0,
					offline: 0,
					arrears: 0
				},
				// 搜索框的相关值
				search: {
					name: '',
					phone: '',
					company: ''
				},
				// 客户列表
				customerData: [],
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

				// 当前选中的数组
				currentArr: []
			};
		},
		mounted() {
			this.getCustomerTotal()
			this.getUserList()
		},
		computed: {},
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
			selectRows(selection, row) {
//				console.log(selection)
//				console.log(row)

				this.currentArr = selection
			},
			// 获取客户统计的数据
			getCustomerTotal() {
				this.$axios({
					url: '/api/manager/customer/statistics',
					method: 'post'
				}).then(res => {
					let data = res.data.data
					this.customerCount.total = data.customerCount
					this.customerCount.online = data.onlineCount
					this.customerCount.offline = data.offlineCount
					this.customerCount.arrears = data.debetCount
				})
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
							operate: data[i].sortNum,
							whetherEnable: data[i].enable,
							companyId: data[i].companyId
						})
					}
				})
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
				this.getUserList()
			},
			// 查看详情
			goDetail(data) {
				let phone = data.phone
				this.$router.push({
					path: '/cardDetail',
					query: {
						phone: phone
					}
				})
//				console.log(data)
			},
			// 金额管理
			manageAmount(data) {
				let companyId = data.companyId
				this.$router.push({
					path: '/amountManage',
					query: {
						companyId: companyId
					}
				})
			},
			// 点击编辑详情按钮
			btnEdit() {
				if (this.currentArr.length == 0) {
					this.$message('请先选中要编辑的选项！');
				} else if (this.currentArr.length == 1) {
					this.editData.editDetail = true

					this.editData.form.customerName = this.currentArr[0].contactName
					this.editData.form.companyName = this.currentArr[0].companyName
					this.editData.form.customerAccount = this.currentArr[0].contactTel
					this.editData.form.password = this.currentArr[0].password
					this.editData.form.salesPhone = this.currentArr[0].salesTel
					this.editData.form.salesManager = this.currentArr[0].salesManager
					this.editData.form.email = this.currentArr[0].email
					this.editData.form.companyId = this.currentArr[0].companyId
					console.log(this.currentArr)
				} else {
					this.$message.error('编辑只能选择一项，不能多选！');
				}
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
			// 点击空白处让编辑详情弹框消失
			closeEditDetail() {
				this.editData.editDetail = false
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
			/* 客户统计 */
			.customer-total {
				width: 100%;
				height: 226px;
				box-shadow: 0 0 5px rgba(187, 187, 187, 0.8);
				border-radius: 5px;
				padding: 25px 52px 0;
				margin-bottom: 20px;
				.total-header {
					font-size: 24px;
					font-weight: 500;
					display: flex;
					i {
						width: 6px;
						height: 28px;
						background-color: mainBlue;
						margin-right: 10px;
						margin-top: 2px;
					}
				}
				.total-box {
					display: flex;
					justify-content: space-around;
					text-align: center;
					margin-top: 30px;
					.info-item {
						.tips {
							display: flex;
							i {
								display: block;
								width: 14px;
								height: 14px;
								border-radius: 50%;
								margin: 7px 10px 0 0;
							}
							span {
								font-size: 22px;
							}
						}
						.total {
							i {
								background-color: mainBlue;
							}
						}
						.online {
							i {
								background-color: #72ff4c;
							}
						}
						.offline {
							i {
								background-color: #ff4c59;
							}
						}
						.arrears {
							i {
								background-color: #ff0012;
							}
						}
						.num {
							font-size: 32px;
							margin-top: 20px;
						}
					}
				}
			}
			/* 客户列表 */
			.customer-list {
				width: 100%;
				padding: 30px 30px 40px 30px;
				box-shadow: 0 0 5px rgba(187, 187, 187, 0.8);
				border-radius: 5px;
				/* 工具栏 */
				.list-tools {
					width: 100%;
					display: flex;
					/* 左侧的按钮组 */
					.btn-group {
						flex: 2;
						margin-right: 25px;
						.top {
							display: flex;
							justify-content: space-between;
							.edit-detail, .network-manage, .amount-manage {
								width: 126px;
								height: 40px;
								line-height: 40px;
								background-color: mainBlue;
								color: #fff;
								text-align: center;
								font-size: 20px;
								/*margin-right: 25px;*/
								border-radius: 5px;
								cursor: pointer;
							}
						}
						.bottom {
							display: flex;
							margin-top: 34px;
							.btn-enable, .btn-disable {
								width: 60px;
								height: 30px;
								line-height: 30px;
								border-radius: 5px;
								color: #fff;
								text-align: center;
								cursor: pointer;
								background-color: mainBlue;
								margin-left: 20px;
							}
							.btn-disable {
								background-color: #ff4c87;
							}
						}
					}
					/* 右侧的搜索框 */
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
				}
				/* 表格 */
				.list-table {
					margin-top: 30px;
					.cell {
						.more {
							cursor: pointer;
							color: mainBlue;
						}
						.amount {
							cursor: pointer;
							color: red;
						}
					}
					.el-pagination {
						margin-top: 30px;
						text-align: center;
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


