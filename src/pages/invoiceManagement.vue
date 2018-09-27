<template>
	<div class="invoiceManagement-wrap">
		<div class="content">
			<!-- 发票管理 -->
			<div class="manage-box">
				<!-- tab切换 -->
				<div class="nav">
					<div :class="[{current : navIndex == 0},'nav-item']" @click="toggleNav(0)">申请开票</div>
					<div :class="[{current : navIndex == 1},'nav-item']" @click="toggleNav(1)">开票明细</div>
				</div>
				<!-- 表格区域 -->
				<div class="manage-content">
					<!-- 申请开票 -->
					<div class="apply" v-show="navIndex == 0">
						<!-- 筛选 -->
						<div class="tools">
							<!-- 搜索公司名称 -->
							<el-input
									clearable
									class="company-name"
									placeholder="公司名称"
									v-model="apply.companyName">
							</el-input>

							<!-- 类型 -->
							<el-select class="select" clearable v-model="apply.valueType" placeholder="请选择类型">
								<el-option
										v-for="item in apply.typeOptions"
										:key="item.value"
										:label="item.type"
										:value="item.value">
								</el-option>
							</el-select>
						</div>
						<!-- 表格 -->
						<div class="table">
							<el-table
									:data="applyData"
									border
									style="width: 100%">
								<el-table-column prop="serialNum" label="流水号" align="center"></el-table-column>
								<el-table-column prop="companyName" label="公司名称" align="center"></el-table-column>
								<el-table-column prop="companyBank" label="公司银行" align="center"></el-table-column>
								<el-table-column prop="bankAccount" label="银行账户" align="center"></el-table-column>
								<el-table-column prop="address" label="地址" align="center"></el-table-column>
								<el-table-column prop="amount" label="开票金额" align="center"></el-table-column>
								<el-table-column prop="time" label="开票时间" align="center"></el-table-column>
								<el-table-column prop="type" label="发票类型" align="center"></el-table-column>
								<el-table-column prop="status" label="开票状态" align="center"></el-table-column>
								<el-table-column prop="operate" label="操作" align="center"></el-table-column>
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
					<!-- 开票明细 -->
					<div class="details" v-show="navIndex == 1">
						<!-- 筛选 -->
						<div class="tools">
							<!-- 搜索公司名称 -->
							<el-input
									clearable
									class="company-name"
									placeholder="公司名称"
									v-model="details.companyName">
							</el-input>

							<!-- 类型 -->
							<el-select class="select" clearable v-model="details.valueType" placeholder="请选择类型">
								<el-option
										v-for="item in details.typeOptions"
										:key="item.value"
										:label="item.type"
										:value="item.value">
								</el-option>
							</el-select>
						</div>
						<!-- 表格 -->
						<div class="table">
							<el-table
									:data="applyData"
									border
									style="width: 100%">
								<el-table-column prop="serialNum" label="流水号" align="center"></el-table-column>
								<el-table-column prop="companyName" label="公司名称" align="center"></el-table-column>
								<el-table-column prop="companyBank" label="公司银行" align="center"></el-table-column>
								<el-table-column prop="bankAccount" label="银行账户" align="center"></el-table-column>
								<el-table-column prop="address" label="地址" align="center"></el-table-column>
								<el-table-column prop="amount" label="开票金额" align="center"></el-table-column>
								<el-table-column prop="time" label="开票时间" align="center"></el-table-column>
								<el-table-column prop="type" label="发票类型" align="center"></el-table-column>
								<el-table-column prop="status" label="开票状态" align="center"></el-table-column>
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
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				navIndex: 0,

				// 申请开票的工具栏搜索
				apply: {
					// 公司名称
					companyName: '',
					// 类型选中值
					valueType: '',
					// 类型筛选
					typeOptions: [
						{
							type: '类型1',
							value: '1'
						},
						{
							type: '类型2',
							value: '2'
						},
						{
							type: '类型3',
							value: '3'
						}
					]
				},
				// 开票明细的工具栏搜索
				details: {
					//  公司名称
					companyName: '',
					// 类型选中值
					valueType: '',
					// 类型筛选
					typeOptions: [
						{
							type: '类型1',
							value: '1'
						},
						{
							type: '类型2',
							value: '2'
						},
						{
							type: '类型3',
							value: '3'
						}
					]
				},

				// 申请开票的表格数据
				applyData: [
					{
						serialNum: 1,
						companyName: '上海***信息技术有限公司',
						companyBank: '--',
						bankAccount: '--',
						address: '--',
						amount: '--',
						time: '2018-09-10',
						type: '预扣款',
						status: '扣款成功',
						operate: ''
					}, {
						serialNum: 1,
						companyName: '上海***信息技术有限公司',
						companyBank: '--',
						bankAccount: '--',
						address: '--',
						amount: '--',
						time: '2018-09-10',
						type: '预扣款',
						status: '扣款成功',
						operate: ''
					}, {
						serialNum: 1,
						companyName: '上海***信息技术有限公司',
						companyBank: '--',
						bankAccount: '--',
						address: '--',
						amount: '--',
						time: '2018-09-10',
						type: '预扣款',
						status: '扣款成功',
						operate: ''
					}
				],
				// 开票明细的表格数据
				detailData: [
					{
						serialNum: 1,
						contactName: '杭三',
						phone: '123456',
						companyName: '上海***信息技术有限公司',
						batch: '2018-09-09',
						time: '2018-09-10',
						way: '月扣',
						type: '预扣款',
						status: '扣款成功'
					},
					{
						serialNum: 2,
						contactName: '杭三',
						phone: '123456',
						companyName: '上海***信息技术有限公司',
						batch: '2018-09-09',
						time: '2018-09-10',
						way: '月扣',
						type: '预扣款',
						status: '扣款成功'
					},
					{
						serialNum: 3,
						contactName: '杭三',
						phone: '123456',
						companyName: '上海***信息技术有限公司',
						batch: '2018-09-09',
						time: '2018-09-10',
						way: '月扣',
						type: '预扣款',
						status: '扣款成功'
					}
				],
				// 分页需要的数据
				totalCount: 123,
				pageSize: 5,
				pageNo: 1,
			};
		},
		mounted() {

		},
		methods: {
			toggleNav(index) {
				this.navIndex = index;
			},
			// 改变当前页数
			changePageNo(val) {
				this.pageNo = val;
			},
			// 改变每页显示的条数
			changeSize(val) {
				this.pageSize = val;
			},

		}
	};
