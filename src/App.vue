<template>
		<div>
		<div v-if="hasLogin">
				<m-header></m-header>
				<router-view ></router-view>
		</div>
		<Login v-if="!hasLogin"></Login>
	</div>
</template>

<script type="text/ecmascript-6">
import MHeader from "components/my-header/my-header";
import Login from "components/pages/login/login";
import { mapState } from "vuex";
export default {
	components: { MHeader, Login },
	name: "app",
	data() {
		return {
			showTop: false
		};
	},
	created() {
		this.$router.replace("/workbench/todo"); //首次进入页面改变路由
		let loginsTime = Date.parse(new Date()) / 1000; //进入页面的时间戳
		let proptime = localStorage.getItem("kd_starTime"); //最近一次登录时间的时间戳
		if (proptime) {
			//如果存在最近一次的时间戳
			let propTime = JSON.parse(proptime);
			if (loginsTime - propTime > 300) {
				this.$store.commit("changeHaslogin", false);
			} else {
				this.$store.commit("changeHaslogin", true);
			}
		} else {
			console.log("未登录");
		}
	},
	mounted() {},
	computed: {
		...mapState(["hasLogin"]) //监视是否登录
	},
	updated() {
		if (this.hasLogin) {
			//页面操作将更新登录时间戳
			let loginTime = Date.parse(new Date()) / 1000;
			localStorage.setItem("kd_starTime", JSON.stringify(loginTime));
		}
	},
	methods: {}
	//    watch:{
	//          $route(){
	//            console.dir(this.$route)
	//      }
	//    },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
