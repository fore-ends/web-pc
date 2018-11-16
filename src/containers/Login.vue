<template>
    <div flex="main:center cross:center" class="login">
        <div class="login-content">
            <div flex="main:center" class="login-head">
                <div>
                    <img src="../images/logo.png" alt="bizeff">
                </div>
            </div>
            <div flex="dir:top" class="login-form">
                <label ref="mobile">
                    <el-input
                        name="mobile"
                        size="large"
                        placeholder="请输入手机号"
                        maxlength="11"
                        v-model="mobile"
                        @input="input"
                        clearable>
                    </el-input>
                </label>
                <label ref="password">
                    <el-input
                        name="password"
                        size="large"
                        placeholder="请输入密码"
                        v-model="password"
                        maxlength="20"
                        type="password"
                        clearable>
                      </el-input>
                </label>
                <label>
                    <el-button type="primary"
                        class="btn-submit"
                        size="large"
                        :loading="loginLoading"
                        @click.native="login">登录</el-button>
                </label>
                <!-- <label >还没有注册账号？<el-button type="text" @click.native="goRegister">去注册</el-button></label> -->
            </div>
        </div>
    </div>
</template>
<script>
    import '../less/login.less';
    import $api from '../tools/api';
    import { session } from '../tools/store';
    import { checkIdNumber, verifyTime, onlyNumber, onlyStr, trim,  checkPhone } from '../tools/operation';
    export default {
        name: 'login',
        data(){
            return {
                mobile:'',//登录手机号
                password:'',//登录密码
                selectedIndex:0,
                mobileReg:'',//注册手机号
                passwordReg:'',//注册密码
                verify:'',//验证码
                btnText:'获取验证码',
                disabled:false,
                vIsloading:false,//是否下发中,
                loginLoading:false,
                registerLoading:false,
            }
        },
        created(){
            
        },
        computed: {

        },
        components: {  },
        methods: {
            changeStatus(index){
                this.selectedIndex = index;
                session.setItem('selectedIndex',index);
            },
            //下发验证码
            clickV(){
                let mobileReg = this.mobileReg;
                //校验手机号码
                if(!this.checkMobile(mobileReg,'mobileR')){
                    return false;
                }
                if(this.vIsloading){
                    return false;
                }
                this.vIsloading = true;
                verifyTime((res)=>{
                    if(res.statu){
                        //倒计时结束
                        this.btnText = '获取验证码';
                        this.vIsloading = false;
                    }else{
                        this.btnText = `${res.time}s`;
                    }
                })
            },
            //登录
            login(){
                let { mobile, password } = this;
                //校验手机号码
                if(!this.checkMobile(mobile,'mobile')){
                    return false;
                }

                //校验密码
                if(!this.checkPassword(password,'password')){
                    return false;
                }
                //登录
                this.loginLoading = true;
                // setTimeout(() => {
                //     this.$router.push({
                //         path:'/menus/user'
                //     });
                // },1000);
                $api.post('/users',{
                    mobile,
                    password
                }).then(res=>{
                    this.loginLoading = false;
                    if(res.status == '100'){
                        // this.goRegister();
                    }else if(res.status == '1'){
                        this.$router.push({
                            path:'/menus/user'
                        });
                    }else{
                        alert(res.msg)
                    }
                })

            },
            //注册
            register(){
                let { mobileReg, verify, passwordReg } = this;
                //校验手机号码
                if(!this.checkMobile(mobileReg,'mobileR')){
                    return false;
                }
                //校验验证码
                if(trim(verify).length<4){
                    this.$message({
                        showClose:true,
                        message:'请检查验证码在提交！',
                        type:'error'
                    });
                    this.addClass(this.$refs.verify,'error-color');
                    return false;

                }
                //校验密码
                if(!this.checkPassword(passwordReg,'passwordR')){
                    return false;
                }
                this.registerLoading = true;
                $api.post('/users/register',{
                    mobile:mobileReg,
                    verify,
                    password:passwordReg
                }).then(res=>{
                    this.registerLoading = false;
                    if(res.status == '101'){
                        alert('验证码错误')
                    }else if(res.status == '1'){
                        alert('注册成功')
                    }
                })
            },
            checkMobile(mobile,ref){
                if(!checkPhone(mobile)){
                    this.$message({
                        showClose:true,
                        message:'手机号码输入格式有误！',
                        type:'error'
                    });
                    console.log(this.$refs[ref]);
                    this.addClass(this.$refs[ref],'error-color');
                    return false;
                }
                return true;
            },
            checkPassword(password,ref){
                let psw = trim(password);
                if(!psw){
                    this.$message({
                        showClose:true,
                        message:'请输入密码',
                        type:'error'
                    });
                    this.addClass(this.$refs[ref],'error-color');
                    return false;
                }
                if(psw.length <= 6){
                    this.$message({
                        showClose:true,
                        message:'密码太少',
                        type:'error'
                    });
                    this.addClass(this.$refs[ref],'error-color');
                    return false;
                }
                return true;
            },
            input(){
                // alert()
            },
            //跳转注册
            goRegister(){
                this.selectedIndex = 1;
                this.mobileReg = this.mobileSign;
            },
            //添加清除样式事件
            setDomEvent(){
                var that = this;
                let hasClass = (obj,cls)=>{  
                    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
                };
                document.querySelectorAll('.el-input__inner').forEach((node,index) => {
                    node.onfocus = function(){
                        //此处全部删除了class，若修改需注意
                        let dom = that.$refs[this.getAttribute('name')];
                        that.removeClass(dom,'error-color');
                        
                    }
                })
            },
            hasClass(obj,cls) {  
                return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
            },
            addClass(obj,cls) {  
                if (!this.hasClass(obj,cls)) obj.className += " " + cls;  
            },
            removeClass(obj,cls) {  
                if (this.hasClass(obj,cls)) {  
                    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)'); 
                    obj.className = obj.className.replace(reg, ' ');  
                }  
            }

        },
        mounted(){
            this.setDomEvent()
        },
        destroyed(){
            this.$message.close();
        }
    }
</script>
