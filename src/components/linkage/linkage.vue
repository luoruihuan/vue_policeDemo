<template>
	<li class="item float_left clearfix">
		<span class="float_left">
			<span class="left float_left">
				<span class="name float_left">信息类别</span>
				<span class="red float_left">*</span>
			</span>
			<select class="province text w232 float_left" @change="changeCity($event)" v-model="province">
				<option disabled>-- 请选择 --</option>
				<option v-for="(i, index) in arr" :value="i.children">{{i.label}}</option>
			</select>
			<select class="city text w232 float_left" v-model="city">
				<option disabled>-- 请选择 --</option>
				<option v-for="(i, index) in province">{{i.label}}</option>
			</select>
		</span>
	</li>
</template>

<script type="text/ecmascript-6">
	export default {
		props: [],
		data () {
			return {
				arr: [
					{
						id: 1,
						value: 'beijing',
						label: '北京',
						children: [
							{value: 'chaoyang',label: '朝阳'},
							{value: 'haidian',label: '海淀'},
							{value: 'changping',label: '昌平'},
							{value: 'shunyi',label: '顺义'}
						]
					}, 
					{
						id: 2,
						value: 'shanghai',
						label: '上海',
						children: [
							{value: 'baoshan',label: '宝山'},
							{value: 'jiading',label: '嘉定'},
							{value: 'songjiang',label: '松江'},
							{value: 'pudong',label: '浦东'}
						]
					},
					{
						id: 3,
						value: 'guangdong',
						label: '广东省'
					}
				],
				province: '-- 请选择 --',
				city: '-- 请选择 --'
			}
		},
		methods: {
			changeCity (e) {
				this.city = '-- 请选择 --'
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import '~common/stylus/variable'
	@import '~common/stylus/mixin'
	.item
		height 50px
		line-height 49px
		width 100%
		overflow hidden
		color $color-text-d
		font-size $font-size-medium
		border-bottom 1px solid #f4f4f4
		.text
			height 38px
			border(#ABADB3)
			padding-left 6px
			margin 6px 5px 0 0
			box-shadow 0 3px 5px 0 #e0e0e0 inset
		.left
			width 100px
			margin-right 15px
		.red
			color #FF3357
			line-height 60px
			font-size 24px
		.w232
			width 232px
</style>