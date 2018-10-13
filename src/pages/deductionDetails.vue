<template>
	<div class="deductionDetails-wrap">
		<div class="content">
			<!-- 扣款明细 -->
			<div class="deduction-details">
				<!-- 表格工具栏 -->
				<div class="list-tools">
					<div class="tools-top">
						<!-- 搜索联系人姓名 -->
						<el-input
								clearable
								class="contact-name"
								placeholder="联系人姓名"
								@change="getDeductionDetail"
								v-model="valueContact">
						</el-input>
						<!-- 手机号 -->
						<el-input
								clearable
								class="phone"
								placeholder="手机号"
								@change="getDeductionDetail"
								v-model="valuePhone">
						</el-input>
						<!-- 搜索公司名称 -->
						<el-input
								clearable
								class="company-name"
								placeholder="公司名称"
								@change="getDeductionDetail"
								v-model="valueCompanyName">
						</el-input>
					</div>
					<div class="tools-bottom">
						<!-- 扣款类型 -->
						<el-select class="select"
						           clearable
						           v-model="valueType"
						           @change="getDeductionDetail"
						           placeholder="请选择扣款类型">
							<el-option
									v-for="item in typeOptions"
									:key="item.value"
									:label="item.type"
									:value="item.value">
							</el-option>
						</el-select>
						<!-- 扣款方式 -->
						<el-select class="select"
						           clearable
						           v-model="valueWay"
						           @change="getDeductionDetail"
						           placeholder="请选择扣款方式">
							<el-option
									v-for="item in wayOptions"
									:key="item.value"
									:label="item.way"
									:value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<!-- 扣款明细表格 -->
				<div class="table-box">
					<el-table
							:data="detailData"
							border
							style="width: 100%">
						<el-table-column prop="serialNum" label="序号" align="center"></el-table-column>
						<el-table-column prop="contactName" label="联系人姓名" align="center"></el-table-column>
						<el-table-column prop="phone" label="手机号" align="center"></el-table-column>
						<el-table-column prop="companyName" label="公司名称" align="center"></el-table-column>
						<el-table-column prop="batch" label="扣款批次" align="center"></el-table-column>
						<el-table-column prop="time" label="扣款时间" align="center"></el-table-column>
						<el-table-column prop="way" label="扣款方式" align="center"></el-table-column>
						<el-table-column prop="type" label="扣款类型" align="center"></el-table-column>
						<el-table-column prop="status" label="扣款状态" align="center"></el-table-column>
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

				// 类型的筛选
				typeOptions: [
					{
						type: '月租扣款',
						value: '1'
					},
					{
						type: '超流扣款',
						value: '2'
					}
				],
				// 类型的值
				valueType: '',


				// 扣款方式的筛选
				wayOptions: [
					{
						way: '月扣',
						value: '1'
					},
					{
						way: '季度扣',
						value: '2'
					},
					{
						way: '半年扣',
						value: '3'
					},
					{
						way: '年扣',
						value: '4'
					},
					{
						way: '后付',
						value: '5'
					}
				],
				// 扣款方式的值
				valueWay: '',

				// 扣款明细表格数据
				detailData: [],
				// 分页需要的数据
				totalCount: 0,
				pageSize: 20,
				pageNo: 1,
			};
		},
		mounted() {
			this.getDeductionDetail()
		},
		methods: {
			// 改变当前页数
			changePageNo(val) {
				this.pageNo = val;
				this.getDeductionDetail()
			},
			// 改变每页显示的条数
			changeSize(val) {
				this.pageSize = val;
				this.getDeductionDetail()
			},
			// 获取到扣款明细到表格数据
			getDeductionDetail(){
				this.$axios({
					url: '/api/pay/bill/list',
					method: 'post',
					params: {
						pageSize: this.pageSize,
						pageNo: this.pageNo,
						mobile: this.valuePhone,
						userName: this.valueContact,
						companyName: this.valueCompanyName,
						payType: this.valueType,
						payWay: this.valueWay
					}
				}).then(res => {
					let data = res.data.data
					this.totalCount = res.data.totalCount
					this.detailData = []
					for (let i = 0; i < data.length; i++) {
						this.detailData.push({
							serialNum: data[i].no,
							contactName: data[i].userName,
							phone: data[i].mobile,
							companyName: data[i].companyName,
							batch: data[i].cardServerTime,
							time: timestampToTime(data[i].createTime),
							way: this.returnDeductionWay(data[i].payType),
							type: this.returnDeductionType(data[i].payType),
							status: this.returnDeductionStatus(data[i].payStatus)
						})
					}
				})
			},
			// 返回扣款方式的处理结果
			returnDeductionWay(i){
				if(i==1){
					return '月扣'
				}else if(i==2){
					return '季度扣'
				}else if(i==3){
					return '半年扣'
				}else if(i==4){
					return '年扣'
				}else if(i==5){
					return '后付'
				}else{
					return ''
				}
			},
			// 返回扣款类型的处理结果
			returnDeductionType(i){
				if(i==1){
					return '月租扣款'
				}else if(i==2){
					return '超流扣款'
				}else{
					return ''
				}
			},
			// 返回扣款状态的处理结果
			returnDeductionStatus(i){
				if(i==1){
					return '扣款成功'
				}else if(i==2){
					return '扣款失败'
				}else if(i==3){
					return '余额不足'
				}else{
					return ''
				}
			}
		}
	};
</script>

<style lang="stylus" scoped>
	mainBlue = #4cb2ff;
	.deductionDetails-wrap {
		padding-top: 50px;
		padding-left: 200px;
		.content {
			width: 100%;
			height: calc(100vh - 50px);
			padding: 20px;
			overflow-y: scroll;
			/* 扣款明细 */
			.deduction-details {
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
					.cell {
						.more {
							cursor: pointer;
							color: mainBlue;
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


