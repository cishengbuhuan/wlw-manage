<template>
	<div class="login-wrap" :style="bg">
		<header>
			<span>欢迎登录</span>
			<div class="line"></div>
			<img class="logo" src="../../static/images/company-logo.png">
		</header>
		<div class="content">
			<!-- 文字信息 -->
			<div class="info">
				<h3>物联网管理平台</h3>
				<p>thoughtInternet of things Management Platform</p>
			</div>
			<!-- 登录表单 -->
			<div class="login-form">
				<div class="title">账号登录</div>
				<div class="form">
					<!-- 账号 -->
					<div class="tel">
						<input type="text" v-model="user.account" placeholder="请输入账号">
					</div>
					<!-- 密码 -->
					<div class="psw">
						<input type="password" v-model="user.password" placeholder="请输入密码">
					</div>
					<!-- 记住密码和忘记密码 -->
					<div class="remember-forget">
						<div class="remember">
							<input type="checkbox" v-model="isRemember">
							<span>记住账号</span>
						</div>
						<router-link to="/forget">
							<div class="forget">忘记密码</div>
						</router-link>
					</div>
					<!-- 登录按钮 -->
					<div class="btn-login" @click="btnLogin">立即登录</div>
				</div>
			</div>
		</div>
		<!--<footer>-->
		<!--<div class="about">-->
		<!--&lt;!&ndash; 关于我们 &ndash;&gt;-->
		<!--<div class="about-us">-->
		<!--<div class="icon"></div>-->
		<!--<span>关于我们</span>-->
		<!--</div>-->
		<!--<div class="line"></div>-->
		<!--&lt;!&ndash; 服务 &ndash;&gt;-->
		<!--<div class="service">-->
		<!--<div class="hot-line">-->
		<!--<div class="icon"></div>-->
		<!--<span>客服热线：028-849994</span>-->
		<!--</div>-->
		<!--<div class="time">-->
		<!--<div class="icon"></div>-->
		<!--<span>周一至周五：09：00-18：00</span>-->
		<!--</div>-->
		<!--</div>-->
		<!--</div>-->
		<!--<div class="copyright">-->
		<!--<span>版权所有：2.0</span>-->
		<!--<br>-->
		<!--<span>备案号：12345789</span>-->
		<!--</div>-->
		<!--</footer>-->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				codeShow: false,
				user: {
					account: '',
					password: '',
					code: ''
				},
				bg: {
					width: '100%',
					minHeight: '100vh',
					background: "url(" + require('../../static/images/login-bg.jpg') + ") no-repeat",
					backgroundSize: '100% 100%',
					position: 'relative'
				},
				isRemember: true
			};
		},
		mounted() {
		},
		methods: {
			btnLogin() {
				this.$axios({
					url: '/admin/account/login',
					method: 'post',
					params: {
						userName: this.user.account,
						password: this.user.password
					}
				}).then(res => {
					let code = res.data.code;
					if (code == 1) {
//						localStorage.setItem('_token', res.data.data.token);
						this.$router.push({path: '/index'})
					} else if (code == 0) {
						this.$message(res.data.msg);
					}
				})
			}
		}
	};
</script>

<style lang="stylus" scoped>
	.login-wrap {
		position: relative;
		header {
			width: 100%;
			height: 110px;
			display: flex;
			padding-top: 50px;
			span {
				font-size: 40px;
				color: #fff;
				margin: 0 30px 0 90px;
			}
			.line {
				width: 2px;
				height: 60px;
				background-color: #ddd;
				margin-right: 25px;
			}
			.logo {
				width: 410px;
				height: 60px;
			}
		}
		.content {
			/* 文字信息 */
			.info {
				margin-top: 100px;
				margin-left: 300px;
				color: #fff;
				h3 {
					font-size: 70px;
				}
				p {
					font-size: 22px;
				}
			}
			/* 登录表单 */
			.login-form {
				width: 23%;
				height: 350px;
				border-radius: 5px;
				background-color: #fff;
				position: absolute;
				top: 210px;
				right: 5.2%;
				padding: 0 42px;
				.title {
					font-size: 22px;
					height: 76px;
					line-height: 76px;
					text-align: center;
				}
				.form {
					/* 账号和密码 */
					.tel, .psw {
						width: 100%
						height: 46px
						border-bottom: 1px solid #ddd;
						input {
							width: 100%
							height: 100%
						}
					}
					/* 图形验证码 */
					.img-code {
						display: flex;
						height: 60px;
						border-bottom: 1px solid #ddd;
						input {
							width: 100%;
						}
						.img {
							width: 78px;
							height: 38px;
							margin-top: 14px;
							cursor: pointer;
						}
					}
					/* 记住密码和忘记密码 */
					.remember-forget {
						display: flex;
						justify-content: space-between;
						.forget {
							cursor: pointer;
						}
					}
					/* 登录按钮 */
					.btn-login {
						width: 100%;
						height: 36px;
						line-height: 36px;
						border-radius: 5px;
						text-align: center;
						font-size: 16px;
						cursor: pointer;
						background-color: #5769b1;
						margin: 18px auto 0;
						color: #fff;
					}
				}
			}
		}
		footer {
			width: 100%;
			position: absolute;
			bottom: 0;
			left: 0;
			text-align: center;
			.about {
				display: flex;
				justify-content: center;
				.about-us {
					display: flex;
					line-height: 70px;
					padding-left: 40px;
					.icon {
						width: 50px;
						height: 42px;
						background: url("../../static/images/icon-about-us.png");
						-webkit-background-size: 100% 100%;
						background-size: 100% 100%;
						margin-top: 14px;
					}
					span {
						font-size: 34px;
						color: #fff;
						margin: 0 35px 0 15px;
					}
				}
				.line {
					width: 1px;
					height: 70px;
					background-color: #fff;
					margin-right: 35px;
				}
				.service {
					.hot-line {
						display: flex;
						.icon {
							width: 28px;
							height: 28px;
							background: url("../../static/images/icon-server.png");
							-webkit-background-size: 100% 100%;
							background-size: 100% 100%;
							margin-right: 10px;
						}
						span {
							font-size: 28px;
							color: #fff;
							line-height: 30px;
						}
					}
					.time {
						display: flex;
						margin-top: 20px;
						.icon {
							width: 20px;
							height: 20px;
							background: url("../../static/images/icon-time.png");
							-webkit-background-size: 100% 100%;
							background-size: 100% 100%;
							margin-right: 15px;
							margin-left: 5px;
						}
						span {
							font-size: 20px;
							color: #fff;
							line-height: 20px;
						}
					}
				}
			}
			.copyright {
				font-size: 18px;
				color: #fff;
			}
		}
	}
</style>

