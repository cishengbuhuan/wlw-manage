<template>
	<div class="flowPool-wrap">
		<div class="content">
			<!-- 流量池列表 -->
			<div class="flow-list">
				<!-- 表格工具栏 -->
				<div class="list-tools">
					<div class="tools-top">
						<!-- 地区 -->
						<el-select class="select" clearable v-model="valueArea" placeholder="请选择地区">
							<el-option
									v-for="item in areaOptions"
									:key="item.value"
									:label="item.area"
									:value="item.value">
							</el-option>
						</el-select>
						<!-- 流量池套餐 -->
						<el-select class="select" clearable v-model="valuePackages" placeholder="请选择流量池套餐">
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
						<el-table-column prop="cardNum" label="联系人姓名" align="center"></el-table-column>
						<el-table-column prop="companyName" label="公司名称" align="center"></el-table-column>
						<el-table-column prop="operator" label="运营商" align="center"></el-table-column>
						<el-table-column prop="area" label="归属地" align="center"></el-table-column>
						<el-table-column prop="actualFlow" width="130" label="实际开卡流量(M)(客户订购流量)" align="center"></el-table-column>
						<el-table-column prop="entryTime" label="录入时间" align="center"></el-table-column>
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
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 地区的筛选
				areaOptions: [
					{
						area: '北京',
						value: '1'
					},
					{
						area: '上海',
						value: '2'
					},
					{
						area: '江苏',
						value: '3'
					}
				],
				// 运营商的值
				valueArea: '',

				// 流量池套餐的筛选
				packageOptions: [
					{
						packages: '10M',
						value: '1'
					},
					{
						packages: '20M',
						value: '2'
					}
				],
				// 流量池套餐的值
				valuePackages: '',

				// 公司名称
				valueCompanyName: '',

				// 流量池列表
				flowData: [
					{
						serialNum: '1',
						cardNum: '123',
						companyName: '上海¥¥¥¥¥¥公司',
						operator: '电信',
						area: '上海',
						actualFlow: '10',
						entryTime: '2018-09-09',
						operate: '查看详情'
					},
					{
						serialNum: '2',
						cardNum: '123',
						companyName: '上海¥¥¥¥¥¥公司',
						operator: '电信',
						area: '上海',
						actualFlow: '10',
						entryTime: '2018-09-09',
						operate: '查看详情'
					},
					{
						serialNum: '3',
						cardNum: '123',
						companyName: '上海¥¥¥¥¥¥公司',
						operator: '电信',
						area: '上海',
						actualFlow: '10',
						entryTime: '2018-09-09',
						operate: '查看详情'
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
					.el-pagination {
						text-align: center;
						margin-top: 20px;
					}
				}
			}
		}
	}
</style>