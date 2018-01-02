<template>
	<li class="item float_left clearfix">
		<span class="float_left clearfix">
			<span class="name float_left left">截屏</span>
			<span class="right float_left clearfix">
				<div class="img_box float_left" v-if="imgSelected" :style="{backgroundImage:'url(' + dataUrl + ')'}" @click="show = true">
					<!-- <img :src="dataUrl" class="upload_img" @click="show=true"> -->
				</div>
				<div class="float_left add pointer text1">重新上传
					<input type="file" class="file pointer" @change="handleFileChange($event)" accept="image/jpg,image/JPG,image/gif,image/png">
				</div>
				<div class="mask" v-show="show" @click="show=false">
					<div class="img">
						<img :src="dataUrl">
					</div>
				</div>
			</span>
		</span>
	</li>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			value: {
				default: undefined
			}
		},
		data () {
			return {
				dataUrl: '',
				show: false,
				file: [],
				fileName: '',
				maxSize: 5
			}
		},
		computed: {
			imgSelected () {
				return !!this.dataUrl || !!this.fileName
			}
		},
		mounted () {
			if (this.imgSrc) {
				this.dataUrl = this.imgSrc
			}
		},
		methods: {
			handleFileChange (e) {
				if (typeof e.target === 'undefined') {
					this.file = e[0];
				} else {
					this.file = e.target.files[0]
				}

				let size = Math.floor (this.file.size / 1024)
				if (size > this.maxSize) {
					console.log('文件太大啦！')
				}

				this.imgPreview (this.file)
				this.fileName = this.file.name

			},
			imgPreview (file) {
				let self = this
				if (!file || !window.FileReader) {
					console.log('sad 不支持file api')
				}

				if (/^image/.test(file.type)) {
					let reader = new FileReader()
					reader.readAsDataURL(file)

					reader.onloadend = function () {
						self.dataUrl = this.result
					}
				}
			}
		},
		watch: {
			imgSrc (newVal, oldVal) {
				if (newVal) {
					this.dataUrl = newVal
				}
			},
			value (newVal, oldVal) {
				if (oldVal && !newVal) {
					this.file = []
					this.dataUrl = ''
					this.fileName = ''
				}
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
		.img_box
			width 152px
			height 175px
			margin 6px 6px 6px 0
			border(#aaa)
			background-size 100%
			background-repeat no-repeat
			background-position center center
			
			&:hover
				cursor pointer
			.upload_img
				width 100%
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
		.mask
			position fixed
			top 0
			bottom 0
			left 0
			right 0
			background rgba(0,0,0,.5)
			.img
				width 800px
				height 500px
				display table-cell
				text-align center
				vertical-align middle
				background pink
				img
					width 100%
					vertical-align middle
</style>