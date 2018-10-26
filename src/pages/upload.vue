<template>
	<div class="netWorkCard-wrap">
		<div class="content">
			<div class="upload-wrap">
				<el-upload
						action="123"
						ref="upload"
						:on-progress="onProgress"
						:http-request="uploadCard">
					<div class="import-card">导入卡片</div>
				</el-upload>
				<div class="info">上传结果：{{ uploadInfo }}</div>
				<div class="tips">
					注意：1、NB卡暂时不上传，2、测试卡和预付充值卡在行业卡中选择，不要单独新建一个sheet页，3、每隔10分钟左右上传一次
				</div>

				<!-- input组 -->
				<!--<div class="input-group">-->
					<!--&lt;!&ndash; 公司名称 &ndash;&gt;-->
					<!--<el-input-->
							<!--clearable-->
							<!--class="company-name"-->
							<!--placeholder="请输入公司名称"-->
							<!--v-model="companyName">-->
					<!--</el-input>-->
					<!--&lt;!&ndash; 卡号 &ndash;&gt;-->
					<!--<el-input-->
							<!--clearable-->
							<!--class="card-number"-->
							<!--placeholder="请输入卡号"-->
							<!--v-model="cardNum">-->
					<!--</el-input>-->
					<!--<el-button>提交</el-button>-->
				<!--</div>-->
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				fullscreenLoading: false,
				uploadInfo: '',

				companyName: '',
				cardNum: ''
			};
		},
		methods: {
			// 批量导入的自定义上传
			uploadCard(params) {
				let that = this
				//创建 formData 对象
				let formData = new FormData();
				// 向 formData 对象中添加文件
				formData.append('upfile',params.file);

				let xhr = new XMLHttpRequest();
				xhr.open('post', 'http://www.91dream.net/matrix/admin/pool/importCard');
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4 && xhr.status == 200) {
						let data = JSON.parse(xhr.responseText);
						if(data.code === 1){
							this.fullscreenLoading = false;
							that.$message.success(data.msg);
						}else {
							this.fullscreenLoading = false;
							that.$message.error(data.msg);
						}
						this.uploadInfo = data.msg
					}
				};
				xhr.send(formData);
			},
			// 正在上传
			onProgress(event, file, fileList){
//				console.log('正在上传')
				console.log(event)
				console.log(file)
				console.log(fileList)
				this.fullscreenLoading = true;
			}
		}
	};
</script>

<style lang="stylus" scoped>
	mainBlue = #4cb2ff;
	.netWorkCard-wrap {
		padding-top: 50px;
		padding-left: 200px;
		.content {
			width: 100%;
			height: calc(100vh - 50px);
			padding: 20px;
			overflow-y: scroll;
			.upload-wrap {
				padding: 30px 30px 40px 30px;
				box-shadow: 0 0 5px rgba(187, 187, 187, 0.8);
				border-radius: 5px;
				/* 导入按钮 */
				.import-card {
					width: 100px;
					height: 34px;
					line-height: 34px;
					background-color: mainBlue;
					border-radius: 5px;
					text-align: center;
					font-size: 16px;
					color: #fff;
					cursor: pointer;
					margin-right: 30px;
					margin-top: 3px;
				}
				.info {
					margin: 20px 0;
				}
				.tips {
					color: red;
					font-size: 20px;
				}
				/* input组 */
				.input-group {
					display: flex;
					.el-input {
						width: 300px;
					}
					.card-number {
						margin: 0 40px;
					}
				}
			}
		}
	}
</style>


