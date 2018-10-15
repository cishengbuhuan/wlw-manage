<template>
	<div class="system-wrap">
		<div class="content">
			<!-- 系统管理 -->
			<div class="system-box">
				<!-- tab切换 -->
				<div class="nav">
					<div :class="[{current : navIndex == 0},'nav-item']" @click="toggleNav(0)">菜单管理</div>
					<div :class="[{current : navIndex == 1},'nav-item']" @click="toggleNav(1)">用户管理</div>
					<div :class="[{current : navIndex == 2},'nav-item']" @click="toggleNav(2)">权限配置</div>
					<div :class="[{current : navIndex == 3},'nav-item']" @click="toggleNav(3)">系统配置</div>
				</div>
				<!-- 内容区域 -->
				<div class="system-content">
					<!-- 菜单管理 -->
					<div class="menu-manage" v-show="navIndex == 0">
						<!-- 工具栏 -->
						<div class="tools">
							<!-- 添加 -->
							<!--<div class="add">-->
								<!--<i class="el-icon-circle-plus-outline"></i>-->
								<!--<span>添加</span>-->
							<!--</div>-->
							<!--&lt;!&ndash; 编辑 &ndash;&gt;-->
							<!--<div class="edit">-->
								<!--<i class="el-icon-edit-outline"></i>-->
								<!--<span>编辑</span>-->
							<!--</div>-->
							<!--&lt;!&ndash; 刷新 &ndash;&gt;-->
							<!--<div class="refresh">-->
								<!--<i class="el-icon-refresh"></i>-->
								<!--<span>刷新</span>-->
							<!--</div>-->
						</div>
						<!-- 表格 -->
						<div class="table">
							<el-table
									:data="menuManage.tableData"
									border
									style="width: 100%">
								<el-table-column prop="sortNum" label="序号" width="80" align="center"></el-table-column>
								<el-table-column prop="name" label="模块名称" width="200" align="center"></el-table-column>
								<el-table-column prop="code" label="动作（代码）" align="left">
									<template slot-scope="scope">
										<div class="code">
											<div class="add" @click="menuNewAdd(scope.row)">新增</div>
											<div class="delete" @click="deleteRow(scope.row)">删除</div>
											<el-checkbox-group v-model="scope.row.checkedCode"
											                   @change="handleCheckedCodeChange">
												<el-checkbox v-for="(item,index) in scope.row.codeArr"
												             :label="item.name" :key="item.name">{{ item.name
													}}({{ item.code }})
												</el-checkbox>
											</el-checkbox-group>
										</div>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</div>
					<!-- 用户管理 -->
					<div class="customer-manage" v-show="navIndex == 1">
						<!-- 工具栏 -->
						<div class="tools">
							<!-- 左侧的按钮组 -->
							<div class="btn-group">
								<!-- 添加 -->
								<div class="add" @click="manageAdd">
									<i class="el-icon-circle-plus-outline"></i>
									<span>添加</span>
								</div>
								<!-- 编辑 -->
								<div class="edit" @click="manageEdit">
									<i class="el-icon-edit-outline"></i>
									<span>编辑</span>
								</div>
								<!-- 启用 -->
								<div class="enable" @click="btnEnable(1)">
									<i class="el-icon-circle-check"></i>
									<span>启用</span>
								</div>
								<!-- 禁用 -->
								<div class="disable" @click="btnEnable(0)">
									<i class="el-icon-remove"></i>
									<span>禁用</span>
								</div>
							</div>
							<!-- 右侧的搜索组 -->
							<div class="search-group">
								<!-- 角色 -->
								<el-select
										clearable
										@change="selectList"
										v-model="customerManage.role.valueType"
										placeholder="请选择角色">
									<el-option
											v-for="item in customerManage.role.roleOptions"
											:key="item.value"
											:label="item.role"
											:value="item.value">
									</el-option>
								</el-select>
								<!-- 姓名或账号 -->
								<el-input
										clearable
										@change="selectList"
										class="name-account"
										placeholder="姓名或账号"
										v-model="customerManage.nameAccount">
								</el-input>
							</div>
						</div>
						<!-- 表格 -->
						<div class="table">
							<el-table
									:data="customerManage.listData"
									border
									@select="selectRows"
									style="width: 100%">
								<el-table-column type="selection" width="55" align="center"></el-table-column>
								<el-table-column prop="serialNum" label="序号" align="center"></el-table-column>
								<el-table-column prop="name" label="姓名" align="center"></el-table-column>
								<el-table-column prop="account" label="账号" align="center"></el-table-column>
								<el-table-column prop="password" label="密码" v-if="false"
								                 align="center"></el-table-column>
								<el-table-column prop="sex" label="性别" align="center"></el-table-column>
								<el-table-column prop="birthday" label="生日" align="center"></el-table-column>
								<el-table-column prop="role" label="角色" align="center"></el-table-column>
								<el-table-column prop="phone" label="电话" align="center"></el-table-column>
								<el-table-column prop="isAble" label="是否启用" align="center"></el-table-column>
							</el-table>
							<el-pagination
									v-if="menuManage.totalCount > menuManage.pageSize"
									layout="total, sizes, prev, pager, next, jumper"
									:page-size="menuManage.pageSize"
									:current-page="menuManage.pageNo"
									:total="menuManage.totalCount"
									:page-sizes="[20, 50, 100]"
									@size-change="changeSize"
									@current-change="changePageNo">
							</el-pagination>
						</div>
					</div>
					<!-- 权限配置 -->
					<div class="permission-config" v-show="navIndex == 2">
						<!-- 工具栏 -->
						<div class="tools">
							<!-- 角色下拉框 -->
							<el-select
									clearable
									v-model="permissionConfig.roleValue"
									@change="searchPermission"
									placeholder="请选择角色">
								<el-option
										v-for="item in permissionConfig.roleOption"
										:key="item.value"
										:label="item.role"
										:value="item.value">
								</el-option>
							</el-select>
							<!-- 保存按钮 -->
							<div class="save-permission" @click="saveMenuPermission">
								<i class="el-icon-circle-plus"></i>保存菜单权限
							</div>
						</div>
						<!-- 表格 -->
						<div class="table">
							<el-table
									:data="permissionConfig.tableData"
									border
									style="width: 100%">
								<el-table-column prop="sortNum" label="序号" width="80" align="center"></el-table-column>
								<el-table-column prop="name" label="模块名称" width="200" align="center"></el-table-column>
								<el-table-column prop="code" label="动作（代码）" align="left">
									<template slot-scope="scope">
										<div class="code">
											<div class="add" @click="menuNewAdd(scope.row)">新增</div>
											<div class="delete" @click="deleteRow(scope.row)">删除</div>
											<el-checkbox-group v-model="scope.row.checkedCode"
											                   @change="handleCheckedCodeChange">
												<el-checkbox v-for="(item,index) in scope.row.codeArr"
												             :label="item.name" :key="item.name">{{ item.name
													}}({{ item.code }})
												</el-checkbox>
											</el-checkbox-group>
										</div>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</div>
					<!-- 系统配置 -->
					<div class="system-config" v-show="navIndex == 3">
						<!-- 工具栏 -->
						<div class="tools">
							<!-- 左侧的按钮组 -->
							<div class="btn-group">
								<!-- 添加 -->
								<div class="add" @click="addSystemConfig">
									<i class="el-icon-circle-plus-outline"></i>
									<span>添加</span>
								</div>
							</div>
							<!-- 右侧的搜索组 -->
							<div class="search-group">
								<!-- 配置键 -->
								<el-input
										clearable
										placeholder="配置键"
										@change="keyChange"
										v-model="systemConfig.configKey">
								</el-input>
								<!-- 配置值 -->
								<el-input
										clearable
										class="config-value"
										@change="valueChange"
										placeholder="配置值"
										v-model="systemConfig.configValue">
								</el-input>
								<!-- 备注 -->
								<el-input
										clearable
										@change="remarkChange"
										placeholder="备注"
										v-model="systemConfig.remark">
								</el-input>
							</div>
						</div>
						<!-- 表格 -->
						<div class="table">
							<el-table
									:data="systemConfig.listData"
									border
									style="width: 100%">
								<el-table-column prop="serialNum" label="序号" align="center"></el-table-column>
								<el-table-column prop="key" label="键" align="center"></el-table-column>
								<el-table-column prop="value" label="值" align="center"></el-table-column>
								<el-table-column prop="remark" label="备注" align="center"></el-table-column>
								<el-table-column label="操作" align="center">
									<template slot-scope="scope">
										<div class="edit" @click="editSystemConfig(scope.row)">编辑</div>
									</template>
								</el-table-column>
							</el-table>
							<el-pagination
									v-if="systemConfig.totalCount > systemConfig.pageSize"
									layout="total, sizes, prev, pager, next, jumper"
									:page-size="systemConfig.pageSize"
									:current-page="systemConfig.pageNo"
									:total="systemConfig.totalCount"
									:page-sizes="[20, 50, 100]"
									@size-change="systemChangeSize"
									@current-change="systemChangePageNo">
							</el-pagination>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 菜单管理的添加用户的遮罩 -->
		<div class="menu-edit-model" @click.self="closeMenuManage" v-show="menuManage.isShow">
			<div class="edit-box">
				<div class="box-header">新增</div>
				<div class="box-body">
					<div class="form">
						<!-- 名称 -->
						<div class="name form-item">
							<span>名称：</span>
							<el-input
									clearable
									placeholder="请输入名称"
									v-model="menuManage.form.name">
							</el-input>
						</div>
						<!-- 代码 -->
						<div class="code form-item">
							<span>代码：</span>
							<el-select clearable v-model="menuManage.form.codeValue" placeholder="请选择动作代码">
								<el-option
										v-for="item in menuManage.form.codeOption"
										:key="item.value"
										:label="item.code"
										:value="item.value">
								</el-option>
							</el-select>
						</div>
						<!-- 按钮组 -->
						<div class="btn-group">
							<div class="btn-sure" @click="btnMenuOperator(1)">确认</div>
							<div class="btn-cancel" @click="btnMenuOperator(0)">取消</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 用户管理的添加用户的遮罩 -->
		<div class="add-new-customer-modal" @click.self="closeAddNew" v-show="customerManage.isAddNewCustomer">
			<div class="add-box">
				<div class="box-header">{{ customerManage.form.title }}</div>
				<div class="box-body">
					<div class="form">
						<!-- 姓名 -->
						<div class="name form-item">
							<span>姓名：</span>
							<el-input
									clearable
									placeholder="请输入姓名"
									v-model="customerManage.form.name">
							</el-input>
						</div>
						<!-- 性别 -->
						<div class="sex form-item">
							<span>性别：</span>
							<el-select clearable v-model="customerManage.form.sexValue" placeholder="请选择用户性别">
								<el-option
										v-for="item in customerManage.form.sexOption"
										:key="item.value"
										:label="item.sex"
										:value="item.value">
								</el-option>
							</el-select>
						</div>
						<!-- 登录名 -->
						<div class="login-name form-item">
							<span>登录名：</span>
							<el-input
									clearable
									placeholder="请输入登录名"
									v-model="customerManage.form.loginName">
							</el-input>
						</div>
						<!-- 登录密码 -->
						<div class="login-psw form-item">
							<span>登录密码：</span>
							<el-input
									clearable
									type="password"
									placeholder="请输入登录密码"
									v-model="customerManage.form.loginPsw">
							</el-input>
						</div>
						<!-- 用户角色 -->
						<div class="role form-item">
							<span>用户角色：</span>
							<el-select clearable v-model="customerManage.form.roleValue" placeholder="请选择用户角色">
								<el-option
										v-for="item in customerManage.form.roleOption"
										:key="item.value"
										:label="item.role"
										:value="item.value">
								</el-option>
							</el-select>
						</div>
						<!-- 生日 -->
						<div class="birthday form-item">
							<span>生日：</span>
							<el-date-picker
									v-model="customerManage.form.birthday"
									type="date"
									placeholder="选择生日">
							</el-date-picker>
						</div>
						<!-- 手机号码 -->
						<div class="phone form-item">
							<span>手机号码：</span>
							<el-input
									clearable
									placeholder="请输入手机号码"
									v-model="customerManage.form.phone">
							</el-input>
						</div>
						<!-- 是否启用 -->
						<div class="is-enable form-item">
							<span>是否启用：</span>
							<div class="radio-group">
								<el-radio v-model="customerManage.form.isEnable" label="1">是</el-radio>
								<el-radio v-model="customerManage.form.isEnable" label="0">否</el-radio>
							</div>
						</div>
						<!-- 按钮组 -->
						<div class="btn-group">
							<div class="btn-sure" v-if="customerManage.isAdd" @click="btnAddSave">确认</div>
							<div class="btn-sure" v-if="!customerManage.isAdd" @click="btnEditSave">确认</div>
							<div class="btn-cancel">取消</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 系统配置的添加遮罩 -->
		<div class="system-config-model" @click.self="closeSystemConfig" v-show="systemConfig.isModal">
			<div class="config-box">
				<div class="box-header">{{ systemConfig.form.title }}</div>
				<div class="box-body">
					<div class="form">
						<!-- 名称 -->
						<div class="key form-item">
							<span>配置键：</span>
							<el-input
									clearable
									placeholder="请输入配置键"
									v-model="systemConfig.form.key">
							</el-input>
						</div>
						<!-- 代码 -->
						<div class="value form-item">
							<span>配置值：</span>
							<el-input
									clearable
									placeholder="请输入配置值"
									v-model="systemConfig.form.value">
							</el-input>
						</div>
						<!-- 备注 -->
						<div class="remark form-item">
							<span>备注：</span>
							<el-input
									clearable
									placeholder="请输入备注"
									v-model="systemConfig.form.remark">
							</el-input>
						</div>
						<!-- 按钮组 -->
						<div class="btn-group">
							<div class="btn-sure" @click="btnSystemOperator(1)">确认</div>
							<div class="btn-cancel" @click="btnSystemOperator(0)">取消</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {format} from '../api/dataUtil'

	export default {
		data() {
			return {
				navIndex: 2,
				// 菜单管理
				menuManage: {
					isShow: false,
					tableData: [],
					form: {
						menuid: '',
						name: '',
						codeValue: '',
						codeOption: [
							{
								code: '1',
								value: '1'
							},
							{
								code: '2',
								value: '2'
							},
							{
								code: '4',
								value: '4'
							},
							{
								code: '8',
								value: '8'
							}
						]
					},
					currentData: []
				},
				// 用户管理
				customerManage: {
					// 角色
					role: {
						valueRole: '',
						defaultRole: '',
						roleOptions: [
							{
								role: '超级管理员',
								value: '2'
							},
							{
								role: '平台公司账号',
								value: '6'
							}
						]
					},
					// 姓名或账号
					nameAccount: '',
					// 用户管理列表
					listData: [],
					// 添加用户的遮罩
					isAddNewCustomer: false,
					// 添加用户的表单
					form: {
						title: '',
						name: '',
						// 性别
						sexValue: '',
						sexOption: [
							{
								sex: '男',
								value: '1'
							},
							{
								sex: '女',
								value: '2'
							},
							{
								sex: '保密',
								value: '0'
							}
						],
						// 用户角色
						roleValue: '',
						roleOption: [],
						loginName: '',
						loginPsw: '',
						birthday: '',
						phone: '',
						isEnable: '1'
					},
					// 分页需要的数据
					totalCount: 0,
					pageSize: 20,
					pageNo: 1,
					// 当前选中的数组
					selectArr: [],
					isAdd: true
				},
				// 权限配置
				permissionConfig: {
					roleValue: '',
					roleOption: [],
					defaultDictid: '',
					tableData: [],
					// 分页需要的数据
					totalCount: 0,
					pageSize: 20,
					pageNo: 1,
				},
				// 系统配置
				systemConfig: {
					configKey: '',
					configValue: '',
					remark: '',
					listData: [],
					// 分页需要的数据
					totalCount: 0,
					pageSize: 20,
					pageNo: 1,
					isModal: false,
					form: {
						title: '',
						key: '',
						value: '',
						remark: ''
					}
				},

				// 申请开票的工具栏搜索
				apply: {
					// 公司名称
					companyName: '',
					// 类型选中值
					valueType: '',
					// 类型筛选
					typeOptions: [
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
					]
				},
				// 开票明细的工具栏搜索
				details: {
					//  公司名称
					companyName: '',
					// 类型选中值
					valueType: '',
					// 类型筛选
					typeOptions: [
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
					]
				},


				// 申请开票的表格数据
				applyData: [
					{
						serialNum: 1,
						companyName: '上海***信息技术有限公司',
						companyBank: '--',
						bankAccount: '--',
						address: '--',
						amount: '--',
						time: '2018-09-10',
						type: '预扣款',
						status: '扣款成功',
						operate: ''
					}, {
						serialNum: 1,
						companyName: '上海***信息技术有限公司',
						companyBank: '--',
						bankAccount: '--',
						address: '--',
						amount: '--',
						time: '2018-09-10',
						type: '预扣款',
						status: '扣款成功',
						operate: ''
					}, {
						serialNum: 1,
						companyName: '上海***信息技术有限公司',
						companyBank: '--',
						bankAccount: '--',
						address: '--',
						amount: '--',
						time: '2018-09-10',
						type: '预扣款',
						status: '扣款成功',
						operate: ''
					}
				],
				// 开票明细的表格数据
				detailData: [
					{
						serialNum: 1,
						contactName: '杭三',
						phone: '123456',
						companyName: '上海***信息技术有限公司',
						batch: '2018-09-09',
						time: '2018-09-10',
						way: '月扣',
						type: '预扣款',
						status: '扣款成功'
					},
					{
						serialNum: 2,
						contactName: '杭三',
						phone: '123456',
						companyName: '上海***信息技术有限公司',
						batch: '2018-09-09',
						time: '2018-09-10',
						way: '月扣',
						type: '预扣款',
						status: '扣款成功'
					},
					{
						serialNum: 3,
						contactName: '杭三',
						phone: '123456',
						companyName: '上海***信息技术有限公司',
						batch: '2018-09-09',
						time: '2018-09-10',
						way: '月扣',
						type: '预扣款',
						status: '扣款成功'
					}
				],
			};
		},
		mounted() {
			this.getSystemConfigList()
			this.getMenuListData()
			this.getCustomerManageList()
			this.getPermissionRoleOptions()
		},
		methods: {
			toggleNav(index) {
				this.navIndex = index;
			},
			// --------------------- 菜单管理的相关方法 ---------------------
			// 获取菜单管理列表数据
			getMenuListData() {
				this.$axios({
					url: '/admin/menu/allWithFunc',
					method: 'post'
				}).then(res => {
					let data = res.data.data
//					console.log(data)
//					console.log(this.menuManage.tableData)
					for (let i = 0; i < data.length; i++) {
						this.menuManage.tableData.push({
							sortNum: i + 1,
							name: data[i].menuname,
							checkedCode: [],
							codeArr: [],
							menuid: data[i].menuid
						})
						for (let j = 0; j < data[i].functions.length; j++) {
							this.menuManage.tableData[i].codeArr.push({
								name: data[i].functions[j].name,
								code: data[i].functions[j].action,
								actionid: data[i].functions[j].actionid
							})
						}
					}
				})
			},
			// 切换选中代码
			handleCheckedCodeChange(value) {
				console.log(value)
			},
			// 新增
			menuNewAdd(row) {
				console.log(row)
				this.menuManage.currentData = row.codeArr;
				this.menuManage.form.menuid = row.menuid;
				this.menuManage.isShow = true;
			},
			// 删除
			deleteRow(row) {
				// 当前选中的项
				let checked = row.checkedCode;
				let ids = ''
				for(let i=0; i<row.codeArr.length; i++){
					for(let j=0; j<checked.length; j++){
						if(row.codeArr[i].name == checked[j]){
							ids +=  ',' +row.codeArr[i].actionid
						}
					}
				}
				this.$axios({
					url: '/admin/action/remove',
					method: 'post',
					params: {
						dictid: row.menuid,
						ids: ids.slice(1,ids.length),
					}
				}).then(res => {
					if(res.data.code == 1){
						this.$message.success(res.data.msg);
						this.menuManage.tableData = []
						this.getMenuListData()
					}else {
						this.$message.success(res.data.msg);
					}
				})
			},
			// 点击空白处关闭编辑的遮罩
			closeMenuManage() {
				this.menuManage.isShow = false
			},
			// 点击确认
			btnMenuOperator(i){
				if(i == 0){
					this.menuManage.isShow = false
				}else {
					this.$axios({
						url: '/admin/action/save',
						method: 'post',
						params: {
							menuid: this.menuManage.form.menuid,
							actionname: this.menuManage.form.name,
							actioncode: this.menuManage.form.codeValue,
						}
					}).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.menuManage.tableData = []
							this.getMenuListData()
							this.menuManage.isShow = false
						}else {
							this.$message.success(res.data.msg);
							this.menuManage.isShow = false
						}
					})
				}
			},

			// --------------------- 用户管理的相关方法 ---------------------
			// 点击添加按钮
			manageAdd() {
				this.customerManage.isAddNewCustomer = true
				this.customerManage.form.title = '添加用户'
				this.customerManage.isAdd = true
				this.customerManage.form.name = '';
				this.customerManage.form.sexValue = '';
				this.customerManage.form.roleValue = '';
				this.customerManage.form.loginName = '';
				this.customerManage.form.loginPsw = '';
				this.customerManage.form.birthday = '';
				this.customerManage.form.phone = '';
				this.customerManage.form.isEnable = '';
				this.customerManage.form.accountId = ''
				this.getRoleOptions()
			},
			// 获取添加弹框的角色下拉框选项
			getRoleOptions() {
				this.$axios({
					url: '/admin/dict/all',
					method: 'post'
				}).then(res => {
					let data = res.data.data;
					this.customerManage.form.roleOption = []
					for (let i = 0; i < data.length; i++) {
						if (data[i].dicttype == 'role') {
							this.customerManage.form.roleOption.push({
								role: data[i].dictname,
								value: data[i].dictid
							})
						}
					}
				})
			},
			// 点击添加弹框的保存按钮
			btnAddSave() {
				this.$axios({
					url: '/admin/account/save',
					method: 'post',
					params: {
						realname: this.customerManage.form.name,
						sex: this.customerManage.form.sexValue,
						loginname: this.customerManage.form.loginName,
						password: this.customerManage.form.loginPsw,
						role: this.customerManage.form.roleValue,
						birthday: format(new Date(this.customerManage.form.birthday).getTime(), "Y-m-d"),
						phone: this.customerManage.form.phone,
						enable: this.customerManage.form.isEnable
					}
				}).then(res => {
					if (res.data.code == 1) {
						this.$message.success('保存成功！');
					}
					this.customerManage.listData = []
					this.getCustomerManageList()
					this.customerManage.isAddNewCustomer = false
				})
			},
			// 点击编辑
			manageEdit() {
				if (this.customerManage.selectArr.length != 1) {
					this.$message('只能选择一项，不能多选或漏选！！');
				} else {
					this.customerManage.isAddNewCustomer = true;
					this.customerManage.isAdd = false
					this.customerManage.form.title = '编辑用户'
					this.getRoleOptions();
					this.customerManage.form.name = this.customerManage.selectArr[0].name;
					this.customerManage.form.sexValue = this.customerManage.selectArr[0].sex;
					this.customerManage.form.roleValue = this.customerManage.selectArr[0].role;
					this.customerManage.form.loginName = this.customerManage.selectArr[0].account;
					this.customerManage.form.loginPsw = this.customerManage.selectArr[0].password;
					this.customerManage.form.birthday = this.customerManage.selectArr[0].birthday;
					this.customerManage.form.phone = this.customerManage.selectArr[0].phone;
					this.customerManage.form.isEnable = this.customerManage.selectArr[0].isAble + '';
					this.customerManage.form.accountId = this.customerManage.selectArr[0].accountId
				}
			},
			// 点击编辑弹框的保存
			btnEditSave() {
				this.$axios({
					url: '/admin/account/modify',
					method: 'post',
					params: {
						realname: this.customerManage.form.name,
						sex: this.customerManage.form.sexValue,
						loginname: this.customerManage.form.loginName,
						password: this.customerManage.form.loginPsw,
						role: this.customerManage.form.roleValue,
						birthday: format(new Date(this.customerManage.form.birthday).getTime(), "Y-m-d"),
						phone: this.customerManage.form.phone,
						enable: this.customerManage.form.isEnable,
						accountid: this.customerManage.form.accountId
					}
				}).then(res => {
					if (res.data.code == 1) {
						this.$message.success('修改成功！');
					} else {
						this.$message.error(res.data.msg);
					}
					this.customerManage.listData = []
					this.getCustomerManageList()
					this.customerManage.isAddNewCustomer = false
				})
			},
			// 点击空白处关闭新增用户的遮罩
			closeAddNew() {
				this.customerManage.isAddNewCustomer = false
			},
			// 选中某几行
			selectRows(selection, row) {
				this.customerManage.selectArr = selection
			},
			// 启用或者禁用
			btnEnable(i) {
				if (this.customerManage.selectArr.length == 0) {
					this.$message('请选择至少一项进行操作！');
				} else {
					let accountIdStr = ''
					for (let i = 0; i < this.customerManage.selectArr.length; i++) {
						accountIdStr += ',' + this.customerManage.selectArr[i].accountId
					}
					let accountId = accountIdStr.slice(1, accountIdStr.length)

					this.$axios({
						url: '/admin/account/enable',
						method: 'post',
						params: {
							ids: accountId,
							enable: i
						}
					}).then(res => {
						if (res.data.code == 1) {
							if (i == 1) {
								this.$message.success('启用成功！');
							} else {
								this.$message.success('禁用成功！');
							}
						}
						this.customerManage.listData = []
						this.getCustomerManageList()
					})
				}
			},
			// 获取用户管理列表
			getCustomerManageList() {
				let role = this.customerManage.role.valueType ? this.customerManage.role.valueType : this.customerManage.role.defaultRole
				this.$axios({
					url: 'admin/account/list?pageno=' + this.systemConfig.pageNo + '&pagesize=' + this.systemConfig.pageSize + '&role=' + role + '&key=' + this.customerManage.nameAccount,
					method: 'get'
				}).then(res => {
					let data = res.data.data
					this.customerManage.totalCount = res.data.totalCount
					console.log(this.customerManage.totalCount)
					for (let i = 0; i < data.length; i++) {
						this.customerManage.listData.push({
							serialNum: i + 1,
							name: data[i].realname,
							account: data[i].loginname,
							password: data[i].password,
							sex: data[i].sex == 1 ? '男' : data[i].sex == 2 ? '女' : '保密',
							birthday: data[i].birthday,
							role: data[i].role,
							phone: data[i].phone,
							isAble: data[i].enable,
							accountId: data[i].accountid
						})
					}
				})
			},
			// 筛选
			selectList() {
				this.customerManage.listData = [];
				this.getCustomerManageList()
			},

			// --------------------- 权限配置的相关方法 ---------------------
			// 获取到角色下拉选项
			getPermissionRoleOptions() {
				this.$axios({
					url: '/admin/dict/all',
					method: 'post'
				}).then(res => {
					let data = res.data.data;
					this.customerManage.form.roleOption = []
					for (let i = 0; i < data.length; i++) {
						if (data[i].dicttype == 'role') {
							this.permissionConfig.roleOption.push({
								role: data[i].dictname,
								value: data[i].dictid
							})
						}
					}
					this.permissionConfig.roleValue = this.permissionConfig.roleOption[0].role
					this.permissionConfig.defaultDictid = this.permissionConfig.roleOption[0].value
					this.getPermissionList()
				})
			},
			// 获取到权限列表
			getPermissionList(){
				let defaultDictid = this.permissionConfig.defaultDictid
				this.$axios({
					url: '/admin/rolepower/list',
					method: 'post',
					params: {
						dictid: this.permissionConfig.dictid ? this.permissionConfig.dictid : defaultDictid
					}
				}).then(res => {
					let data = res.data.data
					console.log(data)
//					console.log(this.permissionConfig.tableData)
					for (let i = 0; i < data.length; i++) {
						this.permissionConfig.tableData.push({
							sortNum: i + 1,
							name: data[i].menuname,
							checkedCode: [],
							codeArr: [],
							menuid: data[i].menuid,
							parentId: data[i].parentid
						})
						for (let j = 0; j < data[i].functions.length; j++) {
							this.permissionConfig.tableData[i].codeArr.push({
								name: data[i].functions[j].name,
								code: data[i].functions[j].action,
								actionid: data[i].functions[j].actionid,
								checked: data[i].checked
							})
						}
//						console.log('menuid为'+this.permissionConfig.tableData[i].menuid,'父级元素ID为'+this.permissionConfig.tableData[i].parentId)
					}
					let result = this.permissionConfig.tableData
					for(let i=0; i<result.length; i++){
						for(let j=0; j<result[i].codeArr.length; j++){
							if(result[i].codeArr[j].checked){
								result[i].checkedCode.push(result[i].codeArr[j].name)
							}
						}
					}
				})
			},
			// 筛选
			searchPermission(val){
				this.permissionConfig.dictid = val;
				console.log(val)
				this.permissionConfig.tableData = []
				this.getPermissionList()
			},
			// 点击保存菜单权限
			saveMenuPermission(){
				let data = this.permissionConfig.tableData
				let params = []
//				console.log(data)
				for(let i=0; i<data.length; i++){
//					console.log(data[i])
					if(data[i].checkedCode.length > 0){
						// 对选中的项进行遍历
						let sumCodeArr = []
						let sumCode = 0
						for(let j=0; j<data[i].checkedCode.length; j++){
							// 对当前行对所有的项进行遍历
							for(let k=0; k<data[i].codeArr.length; k++){
								// 匹配到选中的项，把选中的项的ID拿过来
								if(data[i].codeArr[k].name === data[i].checkedCode[j]){
									sumCodeArr.push(data[i].codeArr[k].code)
								}
							}
						}
//						console.log(sumCodeArr)
						for(let i=0; i<sumCodeArr.length; i++){
							sumCode += sumCodeArr[i]
						}
//						console.log(sumCode)
//						console.log('menuid为----'+data[i].menuid,'||父级元素为----'+data[i].parentId,'||选中的有===========================' + data[i].name, '||' + sumCode)
//						console.log('id->'+data[i].menuid,'|| 父id->'+data[i].parentId,'|| '+data[i].name,'|| 总->'+sumCode)
						params.push({
							parentId: data[i].parentId,
							menuid: data[i].menuid,
							dictid: this.permissionConfig.dictid ? this.permissionConfig.dictid : this.permissionConfig.defaultDictid,
							actionvalue: sumCode
						})
					}
				}
				// 定义一个用来存放父级元素的数组
				let parentArr = []
//				+function findParent(id,arr){
					// 对当前选中的列进行循环遍历
					for(let i=0;i<params.length; i++){
						// 对所有的数据进行遍历
						for(let j=0; j<data.length; j++){
							if(params[i].parentId === data[j].menuid){
								console.log(data[j])
								parentArr.push(data[j])
//								findParent(arr[j])
							}
						}
					}
//				}(0,data)
				console.log(params)
				// 通过当前的menuid去寻找所有的父节点
//				function findParent(id){
//					for(let i=0; i<data.length; i++){
//						if(id.parentId === data[i].menuid){
//
//						}
//					}
//				}
			},


			// --------------------- 系统配置的相关方法 ---------------------
			// 改变当前页数
			systemChangePageNo(val) {
				this.systemConfig.pageNo = val;
				this.getSystemConfigList()
			},
			// 改变每页显示的条数
			systemChangeSize(val) {
				this.systemConfig.pageSize = val;
				this.getSystemConfigList()
			},
			// 获取系统配置表格
			getSystemConfigList() {
				this.$axios({
					url: '/admin/sysconfig/list?pageno=' + this.systemConfig.pageNo + '&pagesize=' + this.systemConfig.pageSize + '&syskey=' + this.systemConfig.configKey + '&sysvalue=' + this.systemConfig.configValue + '&remark=' + this.systemConfig.remark,
					method: 'get'
				}).then(res => {
					let data = res.data.data
					this.systemConfig.totalCount = res.data.totalCount
					for (let i = 0; i < data.length; i++) {
						this.systemConfig.listData.push({
							serialNum: data[i].sysconfigid,
							key: data[i].syskey,
							value: data[i].sysvalue,
							remark: data[i].remark
						})
					}
				})
			},
			// 查询配置键
			keyChange() {
				this.systemConfig.listData = []
				this.getSystemCongigList()
			},
			// 查询配置值
			valueChange() {
				this.systemConfig.listData = []
				this.getSystemCongigList()
			},
			// 查询备注
			remarkChange() {
				this.systemConfig.listData = []
				this.getSystemCongigList()
			},
			// 点击空白隐藏遮罩
			closeSystemConfig(){
				this.systemConfig.isModal = false
			},
			// 点击添加
			addSystemConfig(){
				this.systemConfig.isModal = true
				this.systemConfig.form.title = '添加'
			},
			// 点击保存或者取消按钮
			btnSystemOperator(i){
				if(i == 0){
					this.systemConfig.key = ''
					this.systemConfig.value = ''
					this.systemConfig.remark = ''
					this.systemConfig.isModal = false
				}else {
					this.$axios({
						url: 'admin/sysconfig/save',
						method: 'post',
						params: {
							syskey: this.systemConfig.form.key,
							sysvalue: this.systemConfig.form.value,
							remark: this.systemConfig.form.remark
						}
					}).then(res => {
						if(res.data.code == 1){
							this.systemConfig.listData = []
							this.getSystemCongigList()
							this.$message.success(res.data.data.msg);
							this.systemConfig.isModal = false
						}else {
							this.$message.success(res.data.msg);
							this.systemConfig.isModal = false
						}
					})
				}
			},
			// 编辑
			editSystemConfig(data){
				this.systemConfig.isModal = true
				this.systemConfig.form.title = '编辑'
				this.systemConfig.form.key = data.key
				this.systemConfig.form.value = data.value
				this.systemConfig.form.remark = data.remark
			}
		}
	};
