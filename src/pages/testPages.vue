<template>
	<div class="dictionary-wrap">
		<div class="content">
			<!-- 字典管理 -->
			<div class="dictionary-box">
				<!-- tab切换 -->
				<div class="nav">
					<div class="nav-item">字典类别</div>
				</div>
				<!-- 内容区域 -->
				<div class="dictionary">
					<!-- 字典类别 -->
					<div class="dictionary-kind">
						<!-- 工具栏 -->
						<div class="tools">
							<!-- 添加 -->
							<div class="add">
								<i class="el-icon-circle-plus-outline"></i>
								<span @click="add">添加</span>
							</div>
						</div>
						<!-- 表格 -->
						<div class="el-tree">
							<el-tree
									:data="dictionaryKind.treeData"
									show-checkbox
									node-key="id"
									@check-change="checkChange"
									:props="dictionaryKind.defaultProps">
							</el-tree>
							<!-- 向上滚动消息demo -->
							<ul id="con1" ref="con1" :class="{anim:animate==true}">
								<li v-for="(item,index) in items" :key="index">
									{{ item.name }}
								</li>
							</ul>
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
						parentCategory: '',
						name: '',
						code: '',
						remark: ''
					},
					showHeader: false,
					defaultProps: {
						children: 'children',
						label: 'label'
					},
					treeData: [
						{
							id: 1,
							label: '一级 1',
							children: [
								{
									id: 3,
									label: '二级 1-1'
								},
								{
									id: 4,
									label: '二级 1-2',
									children: [
										{
											id: 10,
											label: '三级 1-2-1'
										}
									]
								},
								{
									id: 5,
									label: '二级 1-3'
								}
							]
						},
						{
							id: 2,
							label: '一级 2',
							children: [
								{
									id: 6,
									label: '二级 2-1'
								}
							]
						}
					],
					editCheckId: '',
					checkedParentCategory: ''
				},
				animate:false,
				items:[
					{name:"马云"},
					{name:"雷军"},
					{name:"王勤"}
				]
			};
		},
		mounted() {
			setInterval(this.scroll,2000)
		},
		methods: {
			checkChange(item, node, self){
				console.log(item, node, self)
				console.log('====================')
			},
			add(){

			},
			scroll(){
				this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
				setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
					this.items.push(this.items[0]);  // 将数组的第一个元素添加到数组的
					this.items.shift();               //删除数组的第一个元素
					this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
				},500)
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
						.el-tree {
							border-top: 1px solid #ebeef5;
							/*.cell {
								.add {
									cursor: pointer;
									color: mainBlue;
								}
							}*/
							ul {
								width: 300px;
								height: 32px;
								overflow: hidden;
								padding-left: 30px;
								border: 1px solid black;
								li {
									list-style: none;
									line-height: 30px;
									height: 30px;
								}
							}
							.anim{
								transition: all 0.5s;
								margin-top: -30px;
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
<style>
	.el-tree .el-tree-node__content {
		height: 50px;
		border-bottom: 1px solid #ebeef5;
	}
</style>