</script>

<style lang="stylus" scoped>
	mainBlue = #4cb2ff;
	.invoiceManagement-wrap {
		padding-top: 50px;
		padding-left: 200px;
		.content {
			width: 100%;
			height: calc(100vh - 50px);
			padding: 20px;
			overflow-y: scroll;
			/* 发票管理 */
			.manage-box {
				width: 100%;
				border-radius: 5px;
				box-shadow: 0 0 5px rgba(187, 187, 187, 0.8);
				padding: 20px 40px 40px;
				/* tab切换 */
				.nav {
					display: flex;
					border-bottom: 1px solid #bbb;
					padding-bottom: 15px;
					.nav-item {
						font-size: 24px;
						margin-right: 80px;
						line-height: 60px;
						cursor: pointer;
					}
					.current {
						color: mainBlue;
						border-bottom: 5px solid mainBlue;
					}
				}
				/* 表格区域 */
				.manage-content {
					/* 申请开票、开票明细 */
					.apply, .details {
						/* 筛选 */
						.tools {
							display: flex;
							margin: 50px 0;
							.el-input {
								width: 260px;
								margin-right: 40px;
							}
						}
						/* 表格 */
						.table {
							.el-pagination {
								text-align: center;
								margin-top: 20px;
							}
						}
					}
				}
			}
		}
	}
</style>