</script>

<style lang="stylus" scoped>
	mainBlue = #4cb2ff;
	.system-wrap {
		padding-top: 50px;
		padding-left: 200px;
		.content {
			width: 100%;
			height: calc(100vh - 50px);
			padding: 20px;
			overflow-y: scroll;
			/* 系统管理 */
			.system-box {
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
				.system-content {
					/* 菜单管理 */
					.menu-manage {
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
							.cell {
								.code {
									display: flex;
									.add, .delete {
										width: 48px;
										height: 24px;
										line-height: 24px;
										background-color: #66c1fa;
										border-radius: 5px;
										color: #fff;
										text-align: center;
										cursor: pointer;
										font-size: 16px;
									}
									.delete {
										background-color: #ff4c87;
										margin: 0 40px 0 15px;
									}
									.code-item {
										margin-right: 25px;
									}
								}
							}
						}
					}
					/* 用户管理 */
					.customer-manage {
						/* 工具栏 */
						.tools {
							margin: 30px 0;
							display: flex;
							justify-content: space-between;
							/* 左侧的按钮组 */
							.btn-group {
								display: flex;
								.add, .edit, .enable, .disable {
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
								/* 启用 */
								.enable {
									margin-right: 50px;
									i {
										color: #7fcea4;
									}
								}
								/* 禁用 */
								.disable {
									i {
										color: #f75151;
									}
								}
							}
							/* 右侧的搜索组 */
							.search-group {
								display: flex;
								.el-input {
									margin-left: 30px;
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
					/* 权限配置 */
					.permission-config {
						/* 工具栏 */
						.tools {
							display: flex;
							margin: 30px 0;
							.save-permission {
								background-color: mainBlue;
								height: 40px;
								line-height: 40px;
								text-align: center;
								cursor: pointer;
								color: #fff;
								border-radius: 5px;
								padding: 0 5px;
								margin-left: 20px;
								i {
									color: #82d888;
									margin-right: 10px;
								}
							}
						}
						/* 表格 */
						.table {
							.cell {
								.code {
									display: flex;
									.add, .delete {
										width: 48px;
										height: 24px;
										line-height: 24px;
										background-color: #66c1fa;
										border-radius: 5px;
										color: #fff;
										text-align: center;
										cursor: pointer;
										font-size: 16px;
									}
									.delete {
										background-color: #ff4c87;
										margin: 0 40px 0 15px;
									}
									.code-item {
										margin-right: 25px;
									}
								}
							}
						}
					}
					/* 系统配置 */
					.system-config {
						/* 工具栏 */
						.tools {
							display: flex;
							justify-content: space-between;
							margin: 30px 0;
							/* 左侧的按钮组 */
							.btn-group {
								display: flex;
								.add, .edit {
									cursor: pointer;
									i {
										font-size: 20px;
										color: #2483c6;
									}
									span {
										font-size: 22px;
									}
								}
								.add {
									margin-right: 50px;
								}
							}
							/* 右侧的搜索组 */
							.search-group {
								display: flex;
								.config-value {
									margin: 0 40px;
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
		/* 用户管理的添加用户的遮罩 */
		.add-new-customer-modal, .menu-edit-model, .system-config-model {
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 999;
			background-color: rgba(0, 0, 0, 0.2);
			.add-box, .edit-box, .config-box {
				width: 600px;
				height: 600px;
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
			.edit-box {
				width: 400px;
				height: 260px;
			}
			.config-box {
				width: 400px;
				height: 320px;
				.box-body {
					.form {
						.form-item {
							span {
								flex: 2;
								line-height: 40px;
							}
							.el-input, .el-select {
								flex: 5;
							}
						}
					}
				}
			}
		}
	}
</style>

