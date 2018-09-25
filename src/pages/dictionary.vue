<template>
	<div class="dictionary-wrap">
		<div class="content">
			<!-- 字典管理 -->
			<div class="dictionary-box">
				<!-- tab切换 -->
				<div class="nav">
					<div :class="[{current : navIndex == 0},'nav-item']" @click="toggleNav(0)">字典类别</div>
					<div :class="[{current : navIndex == 1},'nav-item']" @click="toggleNav(1)">字典内容</div>
				</div>
				<!-- 内容区域 -->
				<div class="dictionary">
					<!-- 字典类别 -->
					<div class="dictionary-kind" v-show="navIndex == 0">
						<!-- 工具栏 -->
						<div class="tools">
							<!-- 添加 -->
							<div class="add">
								<i class="el-icon-circle-plus-outline"></i>
								<span @click="addDictionaryKind">添加</span>
							</div>
							<!-- 编辑 -->
							<div class="edit">
								<i class="el-icon-edit-outline"></i>
								<span>编辑</span>
							</div>
						</div>
						<!-- 表格 -->
						<div class="table">
							<el-table
									:data="dictionaryKind.tableData"
									:show-header="dictionaryKind.showHeader"
									style="width: 100%">
								<el-table-column type="selection" width="55" align="center"></el-table-column>
								<el-table-column prop="name" label="名称" align="center"></el-table-column>
							</el-table>
						</div>
					</div>
					<!-- 字典内容 -->
					<div class="dictionary-content" v-show="navIndex == 1">
						<!-- 工具栏 -->
						<div class="tools">
							<!-- 左侧的按钮组 -->
							<div class="btn-group">
								<!-- 角色 -->
								<el-select clearable v-model="dictionaryContent.roleValue" placeholder="请选择角色">
									<el-option
											v-for="item in dictionaryContent.roleOptions"
											:key="item.value"
											:label="item.role"
											:value="item.value">
									</el-option>
								</el-select>
								<!-- 添加 -->
								<div class="add">
									<i class="el-icon-circle-plus-outline"></i>
									<span @click="addDictionaryContent">添加</span>
								</div>
								<!-- 编辑 -->
								<div class="edit">
									<i class="el-icon-edit-outline"></i>
									<span>编辑</span>
								</div>
							</div>
						</div>
						<!-- 表格 -->
						<div class="table">
							<el-table
									:data="dictionaryContent.tableData"
									border
									style="width: 100%">
								<el-table-column type="selection" width="55" align="center"></el-table-column>
								<el-table-column prop="id" label="ID" align="center"></el-table-column>
								<el-table-column prop="name" label="名称" align="center"></el-table-column>
								<el-table-column prop="code" label="代码" align="center"></el-table-column>
								<el-table-column prop="parent" label="上级字典" align="center"></el-table-column>
								<el-table-column prop="enable" label="是否启用" align="center"></el-table-column>
								<el-table-column prop="remark" label="备注" align="center"></el-table-column>
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
		</div>
		<!-- 字典类别的点击添加按钮的遮罩 -->
		<div class="dictionary-kind-add" @click.self="closeDictionaryKind" v-show="dictionaryKind.isAdd">
			<div class="add-box">
				<div class="box-header">添加</div>
				<div class="box-body">
					<div class="form">
						<!-- 上级类别 -->
						<div class="parent-category form-item">
							<span>上级类别：</span>
							<span>{{ dictionaryKind.form.parentCategory }}</span>
						</div>
						<!-- 名称 -->
						<div class="name form-item">
							<span>名称：</span>
							<el-input
									clearable
									placeholder="字典名称"
									v-model="dictionaryKind.form.name">
							</el-input>
						</div>
						<!-- 代码 -->
						<div class="code form-item">
							<span>代码：</span>
							<el-input
									clearable
									placeholder="字典代码"
									v-model="dictionaryKind.form.code">
							</el-input>
						</div>
						<!-- 备注或扩展 -->
						<div class="remark form-item">
							<span>备注或扩展：</span>
							<el-input
									clearable
									placeholder="备注或扩展"
									v-model="dictionaryKind.form.remark">
							</el-input>
						</div>
						<!-- 按钮组 -->
						<div class="btn-group">
							<div class="btn-sure">确认</div>
							<div class="btn-cancel">取消</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 字典内容的点击添加按钮的遮罩 -->
		<div class="dictionary-content-add" @click.self="closeDictionaryContent" v-show="dictionaryContent.isAdd">
			<div class="add-box">
				<div class="box-header">添加</div>
				<div class="box-body">
					<div class="form">
						<!-- 上级字典 -->
						<div class="parent-category form-item">
							<span>上级字典：</span>
							<el-select clearable v-model="dictionaryContent.form.typeValue" placeholder="请选择上级字典">
								<el-option
										v-for="item in dictionaryContent.form.typeOption"
										:key="item.value"
										:label="item.type"
										:value="item.value">
								</el-option>
							</el-select>
						</div>
						<!-- 名称 -->
						<div class="name form-item">
							<span>名称：</span>
							<el-input
									clearable
									placeholder="字典名称"
									v-model="dictionaryContent.form.name">
							</el-input>
						</div>
						<!-- 代码 -->
						<div class="code form-item">
							<span>代码：</span>
							<el-input
									clearable
									placeholder="字典代码"
									v-model="dictionaryContent.form.code">
							</el-input>
						</div>
						<!-- 是否启用 -->
						<div class="is-enable form-item">
							<span>是否启用：</span>
							<div class="radio-group">
								<el-radio v-model="dictionaryContent.form.isEnable" label="1">是</el-radio>
								<el-radio v-model="dictionaryContent.form.isEnable" label="0">否</el-radio>
							</div>
						</div>
						<!-- 备注或扩展 -->
						<div class="remark form-item">
							<span>备注或扩展：</span>
							<el-input
									clearable
									placeholder="备注或扩展"
									v-model="dictionaryContent.form.remark">
							</el-input>
						</div>
						<!-- 按钮组 -->
						<div class="btn-group">
							<div class="btn-sure">确认</div>
							<div class="btn-cancel">取消</div>
						</div>
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
				navIndex: 0,
				// 字典类别
				dictionaryKind: {
					isAdd: false,
					form: {
						parentCategory: '根目录',
						name: '',
						code: '',
						remark: ''
					},
					tableData: [
						{
							name: '用户角色'
						},
						{
							name: '运营商代理'
						}
					],
					showHeader: false
				},
				// 字典内容
				dictionaryContent: {
					isAdd: false,
					tableData: [
						{
							id: '1',
							name: '管理员',
							code: 'root',
							parent: '',
							enable: '',
							remark: ''
						},
						{
							id: '1',
							name: '管理员',
							code: 'root',
							parent: '',
							enable: '',
							remark: ''
						},
						{
							id: '1',
							name: '管理员',
							code: 'root',
							parent: '',
							enable: '',
							remark: ''
						},
						{
							id: '1',
							name: '管理员',
							code: 'root',
							parent: '',
							enable: '',
							remark: ''
						}
					],
					roleValue: '',
					roleOptions: [
						{
							role: '角色1',
							value: '1'
						},
						{
							role: '角色2',
							value: '2'
						},
						{
							role: '角色3',
							value: '3'
						}
					],
					form: {
						typeValue: '',
						typeOption: [
							{
								type: '类型1',
								value: '1'
							},
							{
								type: '类型2',
								value: '2'
							},
							{
								type: '类型3',
								value: '3'
							}
						],
						isEnable: '1',
						name: '',
						code: '',
						remark: ''
					}
				},
				// 分页需要的数据
				totalCount: 123,
				pageSize: 5,
				pageNo: 1,
			};
		},
		mounted() {

		},
		methods: {
			toggleNav(index){
				this.navIndex = index;
			},
			// 改变当前页数
			changePageNo(val) {
				this.pageNo = val;
			},
			// 改变每页显示的条数
			changeSize(val) {
				this.pageSize = val;
			},
			// -------------- 字典类别的相关方法 --------------
			// 点击添加按钮
			addDictionaryKind(){
				this.dictionaryKind.isAdd = true;
			},
			// 点击空白处让盒子消失
			closeDictionaryKind(){
				this.dictionaryKind.isAdd = false
			},
			// -------------- 字典内容的相关方法 --------------
			// 点击添加按钮
			addDictionaryContent(){
				this.dictionaryContent.isAdd = true;
			},
			// 点击空白处让盒子消失
			closeDictionaryContent(){
				this.dictionaryContent.isAdd = false;
			}
		}
	};
