<template>
	<div class="netWorkCard-wrap">
		<div class="content">
			<!-- 网卡列表 -->
			<div class="netWork-list">
				<!-- tab栏 -->
				<div class="tab-nav">
					<!-- 运营商分类 -->
					<div class="operator">
						<div class="tips">运营商分类:</div>
						<div class="item-group">
							<div v-for="(item,index) in operatorData"
							     :class="[{ current: item.isSelected },'item']"
							     @click="toggleOperator(index)"
							     :key="index">
								{{ item.operator }}
							</div>
						</div>
					</div>
					<!-- 流量分类 -->
					<div class="flow">
						<div class="tips">流量分类:</div>
						<div class="item-group">
							<div v-for="(item,index) in flowPoolData"
							     :class="[{ current: item.isSelected },'item']"
							     @click="toggleFlow(index)"
							     :key="index">
								{{ item.packages }}
							</div>
						</div>
					</div>
				</div>
				<!-- table栏 -->
				<div class="list-table">
					<!-- 工具栏 -->
					<div class="tools">
						<!-- 左侧的按钮组 -->
						<div class="btn-group">
							<div class="new-add" @click="btnAdd">新增单卡</div>
							<div class="modify-discount" @click="editDiscount">修改折扣</div>
							<el-upload
									action="http://localhost:8080/static/files"
									:on-change="handleChange"
									:on-remove="handleRemove"
									:file-list="fileList">
								<div class="batch-import">批量导入</div>
							</el-upload>
							<div class="export-all">全部导出</div>
						</div>
						<!-- 右侧的搜索组 -->
						<div class="search-group">
							<!-- 搜索卡号 -->
							<el-input
									clearable
									class="search-number"
									placeholder="请输入卡号"
									v-model="cardNum">
							</el-input>
							<!-- 搜索开户公司 -->
							<el-input
									clearable
									placeholder="请输入开户公司"
									v-model="company">
							</el-input>
						</div>
					</div>
					<!-- 表格 -->
					<div class="table">
						<el-table
								:data="netWorkData"
								border
								style="width: 100%">
							<el-table-column prop="serialNum" label="序号" align="center"></el-table-column>
							<el-table-column prop="cardNum" label="卡号" align="center"></el-table-column>
							<el-table-column prop="company" label="开户公司" align="center"></el-table-column>
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
		<!-- 修改折扣的弹出框 -->
		<div class="modify-discount-modal" @click.self="closeModifyModal" v-show="modifyDiscount">
			<div class="discount-box">
				<div class="box-header">修改折扣</div>
				<div class="box-body">
					<!-- 原折扣 -->
					<div class="old-discount">
						原折扣：<span>{{ oldDiscount }}折</span>
					</div>
					<!-- 设置新折扣 -->
					<div class="set-new">
						<h3>设置新折扣</h3>
						<!-- 输入批次 -->
						<div class="batch">
							<span>输入批次：</span>
							<div class="input">
								<input type="text" v-model="valueBatch">
								<div class="tips">
									<i class="el-icon-warning"></i>
									<span>注：此处批次为录入时间</span>
								</div>
							</div>
						</div>
						<!-- 输入折扣 -->
						<div class="discount">
							<span>输入折扣：</span>
							<div class="input">
								<input type="text" v-model="valueDiscount">
								<div class="tips">
									<i class="el-icon-warning"></i>
									<span>注：此处为小数点。例：4折=0.4</span>
								</div>
							</div>
						</div>
						<div class="btn-save" @click="save">保存</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 新增单卡的弹出框 -->
		<div class="new-add-modal" @click.self="closeNewADD" v-show="singleCard">
			<div class="add-card-box">
				<div class="box-header">新增单卡</div>
				<div class="box-body">
					<div class="form">
						<div class="form-row">
							<!-- 卡号 -->
							<div class="card-num form-item">
								<div class="label">
									<span>卡号<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入卡号"
										v-model="singleCardForm.cardNum">
								</el-input>
							</div>
							<!-- ICCID -->
							<div class="iccid form-item">
								<div class="label">
									<span>ICCID<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入ICCID"
										v-model="singleCardForm.iccid">
								</el-input>
							</div>
							<!-- 卡种类 -->
							<div class="card-kind form-item">
								<div class="label">
									<span>卡种类<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入ICCID"
										v-model="singleCardForm.cardKind">
								</el-input>
							</div>
						</div>
						<div class="form-row">
							<!-- 开户公司 -->
							<div class="open-company form-item">
								<div class="label">
									<span>开户公司<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入开户公司"
										v-model="singleCardForm.openCompany">
								</el-input>
							</div>
							<!-- 运营商 -->
							<div class="iccid form-item">
								<div class="label">
									<span>运营商<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入运营商"
										v-model="singleCardForm.operator">
								</el-input>
							</div>
							<!-- 套餐 -->
							<div class="card-kind form-item">
								<div class="label">
									<span>套餐<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入套餐"
										v-model="singleCardForm.packages">
								</el-input>
							</div>
						</div>
						<div class="form-row">
							<!-- 归入池套餐 -->
							<div class="form-item">
								<div class="label">
									<span>归入池套餐<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入归入池套餐"
										v-model="singleCardForm.intoPool">
								</el-input>
							</div>
							<!-- 客户订购流量 -->
							<div class="form-item">
								<div class="label">
									<span>客户订购流量<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入客户订购流量"
										v-model="singleCardForm.orderFlow">
								</el-input>
							</div>
							<!-- 付费方式 -->
							<div class="form-item">
								<div class="label">
									<span>付费方式<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入付费方式"
										v-model="singleCardForm.payWay">
								</el-input>
							</div>
						</div>
						<div class="form-row">
							<!-- 归属公司 -->
							<div class="form-item">
								<div class="label">
									<span>归属公司<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入归属公司"
										v-model="singleCardForm.attributionCompany">
								</el-input>
							</div>
							<!-- 归属地区 -->
							<div class="form-item">
								<div class="label">
									<span>归属地区<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入归属地区"
										v-model="singleCardForm.attributionArea">
								</el-input>
							</div>
							<!-- 定向IP -->
							<div class="form-item">
								<div class="label">
									<span>定向IP<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入定向IP"
										v-model="singleCardForm.directedIP">
								</el-input>
							</div>
						</div>
						<div class="form-row">
							<!-- 录入时间 -->
							<div class="form-item">
								<div class="label">
									<span>录入时间<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入录入时间"
										v-model="singleCardForm.entryTime">
								</el-input>
							</div>
							<!-- 结束时间 -->
							<div class="form-item">
								<div class="label">
									<span>结束时间<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入结束时间"
										v-model="singleCardForm.endTime">
								</el-input>
							</div>
							<!-- 合同签约时限 -->
							<div class="form-item">
								<div class="label">
									<span>合同签约时限<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入合同签约时限"
										v-model="singleCardForm.timeLimit">
								</el-input>
							</div>
						</div>
						<div class="form-row">
							<!-- 是否定向卡 -->
							<div class="form-item">
								<div class="label">
									<span>是否定向卡<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入录入时间"
										v-model="singleCardForm.entryTime">
								</el-input>
							</div>
							<!-- 卡片等级 -->
							<div class="form-item">
								<div class="label">
									<span>卡片等级<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入结束时间"
										v-model="singleCardForm.endTime">
								</el-input>
							</div>
							<!-- 沉默期时长 -->
							<div class="form-item">
								<div class="label">
									<span>沉默期时长<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入合同签约时限"
										v-model="singleCardForm.timeLimit">
								</el-input>
							</div>
						</div>
						<div class="form-row">
							<!-- 短信 -->
							<div class="form-item">
								<div class="label">
									<span>短信<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入录入时间"
										v-model="singleCardForm.entryTime">
								</el-input>
							</div>
							<!-- 行业卡 -->
							<div class="form-item">
								<div class="label">
									<span>行业卡<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入结束时间"
										v-model="singleCardForm.endTime">
								</el-input>
							</div>
							<!-- 计费时间 -->
							<div class="form-item">
								<div class="label">
									<span>计费时间<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入合同签约时限"
										v-model="singleCardForm.timeLimit">
								</el-input>
							</div>
						</div>
						<div class="form-row">
							<!-- 折扣 -->
							<div class="form-item">
								<div class="label">
									<span>折扣<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入录入时间"
										v-model="singleCardForm.entryTime">
								</el-input>
							</div>
						</div>
						<div class="btn-save" @click="saveForm">保存信息</div>
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
				// 卡号
				cardNum: '',
				// 开户公司
				company: '',

				// 运营商
				operatorData: [
					{
						operator: '中国移动',
						isSelected: true
					},
					{
						operator: '中国电信',
						isSelected: false
					},
					{
						operator: '中国联通',
						isSelected: false
					}
				],
				// 流量池
				flowPoolData: [
					{
						packages: '10M流量池',
						isSelected: true
					},
					{
						packages: '30M流量池',
						isSelected: false
					},
					{
						packages: '50M流量池',
						isSelected: false
					}
				],

				// 网卡列表
				netWorkData: [
					{
						serialNum: '1',
						cardNum: '123',
						company: '上海¥¥¥¥¥¥公司',
						operator: '电信',
						area: '上海',
						flowPackages: '30M',
						actualFlow: '10',
						entryTime: '2018-09-09',
						cardKind: '大卡',
						silenceDuration: '1年',
						packages: '全年',
						discount: '0.4',
						way: '年付',
						operate: '查看详情'
					},
					{
						serialNum: '1',
						cardNum: '123',
						company: '上海¥¥¥¥¥¥公司',
						operator: '电信',
						area: '上海',
						flowPackages: '30M',
						actualFlow: '10',
						entryTime: '2018-09-09',
						cardKind: '大卡',
						silenceDuration: '1年',
						packages: '全年',
						discount: '0.4',
						way: '年付',
						operate: '查看详情'
					},
					{
						serialNum: '1',
						cardNum: '123',
						company: '上海¥¥¥¥¥¥公司',
						operator: '电信',
						area: '上海',
						flowPackages: '30M',
						actualFlow: '10',
						entryTime: '2018-09-09',
						cardKind: '大卡',
						silenceDuration: '1年',
						packages: '全年',
						discount: '0.4',
						way: '年付',
						operate: '查看详情'
					}
				],
				// 分页需要的数据
				totalCount: 123,
				pageSize: 5,
				pageNo: 1,
				// 修改折扣的弹框
				modifyDiscount: false,
				oldDiscount: '4',
				valueBatch: '',
				valueDiscount: '',
				// 新增单卡的弹框
				singleCard: false,
				// 新增单卡弹框的表单
				singleCardForm: {
					cardNum: '',
					iccid: '',
					cardKind: '',
					openCompany: '',
					operator: '',
					packages: '',
					intoPool: '',
					orderFlow: '',
					payWay: '',
					attributionCompany: '',
					attributionArea: '',
					directedIP: '',
					entryTime: '',
					endTime: '',
					timeLimit: ''
				},
				fileList: []
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
			// 切换运营商的分类
			toggleOperator(index) {
				for (let i = 0; i < this.operatorData.length; i++) {
					this.operatorData[i].isSelected = false;
				}
				this.operatorData[index].isSelected = true
			},
			// 切换流量池套餐的分类
			toggleFlow(index) {
				for (let i = 0; i < this.flowPoolData.length; i++) {
					this.flowPoolData[i].isSelected = false;
				}
				this.flowPoolData[index].isSelected = true
			},
			// 点击新增单卡按钮
			btnAdd() {
				this.singleCard = true
			},
			// 点击新增单卡弹框的保存按钮
			saveForm() {
				this.singleCard = false
			},
			// 点击空白处让新增单卡的弹框消失
			closeNewADD() {
				this.singleCard = !this.singleCard
			},


			// 点击修改折扣按钮
			editDiscount() {
				this.modifyDiscount = true
			},
			// 修改折扣弹框的保存按钮
			save() {
				this.modifyDiscount = false
			},
			// 点击空白处让修改折扣的弹框消失
			closeModifyModal() {
				this.modifyDiscount = !this.modifyDiscount
			},

			// 批量导入
			handleChange(file, fileList) {
				this.fileList = fileList;
				var ids = this.handleUpOrDel(fileList);
			},
			handleRemove(file, fileList) {
				this.fileList = fileList;
				var ids = this.handleUpOrDel(fileList);
			},
			handleUpOrDel(fileList) {
				let ids = "";
				if (fileList) {
					for (var i = 0; i < fileList.length; i++) {
						console.log(fileList[i].response);
						var obj = fileList[i].response;
						if (obj) {
							if (obj.code) {
								ids += obj.record.successResponse[0].id;
								if (i < fileList.length - 1) {
									ids += ",";
								}
							}
						}
					}
				}
				return ids;
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
			/* 网卡列表 */
			.netWork-list {
				padding: 30px 30px 40px 30px;
				box-shadow: 0 0 5px rgba(187, 187, 187, 0.8);
				border-radius: 5px;
				/* tab栏 */
				.tab-nav {
					/* 运营商分类, 流量池分类 */
					.operator, .flow {
						display: flex;
						border-bottom: 1px solid #bbbbbb;
						height: 60px;
						line-height: 60px;
						.tips {
							font-size: 16px;
							color: #bbb;
						}
						.item-group {
							display: flex;
							.item {
								margin-left: 50px;
								cursor: pointer;
							}
							.current {
								color: mainBlue;
								/*text-decoration: underline;*/
								position: relative;
							}
							.current:after {
								display: block;
								content: '';
								width: 100%;
								height: 3px;
								background-color: mainBlue;
								position: absolute;
								left: 0;
								bottom: 5px;
							}
						}
					}
				}
				/* table栏 */
				.list-table {
					/* 工具栏 */
					.tools {
						display: flex;
						justify-content: center;
						margin: 35px 0 40px;
						/* 左侧的按钮组 */
						.btn-group {
							display: flex;
							.new-add, .modify-discount, .batch-import, .export-all {
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
						}
						/* 右侧的搜索组 */
						.search-group {
							display: flex;
							.search-number {
								margin-right: 20px;
							}
						}
					}
					/* table */
					.table {
						.el-pagination {
							margin-top: 20px;
							text-align: center;
						}
					}
				}
			}
		}
		/* 修改折扣的弹出框 */
		.modify-discount-modal {
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 999;
			background-color: rgba(0, 0, 0, 0.2);
			.discount-box {
				width: 30%;
				height: 400px;
				background-color: #fff;
				border-radius: 5px;
				position: absolute;
				transform: translate(-50%, -50%);
				left: 50%;
				top: 50%;
				.box-header {
					width: 100%;
					height: 50px;
					line-height: 50px;
					background-color: mainBlue;
					border-top-left-radius: 5px;
					border-top-right-radius: 5px;
					font-size: 22px;
					color: #fff;
					text-align: center;
				}
				.box-body {
					padding: 0 10%;
					/* 原折扣 */
					.old-discount {
						font-size: 18px;
						color: #999;
						height: 54px;
						line-height: 54px;
						border-bottom: 1px solid #bbbbbb;
						span {
							font-size: 20px;
							color: #d35858;
						}
					}
					/* 设置新折扣 */
					.set-new {
						h3 {
							font-size: 18px;
							font-weight: 400;
							margin: 20px 0;
						}
						/* 输入批次, 输入折扣 */
						.batch, .discount {
							display: flex;
							padding: 0 10%;
							span {
								font-size: 16px;
								color: #666;
								flex: 3;
							}
							.input {
								flex: 7;
								input {
									width: 100%;
									border-bottom: 1px solid #bbbbbb;
								}
								.tips {
									color: #d35858;
									span {
										font-size: 10px;
										color: #d35858;
									}
								}
							}
						}
						.discount {
							margin-top: 30px;
						}
						/* 保存按钮 */
						.btn-save {
							width: 190px;
							height: 32px;
							background-color: mainBlue;
							font-size: 16px;
							text-align: center;
							line-height: 32px;
							cursor: pointer;
							border-radius: 5px;
							color: #fff;
							margin: 40px auto 0;
						}
					}
				}
			}
		}
		/* 新增单卡的弹出框 */
		.new-add-modal {
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 999;
			background-color: rgba(0, 0, 0, 0.2);
			.add-card-box {
				width: 90%;
				height: 90%;
				background-color: #fff;
				border-radius: 5px;
				position: absolute;
				transform: translate(-50%, -50%);
				left: 50%;
				top: 50%;
				.box-header {
					width: 100%;
					height: 50px;
					line-height: 50px;
					background-color: mainBlue;
					border-top-left-radius: 5px;
					border-top-right-radius: 5px;
					font-size: 22px;
					color: #fff;
					text-align: center;
				}
				.box-body {
					.form {
						.form-row {
							display: flex;
							justify-content: space-between;
							padding: 0 2%;
							margin-top: 20px;
							.form-item {
								display: flex;
								line-height: 36px;
								flex: 1;
								.label {
									span {
										font-size: 18px;
										i {
											font-size: 18px;
											color: red;
										}
									}
								}
								.el-input {
									width: 250px;
									margin-left: 20px;
								}
							}
						}
						.btn-save {
							width: 120px;
							height: 40px;
							line-height: 40px;
							border-radius: 5px;
							background-color: mainBlue;
							color: #fff;
							text-align: center;
							cursor: pointer;
							font-size: 20px;
							margin: 20px auto 0;
						}
					}
				}
			}
		}
	}
</style>


