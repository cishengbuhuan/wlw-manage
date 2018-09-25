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
							<router-link to="/newAdd">
								<div class="edit-detail">编辑详情</div>
							</router-link>
							<router-link to="/netWorkCard">
								<div class="network-manage">网卡管理</div>
							</router-link>
							<router-link to="amountManage">
								<div class="amount-manage">金额管理</div>
							</router-link>
						</div>
						<div class="bottom">
							<div class="btn-enable">启用</div>
							<div class="btn-disable">禁用</div>
						</div>
					</div>
					<!-- 右侧的搜索框 -->
					<div class="search-group">
						<!-- 客户姓名/销售经理 -->
						<el-input
								class="name"
								clearable
								placeholder="客户姓名/销售经理"
								v-model="search.name">
						</el-input>
						<!-- 手机号 -->
						<el-input
								class="tel"
								clearable
								placeholder="手机号"
								v-model="search.phone">
						</el-input>
						<!-- 公司名称 -->
						<el-input
								class="company"
								clearable
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
						<el-table-column prop="password" label="账户密码" align="center"></el-table-column>
						<el-table-column prop="email" label="电子邮箱" width='70' align="center"></el-table-column>
						<el-table-column prop="companyName" label="公司名称" align="center"></el-table-column>
						<el-table-column prop="balance" label="账户余额(元)" align="center"></el-table-column>
						<el-table-column prop="salesManager" label="销售经理" align="center"></el-table-column>
						<el-table-column prop="salesTel" label="销售电话" align="center"></el-table-column>
						<el-table-column prop="operate" label="操作" align="center"></el-table-column>
						<el-table-column prop="whetherEnable" label="是否启用" align="center"></el-table-column>
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
				direct: ''
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
				console.log(selection)
				console.log(row)
			},
			// 获取客户统计的数据
			getCustomerTotal(){
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
			getUserList(){
				this.$axios({
					url: '/api/manager/customer/list',
					method: 'post',
					params: {
						pageSize: this.pageSize,
						pageNo: this.pageNo
					}
				}).then(res => {
					let data = res.data.data
					this.totalCount = res.data.totalCount
					for(let i=0; i<data.length; i++){
						this.customerData.push({
							sortNum: data[i].sortNum,
							contactName: data[i].userName,
							contactTel: data[i].phone,
							password: data[i].password,
							email: data[i].email,
							companyName: data[i].companyName,
							balance: data[i].amount,
							salesManager: data[i].sortNum,
							salesTel: data[i].sortNum,
							operate: data[i].sortNum,
							whetherEnable: data[i].sortNum
						})
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
					.el-pagination {
						margin-top: 30px;
						text-align: center;
					}
				}
			}
		}
	}
</style>