</script>

<style lang="stylus" scoped>
	mainBlue = #4cb2ff;
	.dictionary-wrap {
		padding-top: 50px;
		padding-left: 200px;
		.content {
			width: 100%;
			height: calc(100vh - 50px);
			padding: 20px;
			overflow-y: scroll;
			/* 字典管理 */
			.dictionary-box {
				width: 100%;
				border-radius: 5px;
				box-shadow: 0 0 5px rgba(187, 187, 187, 0.8);
				padding: 20px 40px 40px;
				/* tab切换 */
				.nav {
					display: flex;
					border-bottom: 1px solid #bbb;
					padding-bottom: 15px;
					.nav-item {
						font-size: 24px;
						margin-right: 80px;
						line-height: 60px;
						cursor: pointer;
					}
					.current {
						color: mainBlue;
						border-bottom: 5px solid mainBlue;
					}
				}
				/* 内容区域 */
				.dictionary {
					/* 字典类别 */
					.dictionary-kind {
						/* 工具栏 */
						.tools {
							display: flex;
							margin: 30px 0;
							.add, .edit, .refresh {
								cursor: pointer;
								i {
									font-size: 20px;
								}
								span {
									font-size: 22px;
								}
							}
							/* 添加 */
							.add {
								i {
									color: #2483c6;
								}
							}
							/* 编辑 */
							.edit {
								margin: 0 50px;
								i {
									color: #2483c6;
								}
							}
							/* 刷新 */
							.refresh {
								i {
									color: #7fcea4;
								}
							}
						}
						/* 表格 */
						.table {
							border-top: 1px solid #ebeef5;
						}
					}
					/* 字典内容 */
					.dictionary-content {
						/* 工具栏 */
						.tools {
							margin: 30px 0;
							display: flex;
							justify-content: space-between;
							/* 左侧的按钮组 */
							.btn-group {
								display: flex;
								.el-select {
									margin-right: 50px;
								}
								.add, .edit {
									cursor: pointer;
									line-height: 40px;
									i {
										font-size: 20px;
									}
									span {
										font-size: 22px;
									}
								}
								/* 添加 */
								.add {
									i {
										color: #2483c6;
									}
								}
								/* 编辑 */
								.edit {
									margin: 0 50px;
									i {
										color: #2483c6;
									}
								}
							}
						}
						/* 表格 */
						.table {
							.el-pagination {
								text-align: center;
								margin-top: 20px;
							}
						}
					}
				}
			}
		}
		/* 字典类别的遮罩 */
		.dictionary-kind-add {
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 999;
			background-color: rgba(0, 0, 0, 0.2);
			.add-box {
				width: 600px;
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
					.form {
						padding: 0 40px;
						.form-item {
							display: flex;
							margin-top: 15px;
							span {
								flex: 1;
								line-height: 40px;
							}
							.el-input, .el-select {
								flex: 5;
							}
						}
						/* 是否启用 */
						.is-enable {
							span {
								flex: 1;
							}
							.radio-group {
								flex: 5;
								line-height: 40px;
							}
						}
						/* 按钮组 */
						.btn-group {
							display: flex;
							justify-content: center;
							margin-top: 30px;
							/* 确认、取消 */
							.btn-sure, .btn-cancel {
								width: 90px;
								height: 32px;
								line-height: 32px;
								border-radius: 5px;
								cursor: pointer;
								text-align: center;
								font-size: 16px;
							}
							.btn-sure {
								background-color: mainBlue;
								color: #fff;
								margin-right: 60px;
							}
							.btn-cancel {
								border: 1px solid #bbb;
							}
						}
					}
				}
			}
		}
		/* 字典内容的遮罩 */
		.dictionary-content-add {
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 999;
			background-color: rgba(0, 0, 0, 0.2);
			.add-box {
				width: 600px;
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
					.form {
						padding: 0 40px;
						.form-item {
							display: flex;
							margin-top: 15px;
							span {
								flex: 1;
								line-height: 40px;
							}
							.el-input, .el-select {
								flex: 5;
							}
						}
						/* 是否启用 */
						.is-enable {
							span {
								flex: 1;
							}
							.radio-group {
								flex: 5;
								line-height: 40px;
							}
						}
						/* 按钮组 */
						.btn-group {
							display: flex;
							justify-content: center;
							margin-top: 30px;
							/* 确认、取消 */
							.btn-sure, .btn-cancel {
								width: 90px;
								height: 32px;
								line-height: 32px;
								border-radius: 5px;
								cursor: pointer;
								text-align: center;
								font-size: 16px;
							}
							.btn-sure {
								background-color: mainBlue;
								color: #fff;
								margin-right: 60px;
							}
							.btn-cancel {
								border: 1px solid #bbb;
							}
						}
					}
				}
			}
		}
	}
</style>