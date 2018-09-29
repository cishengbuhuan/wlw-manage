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
							<!--action="http://192.168.1.14:8090/api/manager/baseFileImport"-->
							<el-upload
									action="123"
									ref="upload"
									:headers="uploadHeaders"
									:http-request="uploadSectionFile"
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
									@change="searchData"
									v-model="cardNum">
							</el-input>
							<!-- 搜索开户公司 -->
							<!--<el-input-->
									<!--clearable-->
									<!--placeholder="请输入开户公司"-->
									<!--v-model="company">-->
							<!--</el-input>-->
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
							<el-table-column prop="result" label="响应结果" align="center"></el-table-column>
							<el-table-column label="操作" align="center">
								<template slot-scope="scope">
									<div class="more" @click="goDetail(scope.row)">查看详情</div>
									<div class="edit" @click="editDiscount(scope.row)">修改折扣</div>
								</template>
							</el-table-column>
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
		<div class="modify-discount-modal" @click.self="closeModifyModal" v-show="modify.modifyDiscount">
			<div class="discount-box">
				<div class="box-header">修改折扣</div>
				<div class="box-body">
					<!-- 原折扣 -->
					<div class="old-discount">
						原折扣：<span>{{ modify.oldDiscount }}折</span>
					</div>
					<!-- 设置新折扣 -->
					<div class="set-new">
						<h3>设置新折扣</h3>
						<!-- 输入批次 -->
						<div class="batch">
							<span>输入批次：</span>
							<div class="input">
								<el-date-picker
										v-model="modify.valueBatch"
										type="date"
										placeholder="请选择批次">
								</el-date-picker>
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
								<el-input
										clearable
										type="number"
										placeholder="请输入新折扣"
										v-model="modify.valueDiscount">
								</el-input>
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
								<el-select clearable v-model="singleCardForm.cardKindValue" placeholder="请选择卡种类">
									<el-option
											v-for="item in singleCardForm.cardKindOptions"
											:key="item.value"
											:label="item.cardKind"
											:value="item.value">
									</el-option>
								</el-select>
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
								<el-select clearable v-model="singleCardForm.operatorValue" placeholder="请选择运营商">
									<el-option
											v-for="item in singleCardForm.operatorOptions"
											:key="item.value"
											:label="item.operator"
											:value="item.value">
									</el-option>
								</el-select>
							</div>
							<!-- 套餐 -->
							<div class="card-kind form-item">
								<div class="label">
									<span>套餐<i>*</i> :</span>
								</div>
								<el-select clearable v-model="singleCardForm.packagesValue" placeholder="请选择套餐">
									<el-option
											v-for="item in singleCardForm.packagesOptions"
											:key="item.value"
											:label="item.packages"
											:value="item.value">
									</el-option>
								</el-select>
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
										type="number"
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
										type="number"
										placeholder="请输入客户订购流量"
										v-model="singleCardForm.orderFlow">
								</el-input>
							</div>
							<!-- 付费方式 -->
							<div class="form-item">
								<div class="label">
									<span>付费方式<i>*</i> :</span>
								</div>
								<el-select clearable v-model="singleCardForm.payWayValue" placeholder="请选择付费方式">
									<el-option
											v-for="item in singleCardForm.payWayOptions"
											:key="item.value"
											:label="item.payWay"
											:value="item.value">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="form-row">
							<!-- 归属省份 -->
							<div class="form-item">
								<div class="label">
									<span>归属省份<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入归属省份"
										v-model="singleCardForm.province">
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
										v-model="singleCardForm.area">
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
								<el-date-picker
										v-model="singleCardForm.entryTime"
										type="date"
										placeholder="请选择录入时间">
								</el-date-picker>
							</div>
							<!-- 结束时间 -->
							<div class="form-item">
								<div class="label">
									<span>结束时间<i>*</i> :</span>
								</div>
								<el-date-picker
										v-model="singleCardForm.endTime"
										type="date"
										placeholder="请选择结束时间">
								</el-date-picker>
							</div>
							<!-- 合同签约时限 -->
							<div class="form-item">
								<div class="label">
									<span>合同签约时限<i>*</i> :</span>
								</div>
								<el-input
										clearable
										type="number"
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
								<el-select clearable v-model="singleCardForm.directValue" placeholder="请选择是否定向卡">
									<el-option
											v-for="item in singleCardForm.directOptions"
											:key="item.value"
											:label="item.direct"
											:value="item.value">
									</el-option>
								</el-select>
							</div>
							<!-- 卡片等级 -->
							<div class="form-item">
								<div class="label">
									<span>卡片等级<i>*</i> :</span>
								</div>
								<el-select clearable v-model="singleCardForm.cardLevelValue" placeholder="请选择卡片等级">
									<el-option
											v-for="item in singleCardForm.cardLevelOptions"
											:key="item.value"
											:label="item.cardLevel"
											:value="item.value">
									</el-option>
								</el-select>
							</div>
							<!-- 沉默期时长 -->
							<div class="form-item">
								<div class="label">
									<span>沉默期时长<i>*</i> :</span>
								</div>
								<el-input
										clearable
										placeholder="请输入沉默期时长"
										v-model="singleCardForm.silenceDuration">
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
										placeholder="请输入短信条数"
										v-model="singleCardForm.message">
								</el-input>
							</div>
							<!-- 行业卡 -->
							<div class="form-item">
								<div class="label">
									<span>行业卡<i>*</i> :</span>
								</div>
								<el-select clearable v-model="singleCardForm.industryCardValue" placeholder="请选择行业卡类别">
									<el-option
											v-for="item in singleCardForm.industryCardOptions"
											:key="item.value"
											:label="item.industryCard"
											:value="item.value">
									</el-option>
								</el-select>
							</div>
							<!-- 计费时间 -->
							<div class="form-item">
								<div class="label">
									<span>计费时间<i>*</i> :</span>
								</div>
								<el-date-picker
										v-model="singleCardForm.billingTime"
										type="date"
										placeholder="请选择计费时间">
								</el-date-picker>
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
										type="number"
										placeholder="请输入折扣"
										v-model="singleCardForm.discount">
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
	import {format,timestampToTime,returnPackages,
		returnOperator,returnCardKind,
		returnPayWay} from '../api/dataUtil'
	import qs from 'qs'
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
						isSelected: true,
						value: 1
					},
					{
						operator: '中国电信',
						isSelected: false,
						value: 2
					},
					{
						operator: '中国联通',
						isSelected: false,
						value: 3
					}
				],
				netWork: '',
				defaultNetWork: '1',
				// 流量池
				flowPoolData: [],

				// 网卡列表
				netWorkData: [],
				// 分页需要的数据
				totalCount: 0,
				pageSize: 20,
				pageNo: 1,
				// 修改折扣的弹框
				modify: {
					modifyDiscount: false,
					oldDiscount: '',
					valueBatch: '',
					valueDiscount: '',
				},
				// 新增单卡的弹框
				singleCard: false,
				// 新增单卡弹框的表单
				singleCardForm: {
					cardNum: '',
					iccid: '',

					// 卡种类
					cardKindValue: '',
					cardKindOptions: [
						{
							cardKind: '大卡',
							value: '1'
						},
						{
							cardKind: '双切',
							value: '2'
						},
						{
							cardKind: '三切',
							value: '3'
						},
						{
							cardKind: '2*2贴片',
							value: '4'
						},
						{
							cardKind: '5*6贴片',
							value: '5'
						},
						{
							cardKind: 'eSim',
							value: '6'
						},
						{
							cardKind: 'NB',
							value: '7'
						},
						{
							cardKind: '其他',
							value: '8'
						},
					],

					// 运营商
					operatorValue: '',
					operatorOptions: [
						{
							operator: '中国移动',
							value: '1'
						},
						{
							operator: '中国联通',
							value: '2'
						},
						{
							operator: '中国电信',
							value: '3'
						}
					],
					// 套餐
					packagesValue: '',
					packagesOptions: [
						{
							packages: '月',
							value: '1'
						},
						{
							packages: '半年',
							value: '2'
						},
						{
							packages: '季度',
							value: '3'
						},
						{
							packages: '年',
							value: '4'
						}
					],
					// 付费方式
					payWayValue: '',
					payWayOptions: [
						{
							payWay: '年付',
							value: '1'
						},
						{
							payWay: '半年付',
							value: '2'
						},
						{
							payWay: '季付',
							value: '3'
						},
						{
							payWay: '月付',
							value: '4'
						},
						{
							payWay: '后付',
							value: '5'
						}
					],
					// 是否定向卡
					directValue: '',
					directOptions: [
						{
							direct: '是',
							value: '1'
						},
						{
							direct: '否',
							value: '0'
						}
					],
					// 卡片等级
					cardLevelValue: '',
					cardLevelOptions: [
						{
							cardLevel: '消费级',
							value: '1'
						},
						{
							cardLevel: '工业级',
							value: '2'
						},
						{
							cardLevel: '车规级',
							value: '3'
						}
					],
					// 行业卡
					industryCardValue: '',
					industryCardOptions: [
						{
							industryCard: '普通卡',
							value: '1'
						},
						{
							industryCard: '车联卡',
							value: '2'
						},
						{
							industryCard: 'NB',
							value: '3'
						},
						{
							industryCard: '预付充值卡',
							value: '4'
						}
					],

					openCompany: '',
					intoPool: '',
					orderFlow: '',
					province: '',
					area: '',
					directedIP: '',
					entryTime: '',
					endTime: '',
					timeLimit: '',
					silenceDuration: '',
					message: '',
					billingTime: '',
					discount: ''
				},
				fileList: [],
				uploadHeaders: {
					'Content-Type': 'multipart/form-data'
				},
				companyId: '',
				poolId: '',
				defaultPoolId: ''
			};
		},
		mounted() {
			this.getCompanyId()
			this.getPoolPackages()
		},
		methods: {
			// 接收传递过来的companyId
			getCompanyId(){
				this.companyId = this.$route.query.companyId
			},
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
				this.netWork = this.operatorData[index].value
				this.getNetWorkData()
			},
			// 切换流量池套餐的分类
			toggleFlow(index) {
				for (let i = 0; i < this.flowPoolData.length; i++) {
					this.flowPoolData[i].isSelected = false;
				}
				this.flowPoolData[index].isSelected = true
				this.poolId = this.flowPoolData[index].poolId
				this.getNetWorkData()
			},
			// 点击新增单卡按钮
			btnAdd() {
				this.singleCard = true
			},
			// 点击新增单卡弹框的保存按钮
			saveForm() {
				this.$axios({
					url: '/api/manager/modifyCard',
					method: 'post',
					params: {
						cardNumber: this.singleCardForm.cardNum,
						iccid: this.singleCardForm.iccid,
						cardType: this.singleCardForm.cardKindValue,


						companyName: this.singleCardForm.openCompany,
						netWork: this.singleCardForm.operatorValue,
						packages: this.singleCardForm.packagesValue,


						userPoolSize: this.singleCardForm.intoPool,
						poolSize: this.singleCardForm.orderFlow,
						payment: this.singleCardForm.payWayValue,


						province: this.singleCardForm.province,
						area: this.singleCardForm.area,
						cardDirectIp: this.singleCardForm.directedIP,


						serveTime: format(new Date(this.singleCardForm.entryTime).getTime(), "Y-m-d"),
						endTime: format(new Date(this.singleCardForm.endTime).getTime(), "Y-m-d"),
						contractTerm: this.singleCardForm.timeLimit,

						cardDirect: this.singleCardForm.directValue,
						cardLevel: this.singleCardForm.cardLevelValue,
						silentPeriod: this.singleCardForm.silenceDuration,

						msgNo: this.singleCardForm.message,
						businessCard: this.singleCardForm.industryCardValue,
						chargeTime: format(new Date(this.singleCardForm.billingTime).getTime(), "Y-m-d"),



						discount: this.singleCardForm.discount
					}
				}).then(res => {
					if(res.data.code == 1){
						this.$message.success('保存成功！');
						this.netWorkData = []
						this.getNetWorkData()
					}else {
						this.$message.error(res.data.msg);
					}
					this.singleCard = false
				})
			},
			// 点击空白处让新增单卡的弹框消失
			closeNewADD() {
				this.singleCard = !this.singleCard
			},


			// 点击修改折扣按钮
			editDiscount(data) {
				console.log(data)
				this.modify.modifyDiscount = true
				this.modify.oldDiscount = data.discount * 10;

				this.modify.deviceId = data.deviceId
//				this.modify.insertTime = format(new Date(this.modify.valueBatch).getTime(), "Y-m-d")
				this.modify.netWork = data.netWork
				this.modify.companyId = data.companyId

				this.modify.valueBatch = data.entryTime
			},
			// 修改折扣弹框的保存按钮
			save() {
				this.modify.modifyDiscount = false
				this.$axios({
					url: '/api/manager/modify/discount',
					method: 'post',
					params: {
						deviceId: this.modify.deviceId,
						discount: this.modify.valueDiscount,
						insertTime: format(new Date(this.modify.valueBatch).getTime(), "Y-m-d"),
						companyId: this.modify.companyId,
						netWork: this.modify.netWork,
					}
				}).then(res => {
					if(res.data.code == 1){
						this.$message.success(res.data.data);
						this.netWorkData = []
						this.getNetWorkData()
					}else {
						this.$message.error(res.data.msg);
					}
				})
			},
			// 点击空白处让修改折扣的弹框消失
			closeModifyModal() {
				this.modify.modifyDiscount = false
			},

			// 获取流量池套餐
			getPoolPackages(){
				this.$axios({
					url: '/api/manager/customer/companyPool',
					method: 'post',
					params: {
						companyId: this.companyId,
						netWork: this.netWork ? this.netWork : this.defaultNetWork,
					}
				}).then(res => {
					let data = res.data.data
					for (let i = 0; i < data.length; i++) {
						this.flowPoolData.push({
							packages: data[i].name,
							poolId: data[i].poolId,
							isSelected: false
						})
					}
					this.flowPoolData[0].isSelected = true
					this.defaultPoolId = this.flowPoolData[0].poolId

					this.getNetWorkData()
				})
			},
			// 获取网卡表格数据
			getNetWorkData(){
				this.$axios({
					url: '/api/manager/card/list',
					method: 'post',
					params: {
						pageSize: this.pageSize,
						pageNo: this.pageNo,
						companyId: this.companyId,
						netWork: this.netWork ? this.netWork : this.defaultNetWork,
						poolId: this.poolId ? this.poolId : this.defaultPoolId,
						cardNo: this.cardNum
					}
				}).then(res => {
					let data = res.data.data
					this.totalCount = res.data.totalCount
					for (let i = 0; i < data.length; i++) {
						this.netWorkData.push({
							serialNum: data[i].no,
							cardNum: data[i].cardNumber,
							companyName: data[i].companyName,
							operator: returnOperator(data[i].netWork),
							area: data[i].area,
							flowPackages: data[i].userPoolSize,
							actualFlow: data[i].poolSize,
							entryTime: timestampToTime(data[i].serveTime),
							cardKind: returnCardKind(data[i].cardType),
							silenceDuration: data[i].silentPeriod,
							packages: returnPackages(data[i].packageType),
							discount: data[i].discount,
							way: returnPayWay(data[i].payment),
							result: data[i].netResult,
							deviceId: data[i].deviceId,
							companyId: data[i].companyId,
							netWork: data[i].netWork,
						})
					}
				})
			},
			// 查看详情
			goDetail(data){
				let deviceId = data.deviceId
				this.$router.push({
					path: '/cardDetail',
					query: {
						deviceId: deviceId
					}
				})
			},
			// 筛选卡号
			searchData(){
				this.netWorkData = []
				this.getNetWorkData()
			},

			// 批量导入
