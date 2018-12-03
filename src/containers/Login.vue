<template>
    <div flex="main:center cross:center" class="login">
        <div class="login-content">
            <div flex="main:center" class="login-head">
                <div>
                    <img src="../images/logo.png" alt="bizeff">
                </div>
            </div>
            <div flex="dir:top" class="login-form">
                <label ref="user_name">
                    <el-input
                        name="user_name"
                        size="large"
                        placeholder="请输入用户名"
                        maxlength="20"
                        v-model="userName"
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
            </div>
        </div>
    </div>
</template>
<script>
    import '../less/login.less';
    import $api from '../tools/api';
    import { session, cookie } from '../tools/store';
    import { checkIdNumber, verifyTime, checkPsw, trim,  checkPhone } from '../tools/operation';
    import store from '../store';
    import _ from 'lodash/core';
    import config from '../tools/config';
    // import sha1 from 'crypto-js/sha1';
    const sha1 = require('js-sha1');
    export default {
        name: 'login',
        data(){
            return {
                mobile:'',//登录手机号
                userName:'',//用户
                password:'',//登录密码
                selectedIndex:0,
                verify:'',//验证码
                btnText:'获取验证码',
                disabled:false,
                vIsloading:false,//是否下发中,
                loginLoading:false,
            }
        },
        created(){
            //test
            // cookie.setItem('bizeffNo','99999',1);
        },
        computed: {

        },
        components: {  },
        methods: {
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
                let { userName, password } = this;
                //校验手机号码
                if(!this.checkUserName(userName,'user_name')){
                    return false;
                }

                //校验密码
                if(!this.checkPassword(password,'password')){
                    return false;
                }
                //登录
                this.loginLoading = true;
                password = sha1(password);
                $api.post2('/bizeff/merchants/login',{
                    user_name:userName,
                    password
                }).then(res =>{
                    this.loginLoading = false;
                    if(res.resp_code == 200){
                        //登录成功
                        cookie.setItem('bizeffNo',res.data.mer_uuid);
                        this.$router.replace({
                            path:'/menus/account-general'
                        });
                    }else{
                        this.$message({
                            type:'error',
                            message:res.resp_message || '服务器错误！',
                            showClose:true
                        });
                    }
                });

            },
            checkUserName(userName,ref){
                if(!trim(userName)){
                    this.$message({
                        showClose:true,
                        message:'请输入用户名！',
                        type:'error'
                    });
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
                // if(!checkPsw(password)){
                //     this.$message({
                //         showClose:true,
                //         message:'密码请“以字母开头，长度在6-18之间，只能包含字符、数字和下划线”',
                //         type:'error'
                //     });
                //     this.addClass(this.$refs[ref],'error-color');
                //     return false;
                // }
                return true;
            },
            //添加清除样式事件
            setDomEvent(){
                var that = this;
                document.querySelectorAll('.el-input__inner').forEach((node,index) => {
                    node.onfocus = function(){
                        //此处全部删除了class，若修改需注意
                        let dom = that.$refs[this.getAttribute('name')];
                        that.removeClass(dom,'error-color');
                        
                    }
                })
            },
            hasClass(obj,cls) { 
                if(obj){
                    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)')); 
                }
                return false;
                 
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
