<template>
    <div class='login'>
        <header class="log-header"></header>
        <section class="login-box makecenter">
            <div class="login-top"></div>
            <div class="login-bottom">
                 <div class="login-content">
                      <div class="logname-box">
                          <div class="log_con clearfix "><!--登录box-->
                              <div class="log_cona float_left">
                                  <div class="makecenter pointer" @click="namefous()"></div>
                              </div>
                              <div class="log_conb float_left">
                                  <input type="text" ref="name" placeholder="请输入用户名" v-model="accounts" >
                              </div>
                          </div>
                      </div>
                      <div class="logpsw-box">
                          <div class="log_con clearfix "><!--密码box-->
                            <div class="log_conc float_left">
                              <div class="makecenter pointer" @click="pswfous()"></div>
                            </div>
                            <div class="log_conb float_left">
                              <input class="unselect" ref="psw" type="password" placeholder="请输入密码" v-model="passwards" >
                            </div>
                          </div>
                      </div>
                      <div class="set-psw">
                          <div><input class="pointer" type="checkbox" v-model="keepPsw" @click="inputClick()"><span class='set-pswinput unselect' @click="keepPsw=true">记住密码</span></div>
                          <div class="unselect colorgray" @click="keepPsw=false">忘记密码</div>
                      </div>
                      <div class="login-btn pointer unselect" @click="loginIn()" ref="login">登&nbsp;&nbsp;&nbsp;录</div>
                      <div v-if="alermShow" class="alerm-box unselect"><span></span><span>{{alermtext}}</span></div>
                 </div>
            </div>
        </section>
        <section class="log-phone leftcenter"></section>
       <footer class="footer leftcenter unselect">版权所有：深圳市科盾科技有限公司</footer>
    </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapState,} from 'vuex'
    export default {
      props: {},
      components: {},
      data () {
        return {
          accounts: '',
          passwards: '',
          numcode: '',
          token:'',
          alermtext:'账号或密码错误',
          alermShow:false,
          keepPsw:false,//记录是否保存密码
        }
      },
      watch: {
        accounts(n, o){
            if(this.alermtext=='请输入账号' && this.alermShow == true){
                this.alermtext==''
                this.alermShow = false;
            }
            if(n){
              if(this.accounts.indexOf(' ')>=0){
                  this.accounts  =  o
              }
            }
            if(n != o){
              this.alermtext==''
              this.alermShow = false;
            }

        },
        passwards(n, o){
          if(this.alermtext=='请输入密码'&&this.alermShow == true){
              this.alermtext==''
              this.alermShow = false;
          }
          if(n){
              if(this.passwards.indexOf(' ')>=0){
                this.passwards  =  o
              }
          }
          if(n != o){
              this.alermtext==''
              this.alermShow = false;
          }
        },

      },
      mounted(){
        if(window.localStorage){this.getLocation()}
      },
      computed: {
        ...mapState([
          'hasLogin',
        ]),
        ...mapGetters([
          'postData',
          'webDomain',
          'hasSelect',
          'has'
        ]),
      },
      methods: {
        namefous(){this.$refs.name.focus()},//账户获取焦点
        pswfous(){this.$refs.psw.focus()},//密码获取焦点
        inputClick(){
	          if (navigator.userAgent.indexOf('Firefox') >= 0){
	            this.keepPsw = !this.keepPsw
	          }
        },
        setLocation(){
            let list= {};
            if(this.keepPsw==true){
                 list={
                  iskeepPsw : this.keepPsw,
                  accounts : this.accounts,
                  passwords : this.passwards,
                }
            }else{
                 list={
                  iskeepPsw : this.keepPsw,
                  accounts :'',
                  passwords : '',
                }
            }
            localStorage.setItem('kd_logy',JSON.stringify(list));
        },
        getLocation(){
            let str = localStorage.getItem('kd_logy');
            if(str){
		            	let strs = JSON.parse(str);
		            if(strs.iskeepPsw == true){
		                this.keepPsw =true;
		                this.accounts=strs.accounts;
		                this.passwards=strs.passwords;
		            }else{
		                this.keepPsw =false;
		            }
            }else{
		                this.keepPsw =false;
		        }

        },
        //点击登录按钮
        loginIn(){
            this.$refs.login.style.background='#2a497e';//点击登录按钮效果
            setTimeout(function(){this.$refs.login.style.background='#4677c7'}.bind(this),50);//点击登录按钮效果还原
            setTimeout(function(){
                if(this.accounts ==''){
                  this.alermtext='请输入账号';
                  this.alermShow = true;
                }else{
                  if(this.passwards ==''){
                    this.alermtext='请输入密码';
                    this.alermShow = true;
                  }else{
                    if(this.passwards.length<6 || this.passwards.length>16){
                      this.alermtext='密码格式有误';
                      this.alermShow = true;
                    }else{
                      //发出请求
                      if(window.localStorage){this.setLocation()}
                      this.loginFirst();
                    }
                  }
                }
            }.bind(this),70);
        },
        loginFirst(){
          let url = 'http://192.168.1.83:18005/user/login'
          let postData = {
              "loginName":this.accounts,
              "loginPwd": this.passwards,
              "system": "string",
              "validCode": "string"
          }
          if(this.accounts=='string'&&this.passwards=='string'){
              this.loginSecond();
          }else{
              this.alermtext='账号或密码有误';
              this.alermShow = true;
          }
//          this.axios.post(url, postData)
//            .then(response => {
//              let data = response.data
//              if(data.code == 'R03003000'){
//                this.token = data.data
//                this.loginSecond();
//              }else{
//                this.alermtext=data.msg;
//                this.alermShow = true;
//              }
//            })
//            .catch(error => {
//              this.alermtext='请检查网络是否正常';
//              this.alermShow = true;
//              console.log(error)

//            })
        },
        loginSecond(){
        	let loginTime = Date.parse(new Date())/1000;
          localStorage.setItem('kd_starTime',JSON.stringify(loginTime));//记录真实登录时间戳
          this.$store.commit('changeHaslogin',true);
//        this.axios({
//            method:'post',
//            url:'/kedun/earlywaring/updateEarlywaringPushUserSubscribe',
//            headers:{
//                'Content-Type':'application/json',
//                'token':this.token,
//            }
//        })
//        .then(response => {
//            console.log(123)
//            let data = response.data
//            console.dir(data)
//        })
//        .catch(error => {console.log(error)});
        }
      },
    }
