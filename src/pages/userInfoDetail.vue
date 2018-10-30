<template>
	<div class="userInfoDetail-wrap">
		<div class="content">
			<!-- 用户信息详情 -->
			<div class="user-info">
				<!--  tips-->
				<div class="info-header">
					<div class="tips"><i></i><span>用户信息详情</span></div>
				</div>
				<!-- 具体内容 -->
				<div class="info-content">
					<!-- 登录账号 -->
					<div class="item">
						登录账号: {{ loginAccount }}
					</div>
					<!-- 姓名 -->
					<div class="item">
						姓名: {{ name }}
					</div>
					<!-- 当前状态 -->
					<div class="item">
						当前状态: {{ status }}
					</div>
					<!-- 手机号 -->
					<div class="item">
						手机号: {{ tel }}
					</div>
					<!-- 邮箱 -->
					<div class="item">
						邮箱: {{ email }}
					</div>
					<!-- 所属角色 -->
					<div class="item">
						所属角色: {{ role }}
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
				loginAccount: '',
				name: '',
				status: '',
				tel: '',
				email: '',
				role: ''
			};
		},
		mounted() {
			this.getUserInfo()
		},
		methods: {
			// 获取用户信息
			getUserInfo(){
				let deviceId = this.$route.query.deviceId
			}
		}
	};
</script>

<style lang="stylus" scoped>
	mainBlue = #4cb2ff;
	.userInfoDetail-wrap {
		padding-top: 50px;
		padding-left: 200px;
		.content {
			width: 100%;
			height: calc(100vh - 50px);
			padding: 20px;
			overflow-y: scroll;
			/* 用户信息详情 */
			.user-info {
				width: 100%;
				border-radius: 5px;
				box-shadow: 0 0 5px rgba(187, 187, 187, 0.8);
				padding: 0 46px;
				/* tips */
				.info-header {
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
				.info-content {
					padding: 10px 0px 20px;
					.item {
						font-size: 18px;
						line-height: 30px;
					}
				}
			}
		}
	}
</style>


