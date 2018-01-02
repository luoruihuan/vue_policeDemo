<template>
	<li class="item clearfix float_left">
		<span class="float_left clearfix">
			<span class="name float_left left">附件</span>
			<span class="right float_left clearfix">
				<div class="file_box float_left clearfix" v-if="fileSelected">
					<div class="file_list" v-for="(i, index) in file_list">
						<span class="file_name">{{i}}</span>
						<span class="iconfont icon-cuowu pointer icon" @click="deleteFile($event, i, index)"></span>
					</div>
				</div>
				<div class="float_left add pointer text1">上传附件
					<input type="file" class="file pointer" @change="handleFileChange($event)">
				</div>
			</span>
		</span>
	</li>
</template>

<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				file_list: [],
				dataUrl: ''
			}
		},
		computed: {
			fileSelected () {
				return !!this.dataUrl
			}
		},
		methods: {
			handleFileChange (e) {
				if (typeof e.target === 'undefined') {
					this.file = e[0]
				} else {
					this.file = e.target.files[0]
				}

				this.file_list.push(this.file.name)
				this.getFileData(this.file)
			},
			getFileData (file) {
				let self = this
				if (!file || !window.FileReader) {
					console.log('sad 不支持file api')
				}

				if (/^application/.test(file.type)) {
					let reader = new FileReader()
					reader.readAsDataURL(file)

					reader.onloadend = function () {
						self.dataUrl = this.result
					}
				}
			},
			deleteFile (e, i, index) {
				this.file_list.splice(index, 1)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import '~common/stylus/variable'
	@import '~common/stylus/mixin'
	
	.item
		min-height 50px
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
		.file_box
			margin 6px 0 6px 0
			.file_list
				line-height 24px
				color $color-sub-theme
				border-radius 4px
				margin-right 30px
			.icon
				color #aaa
				font-weight bold
				font-size $font-size-small
				padding-left 10px
				&:hover
					color $color-sub-theme
		.add
			height 38px
			line-height 36px
			border(#70A1D8)
			color $color-text
			font-size $font-size-medium
			background #89BAF0
			position relative
			margin-top 6px
			padding 0 12px
			overflow hidden
			&:hover
				background #7EABE1
			.file
				position absolute
				top 0
				left 0
				zoom 1
				opacity 0
				margin-left -240px
				font-size 30px
</style>