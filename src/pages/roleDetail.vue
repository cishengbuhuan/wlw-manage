<template>
	<div class="roleDetail-wrap">
		<div class="content">
			<!-- 角色详情 -->
			<div class="role-box">
				<!-- 表格 -->
				<div class="el-tree">
					<el-tree :data="treeData"
					         :props="defaultProps"
					         default-expand-all></el-tree>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				treeData: [{
					label: '一级 1',
					children: [{
						label: '二级 1-1',
						children: [{
							label: '三级 1-1-1'
						}]
					}]
				}, {
					label: '一级 2',
					children: [{
						label: '二级 2-1',
						children: [{
							label: '三级 2-1-1'
						}]
					}, {
						label: '二级 2-2',
						children: [{
							label: '三级 2-2-1'
						}]
					}]
				}, {
					label: '一级 3',
					children: [{
						label: '二级 3-1',
						children: [{
							label: '三级 3-1-1'
						}]
					}, {
						label: '二级 3-2',
						children: [{
							label: '三级 3-2-1'
						}]
					}]
				}]
			};
		},
		mounted() {
			this.getAllDictionary()
		},
		methods: {
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
//					this.treeData = dict
//					console.log(dict)
				})
			}
		}
	};
</script>

<style lang="stylus" scoped>
	mainBlue = #4cb2ff;
	.roleDetail-wrap {
		padding-top: 50px;
		padding-left: 200px;
		.content {
			width: 100%;
			height: calc(100vh - 50px);
			padding: 20px;
			overflow-y: scroll;
			/* 字典管理 */
			.role-box {
				width: 100%;
				border-radius: 5px;
				box-shadow: 0 0 5px rgba(187, 187, 187, 0.8);
				padding: 20px 40px 40px;
				/* 表格 */
				.el-tree {
					border-top: 1px solid #ebeef5;
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