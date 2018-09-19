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
							<div class="add">
								<i class="el-icon-circle-plus-outline"></i>
								<span>添加</span>
							</div>
							<!-- 编辑 -->
							<div class="edit">
								<i class="el-icon-edit-outline"></i>
								<span>编辑</span>
							</div>
							<!-- 刷新 -->
							<div class="refresh">
								<i class="el-icon-refresh"></i>
								<span>刷新</span>
							</div>
						</div>
						<!-- 表格 -->
						<div class="table">
							2431 <br>
							242311
						</div>
					</div>
					<!-- 用户管理 -->
					<div class="customer-manage" v-show="navIndex == 1">
						<!-- 工具栏 -->
						<div class="tools">
							<!-- 左侧的按钮组 -->
							<div class="btn-group">
								<!-- 添加 -->
								<div class="add">
									<i class="el-icon-circle-plus-outline"></i>
									<span>添加</span>
								</div>
								<!-- 编辑 -->
								<div class="edit">
									<i class="el-icon-edit-outline"></i>
									<span>编辑</span>
								</div>
								<!-- 启用 -->
								<div class="enable">
									<i class="el-icon-circle-check"></i>
									<span>启用</span>
								</div>
								<!-- 禁用 -->
								<div class="disable">
									<i class="el-icon-remove"></i>
									<span>禁用</span>
								</div>
							</div>
							<!-- 右侧的搜索组 -->
							<div class="search-group">
								<!-- 角色 -->
								<el-select clearable v-model="customerManage.role.valueType" placeholder="请选择角色">
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
									style="width: 100%">
								<el-table-column prop="serialNum" label="序号" align="center"></el-table-column>
								<el-table-column prop="name" label="姓名" align="center"></el-table-column>
								<el-table-column prop="account" label="账号" align="center"></el-table-column>
								<el-table-column prop="sex" label="性别" align="center"></el-table-column>
								<el-table-column prop="birthday" label="生日" align="center"></el-table-column>
								<el-table-column prop="role" label="角色" align="center"></el-table-column>
								<el-table-column prop="phone" label="电话" align="center"></el-table-column>
								<el-table-column prop="isAble" label="是否启用" align="center"></el-table-column>
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
					<!-- 权限配置 -->
					<div class="permission-config" v-show="navIndex == 2"></div>
					<!-- 系统配置 -->
					<div class="system-config" v-show="navIndex == 3">
						<!-- 工具栏 -->
						<div class="tools">
							<!-- 左侧的按钮组 -->
							<div class="btn-group">
								<!-- 添加 -->
								<div class="add">
									<i class="el-icon-circle-plus-outline"></i>
									<span>添加</span>
								</div>
								<!-- 编辑 -->
								<div class="edit">
									<i class="el-icon-edit-outline"></i>
									<span>编辑</span>
								</div>
							</div>
							<!-- 右侧的搜索组 -->
							<div class="search-group">
								<!-- 配置键 -->
								<el-input
										clearable
										placeholder="配置键"
										v-model="systemConfig.configKey">
								</el-input>
								<!-- 配置值 -->
								<el-input
										clearable
										class="config-value"
										placeholder="配置值"
										v-model="systemConfig.configValue">
								</el-input>
								<!-- 备注 -->
								<el-input
										clearable
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
	</div>
</template>

<script>
	export default {
		data() {
			return {
				navIndex: 0,
				// 用户管理
				customerManage: {
					// 角色
					role: {
						valueRole: '',
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
						]
					},
					// 姓名或账号
					nameAccount: '',
					// 用户管理列表
					listData: [
						{
							serialNum: '1',
							name: '张三',
							account: 'admin',
							sex: '男',
							birthday: '2018-08-08',
							role: '管理员',
							phone: '17898672345',
							isAble: '是'
						},
						{
							serialNum: '2',
							name: '张三',
							account: 'admin',
							sex: '男',
							birthday: '2018-08-08',
							role: '管理员',
							phone: '17898672345',
							isAble: '是'
						},
						{
							serialNum: '3',
							name: '张三',
							account: 'admin',
							sex: '男',
							birthday: '2018-08-08',
							role: '管理员',
							phone: '17898672345',
							isAble: '是'
						}
					]
				},
				// 系统配置
				systemConfig: {
					configKey: '',
					configValue: '',
					remark: '',
					listData: [
						{
							serialNum: '1',
							key: '2wetsdtev5rsd6t',
							value: '15',
							remark: '验证码而 such 苏尔坦'
						},
						{
							serialNum: '2',
							key: '2wetsdtev5rsd6t',
							value: '15',
							remark: '验证码而 such 苏尔坦'
						},
						{
							serialNum: '3',
							key: '2wetsdtev5rsd6t',
							value: '15',
							remark: '验证码而 such 苏尔坦'
						},
						{
							serialNum: '4',
							key: '2wetsdtev5rsd6t',
							value: '15',
							remark: '验证码而 such 苏尔坦'
						}
					]
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
					},{
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
					},{
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
							padding: 20px;
							border: 1px solid #ddd;
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
							.el-pagination {
								text-align: center;
								margin-top: 20px;
							}
						}
					}
				}
			}
		}
	}
</style>


