<template>
	<div class="testCard-wrap">
		<div class="content">
			<!-- 异常卡列表 -->
			<div class="customer-list">
				<!-- 表格工具栏 -->
				<div class="list-tools">
					<div class="tools-top">
						<!-- 搜索卡号或iccid -->
						<el-input
								clearable
								class="search"
								placeholder="请输入卡号或者ICCID"
								@change="selectTableList"
								prefix-icon="el-icon-search"
								v-model="valueCardNum">
						</el-input>
						<!-- 运营商 -->
						<el-select
								class="select"
								clearable
								@change="selectTableList"
								v-model="valueOperator"
								placeholder="请选择运营商">
							<el-option
									v-for="item in operatorOptions"
									:key="item.value"
									:label="item.operator"
									:value="item.value">
							</el-option>
						</el-select>
						<!-- 归属地 -->
						<el-input
								clearable
								class="search"
								placeholder="请输入归属地"
								@change="selectTableList"
								prefix-icon="el-icon-search"
								v-model="valueArea">
						</el-input>
						<!-- 行业卡 -->
						<el-select
								class="select"
								clearable
								@change="selectTableList"
								v-model="valueIndustryCard"
								placeholder="请选择行业卡">
							<el-option
									v-for="item in industryOptions"
									:key="item.value"
									:label="item.industry"
									:value="item.value">
							</el-option>
						</el-select>
						<!-- 搜索商户名称 -->
						<el-input
								clearable
								class="search"
								placeholder="请输入商户名称"
								@change="selectTableList"
								prefix-icon="el-icon-search"
								v-model="valueCompanyName">
						</el-input>
					</div>
					<div class="tools-bottom"></div>
				</div>
				<!-- 异常卡表格 -->
				<div class="table-box">
					<el-table
							:data="abnormalData"
							border
							style="width: 100%">
						<el-table-column prop="serialNum" label="序号" align="center"></el-table-column>
						<el-table-column prop="cardNum" label="卡号" align="center"></el-table-column>
						<el-table-column prop="iccid" label="ICCID" align="center"></el-table-column>
						<el-table-column prop="operator" label="运营商" align="center"></el-table-column>
						<el-table-column prop="area" label="归属地" align="center"></el-table-column>
						<el-table-column prop="industryCard" label="行业卡" align="center"></el-table-column>
						<el-table-column prop="customerName" label="商户名称" align="center"></el-table-column>
						<el-table-column prop="entryTime" label="录入时间" align="center"></el-table-column>
						<el-table-column prop="error" label="错误说明" align="center"></el-table-column>
						<el-table-column prop="remark" label="备注" align="center"></el-table-column>
						<!--<el-table-column label="操作" align="center">-->
							<!--<template slot-scope="scope">-->
								<!--<div class="more" @click="open(scope.row)">根据</div>-->
							<!--</template>-->
						<!--</el-table-column>-->
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
	import {returnOperator,timestampToTime,returnIndustryCard} from '../api/dataUtil'
	export default {
		data() {
			return {
				// 卡号
				valueCardNum: '',

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

				// 归属地的筛选
				areaOptions: [
					{
						kind: '大卡',
						value: '1'
					},
					{
						kind: '双切micro',
						value: '2'
					},
					{
						kind: '三切nano',
						value: '3'
					},
					{
						kind: '2*2贴片',
						value: '4'
					},
					{
						kind: '5*6贴片',
						value: '5'
					},
					{
						kind: 'eSim',
						value: '6'
					},
					{
						kind: 'NB',
						value: '7'
					},
					{
						kind: '其他',
						value: '8'
					}
				],
				// 归属地的值
				valueArea: '',

				// 行业卡的筛选
				industryOptions: [
					{
						industry: '普通卡',
						value: '1'
					},
					{
						industry: '车联卡',
						value: '2'
					},
					{
						industry: 'NB',
						value: '3'
					},
					{
						industry: '预付充值卡',
						value: '4'
					},
					{
						industry: '测试卡',
						value: '5'
					}
				],
				// 行业卡的值
				valueIndustryCard: '',

				// 公司名称
				valueCompanyName: '',

				// 异常卡列表
				abnormalData: [],
				// 分页需要的数据
				totalCount: 0,
				pageSize: 20,
				pageNo: 1
			};
		},
		mounted() {
			this.getAbnormalCardList()
		},
		methods: {
			// 改变当前页数
			changePageNo(val) {
				this.pageNo = val;
				this.getAbnormalCardList()
			},
			// 改变每页显示的条数
			changeSize(val) {
				this.pageSize = val;
				this.getAbnormalCardList()
			},
			// 获取异常卡列表
			getAbnormalCardList(){
				this.$axios({
					url: '/api/manager/card/list',
					method: 'post',
					params: {
						pageSize: this.pageSize,
						pageNo: this.pageNo,
						// 卡号或者iccid
						cardNo: this.valueCardNum,
						// 运营商
						netWork: this.valueOperator,
						// 归属地
						netWorkArea: this.valueArea,
						// 行业卡
						businessNo: this.valueIndustryCard,
						// 商户名称
						companyName: this.valueCompanyName,
						netResult: '1'
					}
				}).then(res => {
					let data = res.data.data
					this.totalCount = res.data.totalCount
//					console.log(data)
					this.abnormalData = []
					for (let i = 0; i < data.length; i++) {
						this.abnormalData.push({
							serialNum: data[i].no,
							cardNum: data[i].cardNumber,
							iccid: data[i].iccid,
							operator: returnOperator(data[i].netWork),
							area: data[i].area,
							industryCard: returnIndustryCard(data[i].businessCard),
							customerName: data[i].companyName,
							entryTime: timestampToTime(data[i].serveTime),
							error: data[i].netResult,
							remark: data[i].ownCompanyId === null ? `该地区(${data[i].area})未接入` : '',
						})
					}
				})
			},

			// 筛选
			selectTableList(){
				this.pageNo = 1
				this.abnormalData = []
				this.getAbnormalCardList()
			},
			goDetail(data){
				let id = data.id
				this.$router.push({
					path: '/testCardDetail',
					query: {
						id: id
					}
				})
			}
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
					.cell {
						.more {
							color: mainBlue;
							cursor: pointer;
						}
					}
					.el-pagination {
						text-align: center;
						margin-top: 20px;
					}
				}
			}
		}
	}
</style>


