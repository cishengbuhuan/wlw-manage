<template>
	<div class="index-wrap">
		<div class="content">
			<!-- 公司基础信息 -->
			<div class="base-info">
				<div class="title">{{ company.name }}</div>
				<div class="card-num">
					<div class="icon" :style="cardNumIcon"></div>
					卡片总数：<span>{{ company.cardNum }}</span>
				</div>
			</div>
			<!-- 卡片统计 -->
			<div class="card-count">
				<div class="card-title">卡片统计</div>
				<div class="chart">
					<div class="chart-item" v-for="(item,index) in card" :key="index">
						<div class="title">{{ item.title }}:{{ item.totalCard }}</div>
						<!-- 图片提示信息 -->
						<img class="img-info" :src="item.bgImgNoData" v-show="item.totalCard == 0">
						<img class="img-info" :src="item.bgImgHaveData" v-show="item.totalCard != 0">
						<!-- 底部的提示信息 -->
						<div class="tips">
							<div class="tips-top">
								<!-- 已激活 -->
								<div class="active tips-item">
									<div class="remark"><i></i><span>已激活</span></div>
									<div class="num">{{ item.tips.active }}</div>
								</div>
								<!-- 已停卡 -->
								<div class="stop tips-item">
									<div class="remark"><i></i><span>已停卡</span></div>
									<div class="num">{{ item.tips.stop }}</div>
								</div>
								<!-- 已消费 -->
								<div class="consumed tips-item">
									<div class="remark"><i></i><span>已消费</span></div>
									<div class="num">{{ item.tips.consumed }}</div>
								</div>
							</div>
							<div class="tips-bottom">
								<!-- 沉默期 -->
								<div class="silent tips-item">
									<div class="remark"><i></i><span>沉默期</span></div>
									<div class="num">{{ item.tips.silent }}</div>
								</div>
								<!-- 已销卡 -->
								<div class="sold tips-item">
									<div class="remark"><i></i><span>已销卡</span></div>
									<div class="num">{{ item.tips.sold }}</div>
								</div>
								<!-- 未知 -->
								<div class="unknown tips-item">
									<div class="remark"><i></i><span>未知</span></div>
									<div class="num">{{ item.tips.unknown }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import VeRing from "v-charts/lib/ring.common";
	import VePie from "v-charts/lib/pie.common";

	export default {
		data() {
			return {
				card: [
					{
						title: '移动',
						totalCard: 0,
						bgImgNoData: require('../../static/images/card-yd.jpg'),
						bgImgHaveData: require('../../static/images/card-yd-active.jpg'),
						tips: {
							active: '--',
							stop: '--',
							consumed: '--',
							silent: '--',
							sold: '--',
							unknown: '--'
						}
					},
					{
						title: '联通',
						totalCard: 0,
						bgImgNoData: require('../../static/images/card-lt.jpg'),
						bgImgHaveData: require('../../static/images/card-lt-active.jpg'),
						tips: {
							active: '--',
							stop: '--',
							consumed: '--',
							silent: '--',
							sold: '--',
							unknown: '--'
						}
					},
					{
						title: '电信',
						totalCard: 0,
						bgImgNoData: require('../../static/images/card-dx.jpg'),
						bgImgHaveData: require('../../static/images/card-dx-active.jpg'),
						tips: {
							active: '--',
							stop: '--',
							consumed: '--',
							silent: '--',
							sold: '--',
							unknown: '--'
						}
					}
				],
				cardNumIcon: {
					width: '25px',
					height: '20px',
					background: "url(" + require('../../static/images/icon-card.png') + ") no-repeat",
					backgroundSize: '100% 100%',
					marginRight: '20px',
					marginTop: '5px'
				},
				// 公司基本信息
				company: {
					name: '欢迎登入梦初想管理平台！',
					cardNum: 0
				},
				// 卡片统计饼状图数据
				cardData: [
					{
						title: '',
						totalCard: 0,
						bgImg: '../../static/images/bg-yd.png',
						columns: ['status', 'number'],
						rows: []
					},
					{
						title: '',
						totalCard: 0,
						bgImg: '../../static/images/bg-lt.png',
						columns: ['status', 'number'],
						rows: []
					},
					{
						title: '',
						totalCard: 0,
						bgImg: '../../static/images/bg-dx.png',
						columns: ['status', 'number'],
						rows: []
					}
				]
			};
		},
		mounted() {
			this.getCardInfo();
			this.getTotal()
		},
		methods: {
			// 获取卡片总数
			getTotal() {
				this.$axios({
					url: '/api/manager/customer/totalCard',
					method: 'post'
				}).then(res => {
					this.company.cardNum = res.data.data
				})
			},
			// 获取卡片统计信息
			getCardInfo() {
				this.$axios({
					url: '/api/manager/customer/cardStatistics',
					method: 'post'
				}).then(res => {
					let data = res.data.data
					for (let i = 0; i < data.length; i++) {
						this.card[i].totalCard = data[i].totalCard
						let rows = data[i].rows;
						for (let j = 0; j < rows.length; j++) {
							this.card[i].tips.active = rows[0].number == 0 ? '--' : rows[0].number;
							this.card[i].tips.stop = rows[1].number == 0 ? '--' : rows[1].number;
							this.card[i].tips.consumed = rows[2].number == 0 ? '--' : rows[2].number;
							this.card[i].tips.silent = rows[3].number == 0 ? '--' : rows[3].number;
							this.card[i].tips.sold = rows[4].number == 0 ? '--' : rows[4].number;
							this.card[i].tips.unknown = rows[5].number == 0 ? '--' : rows[5].number;
						}
					}
				})
			}
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
			/* 公司基础信息 */
			.base-info {
				margin-bottom: 20px;
				height: 170px;
				border: 1px solid transparent;
				box-shadow: 0 0 5px rgba(187, 187, 187, 0.8);
				border-radius: 5px;
				padding-left: 40px;
				.title {
					font-size: 24px;
					color: #333;
					margin: 35px auto 40px;
				}
				.card-num {
					font-size: 18px;
					color: #999;
					display: flex;
					line-height: 30px;
					span {
						font-size: 22px;
						color: #000;
					}
				}
			}
			/* 卡片统计 */
			.card-count {
				width: 100%;
				/*height: 550px;*/
				border-radius: 5px;
				box-shadow: 0 0 5px rgba(187, 187, 187, 0.8);
				padding-left: 40px;
				padding-top: 30px;
				padding-bottom: 30px;
				margin-bottom: 20px;
				.card-title {
					font-size: 20px;
					color: #000;
					/*border-bottom: 1px solid red;*/
				}
				.chart {
					display: flex;
					.no-info {
						font-size: 24px;
						text-align: center;
						margin: 50px 0 45px;
						color: #999;
					}
					.chart-item {
						flex: 1;
						text-align: center;
						position: relative;
						margin: 0 35px;
						/*.bg-img {
							font-size: 20px;
							transform: translate(-50%,-50%);
							position: absolute;
							left: 50%;
							top: 43%;
						}*/
						/* 图片提示信息 */
						.title {
							margin-bottom: 20px;
						}
						.img-info {
							width: 212px;
							height: 212px;
							border-radius: 50%;
						}
						/* 底下的文字提示信息 */
						.tips {
							margin-top: 30px;
							.tips-top, .tips-bottom {
								display: flex;
								justify-content: space-between;
								flex-wrap: wrap;
								.tips-item {
									flex: 1;
									.remark {
										display: flex;
										justify-content: center;
										i {
											display: block;
											width: 11px;
											height: 11px;
											border-radius: 50%;
											margin-top: 4px;
										}
										span {
											font-size: 14px;
											margin-left: 5px;
										}
									}
									.num {
										font-size: 20px;
										margin-top: 10px;
									}
								}

							}
							.tips-top {
								margin-bottom: 20px;
							}
							/* 已激活 */
							.active {
								.remark {
									i {
										background-color: #ffbf00;
									}
								}
							}
							/* 已停卡 */
							.stop {
								.remark {
									i {
										background-color: #fa5e5b;
									}
								}
							}
							/* 已消费 */
							.consumed {
								.remark {
									i {
										background-color: #20a0ff;
									}
								}
							}
							/* 沉默期 */
							.silent {
								.remark {
									i {
										background-color: #13ce66;
									}
								}
							}
							/* 已销卡 */
							.sold {
								.remark {
									i {
										background-color: #4dd0e1;
									}
								}
							}
							/* 未知 */
							.unknown {
								.remark {
									i {
										background-color: #bbb;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>