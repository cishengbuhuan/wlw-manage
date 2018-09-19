<template>
	<div class="testCard-wrap">
		<div class="content">
			<!-- 测试卡列表 -->
			<div class="customer-list">
				<!-- 表格工具栏 -->
				<div class="list-tools">
					<div class="tools-top">
						<!-- 搜索iccid -->
						<el-input
								clearable
								class="search"
								placeholder="请输入ICCID"
								prefix-icon="el-icon-search"
								v-model="valueIccid">
						</el-input>
						<!-- 运营商 -->
						<el-select class="select" clearable v-model="valueOperator" placeholder="请选择运营商">
							<el-option
									v-for="item in operatorOptions"
									:key="item.value"
									:label="item.operator"
									:value="item.value">
							</el-option>
						</el-select>
						<!-- 卡种类 -->
						<el-select class="select" clearable v-model="valueCardKind" placeholder="请选择卡种类">
							<el-option
									v-for="item in kindOptions"
									:key="item.value"
									:label="item.kind"
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
							:data="testData"
							border
							style="width: 100%">
						<el-table-column prop="serialNum" label="序号" align="center"></el-table-column>
						<el-table-column prop="cardNum" label="卡号" align="center"></el-table-column>
						<el-table-column prop="companyName" label="公司名称" align="center"></el-table-column>
						<el-table-column prop="operator" label="运营商" align="center"></el-table-column>
						<el-table-column prop="area" label="归属地" align="center"></el-table-column>
						<el-table-column prop="actualFlow" width="130" label="实际开卡流量(M)(客户订购流量)" align="center"></el-table-column>
						<el-table-column prop="entryTime" label="录入时间" align="center"></el-table-column>
						<el-table-column prop="cardKind" label="卡种类" align="center"></el-table-column>
						<el-table-column prop="silenceDuration" label="沉默期时长" align="center"></el-table-column>
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
				// iccid号
				valueIccid: '',
				// 运营商的筛选
				operatorOptions: [
					{
						operator: '中国移动',
						value: '1'
					},
					{
						operator: '中国联通',
						value: '2'
					},
					{
						operator: '中国电信',
						value: '3'
					}
				],
				// 运营商的值
				valueOperator: '',
				// 卡种类的筛选
				kindOptions: [
					{
						kind: '大卡',
						value: '1'
					},
					{
						kind: '小卡',
						value: '2'
					}
				],
				// 卡种类的值
				valueCardKind: '',
				// 公司名称
				valueCompanyName: '',
				// 测试卡列表
				testData: [
					{
						serialNum: '1',
						cardNum: '123',
						companyName: '上海¥¥¥¥¥¥公司',
						operator: '电信',
						area: '上海',
						actualFlow: '10',
						entryTime: '2018-09-09',
						cardKind: '大卡',
						silenceDuration: '1年',
						operate: '查看详情'
					},
					{
						serialNum: '1',
						cardNum: '123',
						companyName: '上海¥¥¥¥¥¥公司',
						operator: '电信',
						area: '上海',
						actualFlow: '10',
						entryTime: '2018-09-09',
						cardKind: '大卡',
						silenceDuration: '1年',
						operate: '查看详情'
					},
					{
						serialNum: '1',
						cardNum: '123',
						companyName: '上海¥¥¥¥¥¥公司',
						operator: '电信',
						area: '上海',
						actualFlow: '10',
						entryTime: '2018-09-09',
						cardKind: '大卡',
						silenceDuration: '1年',
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
	.testCard-wrap {
		padding-top: 50px;
		padding-left: 200px;
		.content {
			width: 100%;
			height: calc(100vh - 50px);
			padding: 20px;
			overflow-y: scroll;
			/* 测试卡列表 */
			.customer-list {
				width: 100%;
				border-radius: 5px;
				box-shadow: 0 0 5px rgba(187, 187, 187, 0.8);
				padding: 40px;
				/* 表格工具栏 */
				.list-tools {
					.tools-top {
						display: flex;
						flex: 10;
						justify-content: space-between;
						.search {
							/*flex: 2;*/
							/*margin-right: 50px;*/
							width: 300px;
						}
						.select {
							/*flex: 1;*/
							width: 200px;
						}
					}
				}
				/* 测试卡表格 */
				.table-box {
					margin-top: 70px;
					.el-pagination {
						text-align: center;
						margin-top: 20px;
					}
				}
			}
		}
	}
</style>


