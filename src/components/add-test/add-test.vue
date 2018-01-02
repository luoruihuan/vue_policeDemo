<template>
	<ul class="items clearfix">
		<linkage></linkage>
		<upload-img></upload-img>
		<upload-file></upload-file>
	</ul>
</template>

<script type="text/ecmascript-6">
	import Linkage from 'components/linkage/linkage'
	import UploadImg from 'components/upload-img/upload-img'
	import UploadFile from 'components/upload-file/upload-file'

	export default {
		data () {
			return {}
		},
		components: {
			Linkage,
			UploadImg,
			UploadFile
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import '~common/stylus/variable'
	@import '~common/stylus/mixin'
	.items
		padding 0 30px
		border(#ccc)
</style>