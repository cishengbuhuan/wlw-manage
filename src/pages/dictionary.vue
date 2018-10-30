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
							<!--<div class="edit">-->
								<!--<i class="el-icon-edit-outline"></i>-->
								<!--<span>编辑</span>-->
							<!--</div>-->
						</div>
						<!-- 表格 -->
						<div class="el-tree">
							<el-tree
									:props="dictionaryKind.defaultProps"
									:data="dictionaryKind.treeData"
									show-checkbox
									node-key="id"
									:check-strictly="true"
									:highlight-current="true"
									default-expand-all
									:expand-on-click-node="false"
									ref="tree"
									@check-change="checkChange"
									@node-click="nodeClick">
							</el-tree>
						</div>
					</div>
					<!-- 字典内容 -->
					<div class="dictionary-content" v-show="navIndex == 1">
						<!-- 工具栏 -->
						<div class="tools">
							<!-- 左侧的按钮组 -->
							<div class="btn-group">
								<!-- 角色 -->
								<el-select
										clearable
										filterable
										@change="searchRole"
										v-model="dictionaryContent.roleValue"
										placeholder="请选择角色">
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
								<el-table-column label="操作" align="center">
									<template slot-scope="scope">
										<div class="edit" @click="btnEdit(scope.row)">编辑</div>
									</template>
								</el-table-column>
							</el-table>
							<el-pagination
									v-if="dictionaryContent.totalCount > dictionaryContent.pageSize"
									layout="total, sizes, prev, pager, next, jumper"
									:page-size="dictionaryContent.pageSize"
									:current-page="dictionaryContent.pageNo"
									:total="dictionaryContent.totalCount"
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
							<div class="btn-sure" @click="saveDictionaryKind(1)">确认</div>
							<div class="btn-cancel" @click="saveDictionaryKind(0)">取消</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 字典内容的点击添加按钮的遮罩 -->
		<div class="dictionary-content-add" @click.self="closeDictionaryContent" v-show="dictionaryContent.isAdd">
			<div class="add-box">
				<div class="box-header">{{ dictionaryContent.form.title }}</div>
				<div class="box-body">
					<div class="form">
						<!-- 上级字典 -->
						<div class="parent-category form-item">
							<span>上级字典：</span>
							<el-input
									clearable
									disabled=""
									v-model="dictionaryContent.form.parentDictionary">
							</el-input>
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
						<div class="btn-group" v-show="dictionaryContent.form.isAdd">
							<div class="btn-sure" @click="btnDictionaryContent(1)">确认</div>
							<div class="btn-cancel" @click="btnDictionaryContent(0)">取消</div>
						</div>
						<div class="btn-group" v-show="!dictionaryContent.form.isAdd">
							<div class="btn-sure" @click="btnEditSure(1)">确认</div>
							<div class="btn-cancel" @click="btnEditSure(0)">取消</div>
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
					tableData: [
						{
							name: '用户角色'
						},
						{
							name: '运营商代理'
						}
					],
					showHeader: false,
					defaultProps: {
						children: 'children',
						label: 'label'
					},
					treeData: [],
					editCheckId: '',
					checkedParentCategory: ''
				},
				// 字典内容
				dictionaryContent: {
					isAdd: false,
					tableData: [],
					roleValue: '',
					roleOptions: [],
					// 选中的角色的id、dicttype
					selectedRoleId: '',
					selectedDicttype: '',
					form: {
						title: '',
						parentDictionary: '',
						isEnable: '1',
						name: '',
						code: '',
						remark: '',
						isAdd: true
					},
					// 分页需要的数据
					totalCount: 0,
					pageSize: 20,
					pageNo: 1,
					oldData: []
				},
			};
		},
		mounted() {
			this.getAllDictionary()
			this.getAllRoleOptions()
		},
		methods: {
			toggleNav(index) {
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
			// 获取全部字典
			getAllDictionary(){
				this.$axios({
					url: '/admin/dict/all',
					method: 'post'
				}).then(res => {
					let data = res.data.data
					console.log(data)
					let result = []
					for(let i=0; i<data.length; i++){
						if(data[i].dicttype === 'sys'){
							result.push(data[i])
						}
					}

					let dict=[];
					for(let t of result){
						if(t.dictpid === 0){
							t.id= t.dictid
							t.label = t.dictname
							dict.push(t)
							getItem(t)
						}
					}
					function getItem(p){
						for(let a of result){
							if(p.dictid === a.dictpid){
								if(!p.hasOwnProperty('children')){
									p.children=[];
								}
								a.id= a.dictid
								a.label = a.dictname
								p['children'].push(a)
								getItem(a);
							}
						}
						return
					}
					this.dictionaryKind.treeData = dict
					console.log(dict)
				})
			},
			// 点击添加按钮
			addDictionaryKind() {
				if (this.dictionaryKind.editCheckId == '') {
					this.$message.info("未选中节点");
				} else {
					this.dictionaryKind.isAdd = true;
					this.dictionaryKind.form.parentCategory = this.dictionaryKind.checkedParentCategory;
					this.$message.success("新增节点id："+JSON.stringify(this.dictionaryKind.editCheckId));
				}
			},
			// 点击添加弹框的保存按钮
			saveDictionaryKind(i){
				if(i==0){
					this.dictionaryKind.isAdd = false
				}else {
					this.$axios({
						url: '/admin/dict/save',
						method: 'post',
						params: {
							dictname: this.dictionaryKind.form.name,
							dictcode: this.dictionaryKind.form.code,
							remark: this.dictionaryKind.form.remark,
							dictpid: this.dictionaryKind.editCheckId,
							dicttype: 'sys',
							dictid: '0',
							enable: '1',
							orderindex: '1'
						}
					}).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
						}else {
							this.$message.error(res.data.msg);
						}
						this.dictionaryKind.form.name = ''
						this.dictionaryKind.form.code = ''
						this.dictionaryKind.form.remark = ''
						this.dictionaryKind.isAdd = false
						// 清空字典类别，重新获取数据
						this.dictionaryKind.treeData = []
						this.getAllDictionary()
					})
				}
			},
			// 点击空白处让盒子消失
			closeDictionaryKind() {
				this.dictionaryKind.isAdd = false
			},
			// 点击编辑按钮
			editRow(data){
				this.dictionaryKind.isAdd = true;
				console.log(data)
			},
			checkChange(item, node, self){
				if (node==true) {//点击未选中复选框
					this.dictionaryKind.editCheckId = item.id;
					this.dictionaryKind.checkedParentCategory = item.label;
					this.$refs.tree.setCheckedKeys([item.id]);
				} else {
					if (this.dictionaryKind.editCheckId == item.id) {//点击已选中复选框，保证至少一个选中
						this.$refs.tree.setCheckedKeys([item.id]);
					}
				}
			},
			nodeClick(item, node, self){
				this.dictionaryKind.editCheckId = item.id;
				this.dictionaryKind.checkedParentCategory = item.label;
				this.$refs.tree.setCheckedKeys([item.id]);
				console.log(item)
			},
			// -------------- 字典内容的相关方法 --------------
			// 获取到所有的角色下拉选项 和 字典内容
			getAllRoleOptions(){
				this.$axios({
					url: '/admin/dict/all',
					method: 'post'
				}).then(res => {
					let data = res.data.data
					let result = []
					for(let i=0; i<data.length; i++){
						if(data[i].dicttype === 'sys'){
							result.push(data[i])
						}
					}
					this.dictionaryContent.roleOptions = []
					for(let i=0; i<result.length; i++){
						// 获取字典内容的角色下拉选项
						this.dictionaryContent.roleOptions.push({
							role: result[i].dictname,
							value: result[i].dictid,
							dicttype: result[i].dicttype,
						})

						for(let j=0; j<result.length; j++){
							if(result[i].dictid === result[j].dictpid){
								result[j].parent = result[i].dictname
								// 获取到字典内容的数据表
								this.dictionaryContent.tableData.push({
									id: result[j].dictid,
									name: result[j].dictname,
									code: result[j].dictcode,
									parent: result[j].parent,
									enable: result[j].enable === 1 ? '是' : '否',
									remark: result[j].remark,
									dictpid: result[j].dictpid,
									dicttype: result[j].dicttype,
								})
							}
						}
					}
					this.dictionaryContent.oldData = this.dictionaryContent.tableData
				})
			},
			// 点击添加按钮
			addDictionaryContent() {
				if(this.dictionaryContent.selectedRoleId == ''){
					this.$message.info('请先选择对应的角色！');
				}else {
					this.dictionaryContent.isAdd = true;
					this.dictionaryContent.form.title = '添加'
					this.dictionaryContent.form.isAdd = true
				}
			},
			// 添加弹出框的保存或者取消
			btnDictionaryContent(i){
				if(i==0){
					this.dictionaryContent.isAdd = false;
				}else {
					this.$axios({
						url: '/admin/dict/save',
						method: 'post',
						params: {
							dictpid: this.dictionaryContent.selectedRoleId,
							dictname: this.dictionaryContent.form.name,
							dictcode: this.dictionaryContent.form.code,
							enable: this.dictionaryContent.form.isEnable,
							remark: this.dictionaryContent.form.remark,
							dictid: 0,
							dicttype: this.dictionaryContent.selectedDicttype
						}
					}).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.dictionaryContent.tableData = []
							this.getAllRoleOptions()
						}else {
							this.$message.error(res.data.msg);
						}
						// 清空弹框内容并关闭弹框
						this.dictionaryContent.selectedRoleId = ''
						this.dictionaryContent.form.name = ''
						this.dictionaryContent.form.code = ''
						this.dictionaryContent.form.remark = ''
						this.dictionaryContent.isAdd = false;
					})
				}
			},
			// 编辑
			btnEdit(data){
				this.dictionaryContent.isAdd = true;
				this.dictionaryContent.form.title = '编辑'
				this.dictionaryContent.form.isAdd = false

				this.dictionaryContent.form.parentDictionary = data.parent
				this.dictionaryContent.form.name = data.name
				this.dictionaryContent.form.code = data.code
				this.dictionaryContent.form.dictpid = data.dictpid
				this.dictionaryContent.form.remark = data.remark
				this.dictionaryContent.form.isEnable = data.enable === '是' ? '1' : '0'
				this.dictionaryContent.selectedRoleId = data.id
				this.dictionaryContent.selectedDicttype = data.dicttype
				console.log(data)
			},
			// 编辑的保存
			btnEditSure(i){
				if(i==0){
					this.dictionaryContent.isAdd = false;
				}else {
					this.$axios({
						url: '/admin/dict/modify',
						method: 'post',
						params: {
							dictpid: this.dictionaryContent.form.dictpid,
							dictname: this.dictionaryContent.form.name,
							dictcode: this.dictionaryContent.form.code,
							enable: this.dictionaryContent.form.isEnable,
							remark: this.dictionaryContent.form.remark,
							dictid: this.dictionaryContent.selectedRoleId,
							dicttype: this.dictionaryContent.selectedDicttype
						}
					}).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.dictionaryContent.tableData = []
							this.getAllRoleOptions()
						}else {
							this.$message.error(res.data.msg);
						}
						// 清空弹框内容并关闭弹框
						this.dictionaryContent.selectedRoleId = ''
						this.dictionaryContent.form.name = ''
						this.dictionaryContent.form.code = ''
						this.dictionaryContent.form.remark = ''
						this.dictionaryContent.isAdd = false;
					})
				}
			},
			// 点击空白处让盒子消失
			closeDictionaryContent() {
				this.dictionaryContent.isAdd = false;
			},
			// 筛选字典内容的数据
			searchRole(val){
				this.dictionaryContent.selectedRoleId = val
				this.dictionaryContent.tableData = this.dictionaryContent.oldData
				let obj = {};
				obj = this.dictionaryContent.roleOptions.find((item)=>{
					return item.value === val;
				});
				this.dictionaryContent.selectedDicttype = obj.dicttype
				// 当前选中的上级字典
				this.dictionaryContent.form.parentDictionary = obj.role
				let filterData = []
				let oldData = this.dictionaryContent.tableData
				for(let i=0; i<oldData.length; i++){
					if(oldData[i].parent === obj.role){
						filterData.push(oldData[i])
					}
				}
				console.log(filterData)
				this.dictionaryContent.tableData = filterData
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
							.cell {
								.edit {
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