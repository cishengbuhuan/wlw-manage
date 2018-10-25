<template>
	<div class="testCard-wrap">
		<div class="content">
			<!-- 测试卡列表 -->
			<div class="customer-list">
				<!-- 表格工具栏 -->
				<div class="list-tools">
					<div class="tools-top">
						<!-- 搜索卡号 -->
						<el-input
								clearable
								class="search"
								placeholder="请输入卡号"
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
						<!-- 卡种类 -->
						<el-select
								class="select"
								clearable
								@change="selectTableList"
								v-model="valueCardKind"
								placeholder="请选择卡种类">
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
								@change="selectTableList"
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
						<el-table-column prop="companyName" label="开户公司" align="center"></el-table-column>
						<el-table-column prop="operator" label="运营商" align="center"></el-table-column>
						<el-table-column prop="area" label="归属地" align="center"></el-table-column>
						<el-table-column prop="flowPackages" width="130" label="流量池套餐(M)(归入地)"
						                 align="center"></el-table-column>
						<el-table-column prop="actualFlow" width="130" label="实际开卡流量(M)(客户订购流量)"
						                 align="center"></el-table-column>
						<el-table-column prop="entryTime" label="录入时间" align="center"></el-table-column>
						<el-table-column prop="cardKind" label="卡种类" align="center"></el-table-column>
						<el-table-column prop="silenceDuration" label="沉默期时长" align="center"></el-table-column>
						<el-table-column prop="packages" label="套餐" align="center"></el-table-column>
						<el-table-column prop="discount" label="折扣" align="center"></el-table-column>
						<el-table-column prop="way" label="付款方式" align="center"></el-table-column>
						<!--<el-table-column prop="result" label="响应结果" align="center"></el-table-column>-->
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<div class="more" @click="goDetail(scope.row)">查看详情</div>
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
	import {format,timestampToTime,returnPackages,
		returnOperator,returnCardKind,
		returnPayWay} from '../api/dataUtil'
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
				// 卡种类的筛选
				kindOptions: [
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
				// 卡种类的值
				valueCardKind: '',
				// 公司名称
				valueCompanyName: '',
				// 测试卡列表
				testData: [],
				// 分页需要的数据
				totalCount: 0,
				pageSize: 5,
				pageNo: 1
			};
		},
		mounted() {
			this.getTestCardList()
		},
		methods: {
			// 改变当前页数
			changePageNo(val) {
				this.pageNo = val;
				this.getTestCardList()
			},
			// 改变每页显示的条数
			changeSize(val) {
				this.pageSize = val;
				this.getTestCardList()
			},
			// 获取测试卡列表
			getTestCardList(){
				this.$axios({
					url: '/api/manager/card/list',
					method: 'post',
					params: {
						pageSize: this.pageSize,
						pageNo: this.pageNo,
						cardNo: this.valueCardNum,
						netWork: this.valueOperator,
						cardType: this.valueCardKind,
						companyName: this.valueCompanyName,
						businessNo: 5
					}
				}).then(res => {
					let data = res.data.data
					this.totalCount = res.data.totalCount
//					console.log(data)
					this.testData = []
					for (let i = 0; i < data.length; i++) {
						this.testData.push({
							serialNum: data[i].no,
							cardNum: data[i].cardNumber,
							companyName: data[i].companyName,
							operator: returnOperator(data[i].netWork),
							area: data[i].area,
							flowPackages: data[i].userPoolSize,
							actualFlow: data[i].poolSize,
							entryTime: timestampToTime(data[i].serveTime),
							cardKind: returnCardKind(data[i].cardType),
							silenceDuration: data[i].silentPeriod,
							packages: returnPackages(data[i].packageType),
							discount: data[i].discount,
							way: returnPayWay(data[i].payment),
							result: data[i].netResult,
							deviceId: data[i].deviceId,
							companyId: data[i].companyId,
							netWork: data[i].netWork,
						})
					}
				})
			},

			// 筛选
			selectTableList(){
				this.pageNo = 1
				this.testData = []
				this.getTestCardList()
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