//			handleChange(file, fileList) {
//				this.fileList = fileList;
//				let ids = this.handleUpOrDel(fileList);
//			},
//			handleRemove(file, fileList) {
//				this.fileList = fileList;
//				let ids = this.handleUpOrDel(fileList);
//			},
//			handleUpOrDel(fileList) {
//				let ids = "";
//				if (fileList) {
//					for (let i = 0; i < fileList.length; i++) {
//						console.log(fileList[i].response);
//						let obj = fileList[i].response;
//						if (obj) {
//							if (obj.code) {
//								ids += obj.record.successResponse[0].id;
//								if (i < fileList.length - 1) {
//									ids += ",";
//								}
//							}
//						}
//					}
//				}
//				return ids;
//			},
			// 自定义文件上传
			uploadSectionFile(params) {
				//创建 formData 对象
				let formData = new FormData();
				// 向 formData 对象中添加文件
				formData.append('file',params.file);
				console.log(formData)

				let xhr = new XMLHttpRequest();
				xhr.open('post', 'http://192.168.1.14:8090/api/manager/baseFileImport');
//				xhr.open('post', 'http://192.168.1.14:8090/admin/device/importOder');
				xhr.setRequestHeader('content-type','multipart/form-data;')
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4 && xhr.status == 200) {
						let data = JSON.parse(xhr.responseText);
					}
				};
				xhr.send(formData);
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
						.cell {
							.more, .edit {
								cursor: pointer;
								color: mainBlue;
							}
						}
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
								margin-top: 10px;
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
								.el-input, .el-select {
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


