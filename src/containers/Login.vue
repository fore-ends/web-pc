<template>
    <div flex="main:center cross:center" class="login">
        <div class="login-content">
            <el-row class="login-tabs">
                <el-col class="login-tab tab-login" 
                    :class="selectedIndex == 0 ? 'selected' : ''"
                    :span="12"
                    @click.native="changeStatus(0)">登录</el-col>
                <el-col class="login-tab" :span="12"
                    :class="selectedIndex == 1 ? 'selected' : ''"
                    @click.native="changeStatus(1)">注册</el-col>
            </el-row>
            <el-row class="row-wrap"
                :class="selectedIndex == 1 ? 'has-move' : ''">
                <el-col :span="12">
                    <div flex="dir:top" class="login-form">
                        <label ref="mobileS">
                            <el-input
                                name="mobileS"
                                placeholder="请输入手机号"
                                maxlength="11"
                                v-model="mobileSign"
                                @input="input"
                                clearable>
                            </el-input>
                        </label>
                        <label ref="passwordS">
                            <el-input
                                name="passwordS"
                                placeholder="请输入密码"
                                v-model="passwordSign"
                                maxlength="20"
                                type="password"
                                clearable>
                              </el-input>
                        </label>
                        <label>
                            <el-button type="primary"
                                class="btn-submit"
                                :loading="loginLoading"
                                @click.native="login">登录</el-button>
                        </label>
                        <label >还没有注册账号？<el-button type="text" @click.native="goRegister">去注册</el-button></label>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div flex="dir:top" class="login-form">
                        <label for="" ref="mobileR">
                            <el-input
                                name="mobileR"
                                placeholder="请输入手机号"
                                maxlength="11"
                                v-model="mobileReg"
                                clearable>
                              </el-input>
                        </label>
                        <label flex="main:justify" ref="verify">
                            <span>
                                <el-input
                                    name="verify"
                                    placeholder="请输入验证码"
                                    maxlength="6"
                                    v-model="verify"
                                    clearable>
                                </el-input>
                            </span>
                            <span>
                                <el-button type="primary" class="btn-v"
                                    :disabled="vIsloading"
                                    @click.stop="clickV">{{btnText}}</el-button>
                            </span>
                        </label>
                        <label for="" ref="passwordR">
                            <el-input
                                name="passwordR"
                                placeholder="请输入密码"
                                v-model="passwordReg"
                                type="password"
                                clearable>
                              </el-input>
                        </label>
                        <label for="">
                            <el-button type="primary"
                                class="btn-submit"
                                :loading="registerLoading"
                                @click.native="register"
                                >注册</el-button>
                        </label>
                    </div>
                </el-col>
            </el-row>
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
                mobileSign:'',//登录手机号
                passwordSign:'',//登录密码
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
            this.setStatus();
        },
        computed: {

        },
        components: {  },
        methods: {
            changeStatus(index){
                this.selectedIndex = index;
                session.setItem('selectedIndex',index);
            },
            setStatus(){
                let { register } = this.$route.query;
                if(register){
                    //注册
                    this.selectedIndex = 1;
                }else{
                    let selectedIndex = session.getItem('selectedIndex');
                    if(selectedIndex){
                        this.selectedIndex = selectedIndex;
                    }
                }
                
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
                let { mobileSign, passwordSign } = this;
                //校验手机号码
                if(!this.checkMobile(mobileSign,'mobileS')){
                    return false;
                }

                //校验密码
                if(!this.checkPassword(passwordSign,'passwordS')){
                    return false;
                }
                //登录
                this.loginLoading = true;
                $api.post('/users',{
                    mobile:mobileSign,
                    password:passwordSign
                }).then(res=>{
                    this.loginLoading = false;
                    if(res.status == '100'){
                        this.goRegister();
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
