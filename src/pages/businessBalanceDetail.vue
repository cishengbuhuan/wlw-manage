<template>
	<div class="recharge-wrap">
		<div class="content">
			<!-- 充值明细 -->
			<div class="recharge-detail">
				<!-- 表格工具栏 -->
				<div class="list-tools">
					<div class="tools-top">
						<!-- 搜索联系人姓名 -->
						<el-input
								clearable
								class="contact-name"
								placeholder="联系人姓名"
								@change="searchList"
								v-model="valueContact">
						</el-input>
						<!-- 手机号 -->
						<el-input
								clearable
								class="phone"
								placeholder="手机号"
								@change="searchList"
								v-model="valuePhone">
						</el-input>
						<!-- 搜索公司名称 -->
						<el-input
								clearable
								class="company-name"
								placeholder="公司名称"
								@change="searchList"
								v-model="valueCompanyName">
						</el-input>
					</div>
				</div>
				<!-- 充值明细表格 -->
				<div class="table-box">
					<el-table
							:data="detailData"
							border
							style="width: 100%">
						<el-table-column prop="serialNum" label="序号" align="center"></el-table-column>
						<el-table-column prop="contactName" label="联系人姓名" align="center"></el-table-column>
						<el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
						<el-table-column prop="companyName" label="公司名称" align="center"></el-table-column>
						<el-table-column prop="amount" label="账户余额" align="center"></el-table-column>
						<el-table-column prop="preAmount" label="预扣金额" align="center"></el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<div class="amount" @click="manageAmount(scope.row)">充值</div>
								<div class="edit" @click="btnEdit(scope.row)">查看详情</div>
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
	</div>
</template>

<script>
	import {timestampToTime,returnRechargeStatus,returnRechargeWay} from '../api/dataUtil'
	export default {
		data() {
			return {
				// 联系人姓名
				valueContact: '',
				// 手机号
				valuePhone: '',
				// 公司名称
				valueCompanyName: '',

				// 充值方式的筛选
				wayOptions: [
					{
						way: '平台充值',
						value: '1'
					},
					{
						way: '支付宝',
						value: '2'
					},
					{
						way: '线下转账',
						value: '3'
					}
				],
				// 充值方式的值
				valueWay: '',

				// 充值明细表格数据
				detailData: [],
				// 分页需要的数据
				totalCount: 0,
				pageSize: 20,
				pageNo: 1,
			};
		},
		mounted() {
			this.getRechargeDetail()
		},
		methods: {
			// 获取充值明细表格数据
			getRechargeDetail() {
				this.$axios({
					url: '/api/manager/finance/company/list',
					method: 'post',
					params: {
						pageSize: this.pageSize,
						pageNo: this.pageNo,
						mobile: this.valuePhone,
						userName: this.valueContact,
						companyName: this.valueCompanyName,
						payType: this.valueWay
					}
				}).then(res => {
					let data = res.data.data
					this.totalCount = res.data.totalCount
					this.detailData = []
					for (let i = 0; i < data.length; i++) {
						this.detailData.push({
							serialNum: data[i].no,
							contactName: data[i].userName,
							mobile: data[i].mobile,
							companyName: data[i].name,
							amount: data[i].amount,
							preAmount: data[i].predictPay,
						})
					}
				})
			},
			// 改变当前页数
			changePageNo(val) {
				this.pageNo = val;
				this.getRechargeDetail()
			},
			// 改变每页显示的条数
			changeSize(val) {
				this.pageSize = val;
				this.getRechargeDetail()
			},
			// 查询
			searchList(){
				this.pageNo = 1;
				this.getRechargeDetail()
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
			/* 充值明细 */
			.recharge-detail {
				width: 100%;
				border-radius: 5px;
				box-shadow: 0 0 5px rgba(187, 187, 187, 0.8);
				padding: 40px;
				/* 表格工具栏 */
				.list-tools {
					.tools-top {
						display: flex;
						flex: 10;
						/* 联系人姓名 */
						.contact-name {
							width: 260px;
						}
						/* 手机号 */
						.phone {
							width: 260px;
							margin: 0 40px;
						}
						/* 公司名称 */
						.company-name {
							width: 260px;
						}
					}
					.tools-bottom {
						margin-top: 40px;
					}
				}
				/* 测试卡表格 */
				.table-box {
					margin-top: 60px;
					.el-pagination {
						text-align: center;
						margin-top: 20px;
					}
				}
			}
		}
	}
</style>


