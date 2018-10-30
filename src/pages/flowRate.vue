<template>
	<div class="index-wrap">
		<div class="content">
			<!-- 流量统计 -->
			<div class="flow-count">
				<!-- 流量统计的header -->
				<div class="flow-title">
					<span>
						<i class="line"></i>流量统计
					</span>
				</div>
				<!-- 工具栏 -->
				<div class="tools">
					<!-- 筛选运营商 -->
					<el-select v-model="operatorValue"
					           @change="toggleOperator"
					           placeholder="请选择运营商">
						<el-option
								v-for="item in operatorOptions"
								:key="item.value"
								:label="item.operator"
								:value="item.value">
						</el-option>
					</el-select>
					<!-- 筛选归属地 -->
					<el-select v-model="areaValue"
					           class="area"
					           @change="toggleOperator"
					           placeholder="请选择归属地">
						<el-option
								v-for="item in areaOptions"
								:key="item.value"
								:label="item.area"
								:value="item.value">
						</el-option>
					</el-select>
					<!-- 筛选归入池流量 -->
					<el-select v-model="flowValue"
					           @change="toggleOperator"
					           placeholder="请选择归入池流量">
						<el-option
								v-for="item in flowOptions"
								:key="item.value"
								:label="item.flow"
								:value="item.value">
						</el-option>
					</el-select>
				</div>
				<!-- 柱状图 -->
				<div class="chart">
					<!-- 循环移动、联通、电信 -->
					<div class="operator" v-for="(item,index) in rateData" :key="index">
						<div class="operator-name">{{ item.operatorName }}</div>
						<!--<ve-bar :data="chartData" :settings="chartSettings"></ve-bar>-->
						<div class="area" v-for="(son,i) in item.data" :key="i">
							<ve-bar :data="son" :settings="chartSettings" :extend="chartExtend"></ve-bar>
							<div class="tips-name">{{ son.area }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import VeBar from "v-charts/lib/bar.common";

	export default {
		components: {
			VeBar
		},
		data() {
			this.chartSettings =  {
				stack: {
					'xxx': ['total', 'usage']
				},
			}
			this.chartExtend = {
				legend: {
					show: false
				},
			}
			return {
				// 各个流量池占比数据
				rateData: [
					{
						operatorName: '移动',
						data: [
							{
								area: '北京移动',
								columns: ['poolSize', 'total', 'usage', 'rate'],
								rows: [
									{'poolSize': '10M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '20M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '30M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '40M', 'total': 1234, 'usage': 233, 'rate': 0.234},
								]
							},
							{
								area: '上海移动',
								columns: ['poolSize', 'total', 'usage', 'rate'],
								rows: [
									{'poolSize': '10M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '20M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '30M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '40M', 'total': 1234, 'usage': 233, 'rate': 0.234},
								]
							},
							{
								area: '广州移动',
								columns: ['poolSize', 'total', 'usage', 'rate'],
								rows: [
									{'poolSize': '10M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '20M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '30M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '40M', 'total': 1234, 'usage': 233, 'rate': 0.234},
								]
							}
						]
					},
					{
						operatorName: '联通',
						data: [
							{
								area: '北京联通',
								columns: ['poolSize', 'total', 'usage', 'rate'],
								rows: [
									{'poolSize': '10M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '20M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '30M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '40M', 'total': 1234, 'usage': 233, 'rate': 0.234},
								]
							},
							{
								area: '上海联通',
								columns: ['poolSize', 'total', 'usage', 'rate'],
								rows: [
									{'poolSize': '10M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '20M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '30M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '40M', 'total': 1234, 'usage': 233, 'rate': 0.234},
								]
							},
							{
								area: '广州联通',
								columns: ['poolSize', 'total', 'usage', 'rate'],
								rows: [
									{'poolSize': '10M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '20M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '30M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '40M', 'total': 1234, 'usage': 233, 'rate': 0.234},
								]
							}
						]
					},
					{
						operatorName: '电信',
						data: [
							{
								area: '北京电信',
								columns: ['poolSize', 'total', 'usage', 'rate'],
								rows: [
									{'poolSize': '10M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '20M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '30M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '40M', 'total': 1234, 'usage': 233, 'rate': 0.234},
								]
							},
							{
								area: '上海电信',
								columns: ['poolSize', 'total', 'usage', 'rate'],
								rows: [
									{'poolSize': '10M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '20M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '30M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '40M', 'total': 1234, 'usage': 233, 'rate': 0.234},
								]
							},
							{
								area: '广州电信',
								columns: ['poolSize', 'total', 'usage', 'rate'],
								rows: [
									{'poolSize': '10M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '20M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '30M', 'total': 1234, 'usage': 233, 'rate': 0.234},
									{'poolSize': '40M', 'total': 1234, 'usage': 233, 'rate': 0.234},
								]
							}
						]
					},
				],
				// 运营商的筛选
				operatorValue: '',
				operatorOptions: [
					{
						operator: '移动',
						value: '1'
					},
					{
						operator: '联通',
						value: '2'
					},
					{
						operator: '电信',
						value: '3'
					}
				],
				// 归属地的筛选
				areaValue: '',
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
						area: '广州',
						value: '3'
					}
				],
				// 归入池流量的筛选
				flowValue: '',
				flowOptions: [
					{
						flow: '10M',
						value: '1'
					},
					{
						flow: '20M',
						value: '2'
					},
					{
						flow: '30M',
						value: '3'
					},
					{
						flow: '40M',
						value: '4'
					}
				]
			};
		},
		mounted() {

		},
		methods: {

		}
	};
</script>

<style lang="stylus" scoped>
	mainBlue = #4cb2ff;
	.index-wrap {
		padding-top: 50px;
		padding-left: 200px;
		.content {
			width: 100%;
			height: calc(100vh - 50px);
			padding: 20px;
			overflow-y: scroll;
			/* 流量统计 */
			.flow-count {
				width: 100%;
				/*height: 620px;*/
				border-radius: 5px;
				border: 1px solid #ddd;
				padding-left: 40px;
				padding-right: 40px;
				padding-top: 30px;
				padding-bottom: 30px;
				.flow-title {
					color: #000;
					display: flex;
					line-height: 40px;
					border-bottom: 1px solid red;
					span {
						font-size: 20px;
						margin-right: 35px;
						display: flex;
						.line {
							width: 6px;
							height: 28px;
							display: block;
							background-color: mainBlue;
							margin-right: 5px;
							margin-top: 5px;
						}
					}
				}
				/* 工具栏 */
				.tools {
					display: flex;
					justify-content: center;
					margin-bottom: 30px;
					margin-top: 20px;
					.area {
						margin: 0 20px;
					}
				}
				/* 柱状图 */
				.chart {
					.operator {
						border-bottom: 30px solid #ddd;
						.operator-name {
							font-size: 30px;
						}
						.area {
							.tips-name {
								text-align: center;
								margin-top: -40px;
								font-size: 20px;
							}
						}
					}
					.operator:last-child {
						border-bottom: none;
					}
				}
			}
		}
	}
</style>