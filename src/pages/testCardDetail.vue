<template>
	<div class="testCardDetail-wrap">
		<div class="content">
			<!-- 卡片详情 -->
			<div class="card-detail">
				<!--  tips-->
				<div class="card-header">
					<div class="tips"><i></i><span>测试卡详情</span></div>
				</div>
				<!-- 具体内容 -->
				<div class="card-content">
					<div class="item-group">
						<!-- 卡号 -->
						<div class="item">
							卡号: {{ cardNum }}
						</div>
						<!-- iccid -->
						<div class="item">
							ICCID: {{ iccid }}
						</div>
						<!-- 卡种类 -->
						<div class="item">
							卡种类: {{ cardkind }}
						</div>
					</div>
					<div class="item-group">
						<!-- 开户公司 -->
						<div class="item">
							开户公司: {{ openCompany }}
						</div>
						<!-- 运营商 -->
						<div class="item">
							运营商: {{ operator }}
						</div>
						<!-- 卡片等级 -->
						<div class="item">
							卡片等级: {{ cardLevel }}
						</div>
					</div>
					<div class="item-group">
						<!-- 归入池套餐 -->
						<div class="item">
							归入池套餐: {{ poolPackages }}
						</div>
						<!-- 客户订购流量 -->
						<div class="item">
							客户订购流量: {{ buyFlow }}
						</div>
						<!-- 沉默期时长 -->
						<div class="item">
							沉默期时长: {{ silenceDuration }}
						</div>
					</div>
					<div class="item-group">
						<!-- 归属省份 -->
						<div class="item">
							归属省份: {{ province }}
						</div>
						<!-- 归属地区 -->
						<div class="item">
							归属地区: {{ city }}
						</div>
						<!-- 行业卡 -->
						<div class="item">
							行业卡: {{ industryCard }}
						</div>
					</div>
					<div class="item-group">
						<!-- 录入时间 -->
						<div class="item">
							录入时间: {{ entryTime }}
						</div>
						<!-- 计费时间 -->
						<div class="item">
							计费时间: {{ billingTime }}
						</div>
						<!-- 短信 -->
						<div class="item">
							短信: {{ message }}
						</div>
					</div>
					<div class="item-group">
						<!-- 是否定向卡 -->
						<div class="item">
							是否定向卡: {{ orientationCard }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {timestampToTime,returnPackages,
		returnOperator,returnCardKind,
		returnPayWay,returnIndustryCard} from '../api/dataUtil'
	export default {
		data() {
			return {
				cardNum: '',
				iccid: '',
				cardkind: '',
				openCompany: '',
				operator: '',
				cardLevel: '',
				poolPackages: '',
				buyFlow: '',
				silenceDuration: '',
				province: '',
				city: '',
				industryCard: '',
				entryTime: '',
				billingTime: '',
				message: '',
				orientationCard: ''
			};
		},
		mounted() {
			this.getTestCardDetail()
		},
		methods: {
			// 获取测试卡详情
			getTestCardDetail(){
				let id = this.$route.query.id
				this.$axios({
					url: '/api/manager/testcard/detail',
					method: 'post',
					params: {
						id: id
					}
				}).then(res => {
					let data = res.data.data

					this.cardNum = data.cardNumber
					this.iccid = data.iccid
					this.cardkind = returnCardKind(data.cardType)
					this.openCompany = data.companyName
					this.operator = returnOperator(data.netWork)
					this.cardLevel = data.cardLevel
					this.poolPackages = data.userPoolSize
					this.buyFlow = data.poolSize
					this.silenceDuration = data.silentPeriod
					this.province = data.province
					this.city = data.area
					this.industryCard = returnIndustryCard(data.businessCard)
					this.entryTime = timestampToTime(data.serveTime)
					this.billingTime = timestampToTime(data.chargeTime)
					this.message = data.msgTotal ? data.msgTotal + '条' : 0
					this.orientationCard = data.cardDirect == 1 ? '是' : '否'
				})
			}

		}
	};
</script>

<style lang="stylus" scoped>
	mainBlue = #4cb2ff;
	.testCardDetail-wrap {
		padding-top: 50px;
		padding-left: 200px;
		.content {
			width: 100%;
			height: calc(100vh - 50px);
			padding: 20px;
			overflow-y: scroll;
			/* 卡片详情 */
			.card-detail {
				width: 100%;
				border-radius: 5px;
				box-shadow: 0 0 5px rgba(187, 187, 187, 0.8);
				padding: 0 46px;
				/* tips */
				.card-header {
					height: 120px;
					line-height: 120px;
					border-bottom: 1px solid #bbb;
					.tips {
						display: flex;
						i {
							display: block;
							width: 6px;
							height: 28px;
							background-color: mainBlue;
							margin-right: 10px;
							margin-top: 45px;
						}
						span {
							font-size: 24px;
						}
					}
				}
				/* 具体内容 */
				.card-content {
					padding: 10px 0px 50px;
					.item-group {
						display: flex;
						justify-content: space-between;
						margin-top: 40px;
						.item {
							flex: 1;
							font-size: 18px;
						}
					}
				}
			}
		}
	}
</style>


