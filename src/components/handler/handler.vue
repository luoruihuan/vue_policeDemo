<template>
<div>
	<!-- <div class="handler clearfix">
		<el-tree 
			:data="data" 
			:props="defaultProps" 
			show-checkbox 
			default-expand-all 
			node-key="id" 
			:expand-on-click-node="false"
			class="el_tree float_left common_div">
		</el-tree>
		<el-tree
			:data="data1" 
			show-checkbox 
			default-expand-all 
			:expand-on-click-node="false" 
			class="float_left common_div else role">
		</el-tree>
		<el-tree
			:data="data2" 
			show-checkbox 
			default-expand-all 
			:expand-on-click-node="false" 
			class="float_left common_div else user">
		</el-tree>
		<div class="selected float_right common_div"></div>
	</div> -->

	<div class="handler clearfix">
		<el-tree 
			:data="data3" 
			:props="defaultProps" 
			show-checkbox 
			accordion 
			node-key="id" 
			:default-expanded-keys="[1]"
			:expand-on-click-node="false"
			class="el_tree1 float_left common_div1" 
			ref="tree">
		</el-tree>
		<div class="selected float_right common_div1"></div>
	</div>
</div>
</template>

<script type="text/ecmascript-6">
	let id = 1000

	export default {
		data () {
			return {
				data: [{
					id: 1,
					label: '广东省',
					children: [{
						id: 11,
						label: '深圳市',
						children: [{
							id: 111,
							label: '福田分局'
						},{
							id: 112,
							label: '南山分局'
						},{
							id: 113,
							label: '宝安分局'
						},{
							id: 114,
							label: '罗湖分局'
						}]
					},{
						id: 12,
						label: '汕头市'
					},{
						id: 13,
						label: '湛江市'
					}]
				}],
				data1: [{
					id: 111,
					label: '福田分局',
					children: [{
						id: 1111,
						label: '调度员'
					},{
						id: 1112,
						label: '观察员'
					},{
						id: 1113,
						label: '巡查员'
					}]
				}],
				data2: [{
					id: 1111,
					label: '调度员',
					children: [{
						id: 11111,
						label: '张三'
					},{
						id: 11112,
						label: '李四'
					},{
						id: 11113,
						label: '王五'
					}]
				}],
				data3: [{
					id: 1,
					label: '广东省',
					children: [{
						id: 11,
						label: '深圳市',
						children: [{
							id: 111,
							label: '福田分局',
							disabled: true,
							children: [{
								id: 1111,
								label: '调度员',
								children: [{
									id: 11111,
									label: '张三'
								},{
									id: 11111,
									label: '李四'
								},{
									id: 11111,
									label: '王五'
								}]
							},{
								id: 1112,
								label: '观察员',
								disabled: true
							},{
								id: 1113,
								label: '巡查员'
							}]
						},{
							id: 112,
							label: '南山分局'
						},{
							id: 113,
							label: '宝安分局'
						},{
							id: 114,
							label: '罗湖分局'
						}]
					},{
						id: 12,
						label: '汕头市'
					},{
						id: 13,
						label: '湛江市'
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				list: [],
				show1: false,
				show2: false,
				selected_arr: []
			}
		},
		created () {
			
		},
		methods: {
			getCheckedKeys () {
				console.log(this.$refs.tree.getCheckedKeys())
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet" scoped>
	@import '~common/stylus/variable'
	@import '~common/stylus/mixin'
	
	.handler
		padding 30px
		border(#aaa)
		.common_div
			border(#ccc)
			width 200px
			height 300px
			overflow scroll
		.else
			border-left none
		.common_div1
			width 40%
			height 300px
			border(#ccc)
			overflow scroll
</style>