</script>
<style  scoped>
    .unselect{-moz-user-select:none;-webkit-user-select :none;-ms-user-select:none;}
　　input::-webkit-input-placeholder {color: #e6e6e6;vertical-align: middle;}
    input:-moz-placeholder {color:#e6e6e6;vertical-align: middle;}
    input::-moz-placeholder{color:#e6e6e6;vertical-align: middle;}
    input:-ms-input-placeholder {color:#e6e6e6;vertical-align: middle;}
    input::-ms-input-placeholder {color:#e6e6e6;vertical-align: middle;}
    .makecenter{position: absolute;margin:auto;top:0;left: 0;bottom:0;right :0;}
    .leftcenter{position:absolute;left:0;right:0;margin:0 auto;}
    .login{height:100vh;width:100vw;min-width:1280px;min-height:700px;position:relative;background:#3fa7fe;background-image:url(./loginbg.jpg);background-position:100% 100%;background-size:cover;}
    .log-header{height:53px;width:250px;background:url(./kedun.png);position:absolute;top:29px;left:60px;}
    .login-box{height:450px;width:340px;background:#fff;border-radius:10px;}
    .login-top{height:125px;background:#4778c7;border-radius:8px 8px 0 0;padding:10px 0 0 0;position:relative;background-image:url(./login-title.png);}
    .login-bottom{height:325px;width:100%;}
    .login-content{width:250px;height:280px;margin:auto;}
    .logname-box{margin-top:65px;height:40px;border-bottom:1px solid #d4d4d4;}
    .log_con{height:30px;width:220px;margin:0 auto;}
    .log_cona{height:100%;width:40px;border-right:1px solid #d0d0d0;position:relative;}
    .log_cona div{height:19px;width:20px;background:url(./psw.png);}
    .log_conb{height:100%;width:180px;padding:0 0 0 10px;}
    .logpsw-box{margin-top:22px;height:40px;border-bottom:1px solid #d4d4d4;}
    .log_conc{height:100%;width:40px;border-right:1px solid #d0d0d0;position:relative;}
    .log_conc div{height:19px;width:16px;background:url(./name.png);}
    .log_conb input{line-height:30px;height:30px;width:150px;color:#000;font-family:'MicrosoftYaHei';font-size:14px;}
    .set-psw{font-size:12px;font-family:'MicrosoftYaHei';color:#808080;height:50px;position:relative;}
    .set-psw div:nth-child(1){position:absolute;top:20px;left:5px;}
    .set-psw div:nth-child(1) input{vertical-align:top;}
    .set-psw div:nth-child(2){position:absolute;top:20px;right:5px;}
    .set-pswinput{display:inline-block;margin-left:8px;color:#808080;cursor:default;}
    .login-btn{width:245px;height:38px;margin:auto;background:#4677c7;border-radius:4px;text-align:center;line-height:38px;font-size:18px;color:#fff;font-family:'MicrosoftYaHei';}
    .alerm-box{width:245px;height:38px;margin:auto;line-height:38px;font-size:13px;color:#f65939;position:relative;font-family:'MicrosoftYaHei';}
    .alerm-box span:nth-child(1){display:inline-block;height:16px;width:16px;background:url(./alerm.png);position:absolute;top:11px;left:5px;}
    .alerm-box span:nth-child(2){display:inline-block;text-indent:30px;}
    .log-phone{height:24px;width:204px;bottom:63px;background:url(./phone.png);}
    .footer{font-size:18px;color:rgba(255,255,255,0.5);font-family:'MicrosoftYaHei'; bottom:20px;width:300px;height:30px;line-height:25px;}
    .colorgray{color:#ccc;cursor:default;}

</style>
