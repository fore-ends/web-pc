<template>
    <div class="safe">
        <div class="safe-infor">
            <h5>账户信息</h5>
            <div class="safe-list">
                <dl flex="cross:center">
                    <dt>登录账号：</dt>
                    <dd>
                        <span>{{operator_name}}</span>
                        <span>(未认证，<el-button type="text" @click="linkCertify">点击进行实名认证</el-button>)</span>
                    </dd>
                </dl>
                <dl flex="cross:center">
                    <dt>账号ID：</dt>
                    <dd>{{user_name}}</dd>
                </dl>
                <dl flex="cross:center">
                    <dt>开通时间：</dt>
                    <dd>{{created_time}}</dd>
                </dl>
            </div>
        </div>
        <div class="safe-setting">
            <h5>安全设置</h5>
            <div class="safe-list">
                <dl flex="cross:center">
                    <dt>安全手机：</dt>
                    <dd>
                        <template v-if="mobile_no">{{mobile_no}}</template>
                        <template v-else>未绑定</template>
                    </dd>
                    <dd>
                        <el-button type="text" @click = "bindPhone">
                            <template v-if="mobile_no">修改</template>
                            <template v-else>绑定</template>
                        </el-button>
                    </dd>
                </dl>
                <!-- <dl flex="cross:center">
                    <dt>注册邮箱：</dt>
                    <dd>未绑定</dd>
                    <dd><el-button type="text">绑定</el-button></dd>
                </dl> -->
                <dl flex="cross:center">
                    <dt>登录密码：</dt>
                    <dd>※※※※※※※※</dd>
                    <dd><el-button type="text" @click = "editPsw">修改</el-button></dd>
                </dl>
                <!-- <dl flex="cross:center">
                    <dt>交易密码：</dt>
                    <dd>未设置</dd>
                    <dd><el-button type="text">设置</el-button></dd>
                </dl> -->
            </div>
        </div>
        <el-dialog
            title="验证手机号"
            :visible.sync="phoneDialogVisible"
            width="260px">
            <el-dialog class="dialog-phone"
                width="360px"
                title="绑定手机号"
                :visible.sync="innerVisible"
                append-to-body
                center
                :before-close="handleClose">
                <div class="phone-form">
                    <dl class="dom-must" flex="main:justify cross:center">
                        <dt flex-box="0">手机号：</dt>
                        <dd flex-box="1">
                            <el-input type="text" placeholder="请输入手机号"
                                maxlength="11"
                                @keyup.native="phoneNumber = onlyNumber(phoneNumber)"
                                v-model="phoneNumber"></el-input>
                        </dd>
                    </dl>
                    <dl class="dom-must" flex="main:justify cross:center">
                        <dt flex-box="0">验证码：</dt>
                        <dd flex-box="1" flex="main:justify">
                            <span class="verify-input">
                                <el-input type="text" placeholder="请输入验证码" maxlength="6"
                                    @keyup.native="verifyPhone = onlySandN(verifyPhone)"
                                    v-model="verifyPhone"></el-input>
                            </span>
                            <span>
                                <el-button type="primary"
                                    style="width:92px;"
                                    :disabled="verifyPhoneLoading"
                                    @click="bindPhoneVerify">{{btnTextPhone}}</el-button>
                            </span>
                        </dd>
                    </dl>
                </div>
                <span slot="footer" class="dialog-footer" flex="box:mean">
                    <div>
                        <el-button @click="closeDialog">取 消</el-button>
                    </div>
                    <div>
                        <el-button type="primary"
                            @click="phoneDialogSumit"
                            :loading="btnLoading">确 定</el-button>
                    </div>
                </span>
            </el-dialog>
            <span flex="main:justify">
                <span>
                    <el-input type="text" placeholder="请输入手机号" maxlength="11"
                        v-model="oldMobile"></el-input>
                </span>
                <span>
                    <el-button type="primary" icon="el-icon-arrow-right"
                        :loading="phoneLoading"
                        @click="goVerify"></el-button>
                </span>
            </span>
        </el-dialog>
        <el-dialog class="dialog-psw"
            title="修改密码"
            :visible.sync="pswDialogVisible"
            width="400px"
            center>
            <div class="phone-form">
                <dl class="dom-must" flex="main:justify cross:center">
                    <dt flex-box="0">旧密码：</dt>
                    <dd flex-box="1">
                        <el-input type="password" placeholder="请输入旧密码" v-model="password"></el-input>
                    </dd>
                </dl>
                <dl class="dom-must" flex="main:justify cross:center">
                    <dt flex-box="0">新密码：</dt>
                    <dd flex-box="1">
                        <el-input type="password" placeholder="请输入新密码" v-model="newPassword"></el-input>
                    </dd>
                </dl>
                <dl class="dom-must" flex="main:justify cross:center">
                    <dt flex-box="0">确认新密码：</dt>
                    <dd flex-box="1">
                        <el-input type="password" placeholder="请输入新密码" v-model="newPassword2"></el-input>
                    </dd>
                </dl>
                <!-- <dl class="dom-must" flex="main:justify cross:center">
                    <dt flex-box="0">验证码：</dt>
                    <dd flex-box="1" flex="main:justify">
                        <span class="verify-input">
                            <el-input type="text" placeholder="请输入验证码"
                            v-model="verifyPsw"></el-input>
                        </span>
                        <span class="verify-btn">
                            <el-button type="primary"
                                @click="pswVerify">发送验证码</el-button>
                        </span>
                    </dd>
                </dl> -->
            </div>
            <span slot="footer" class="dialog-footer" flex="box:mean">
                <div>
                    <el-button @click="pswDialogVisible = false">取 消</el-button>
                </div>
                <div>
                    <el-button type="primary"
                        @click="pswDialogSumit"
                        :loading="pswLoading">确 定</el-button>
                </div>
            </span>
        </el-dialog>

    </div>
</template>
<script>
    import '../less/safe.less';
    import $api from '../tools/api';
    import { cookie } from '../tools/store';
    import { verifyTime, checkPhone, checkPsw, onlySandN, trim, onlyNumber } from '../tools/operation';
    import _ from 'lodash/core';
    export default {
        name: 'safe',
        data(){
            return {
                mer_uuid:this.$store.state.mer_uuid,
                operator_uuid:'',
                operator_name:'www',
                user_name:'',
                created_time:'',
                mobile_no:'',
                email:'',
                phoneDialogVisible:false,
                innerVisible:false,
                phoneNumber:'',//安全手机
                realPhoneNumber:'',//真实提交的手机号
                verifyPhone:'',
                verifyPhoneLoading:false,
                btnTextPhone:'获取验证码',
                oldMobile:'',//老手机号
                btnLoading:false,
                phoneLoading:false,

                password:'',
                newPassword:'',
                newPassword2:'',
                verifyPsw:'',
                pswDialogVisible:false,
                pswLoading:false
            }
        },
        created(){
            // setTimeout(() => { this.name = 'http' },2000);
            this.getData();
        },
        computed: {

        },
        components: {  },
        methods: {
            //取信息
            getData(){
                $api.get(`/bizeff/merchants/${this.mer_uuid}/operators`).then(res =>{
                    if(res.resp_code == 200){
                        _.forEach(res.data,(item,key) => {
                            this[key] = item;
                        });
                    }
                });
            },
            //跳转绑定
            linkCertify(){
                this.$router.push({
                    path:'/menus/certify'
                });
            },
            //绑定手机号
            bindPhone(){
                this.phoneDialogVisible = true;
                if(!this.mobile_no){
                    setTimeout(()=>{
                        this.innerVisible = true;
                    });
                }
            },
            //先验证下老手机号
            goVerify(){
                let oldMobile = this.oldMobile;
                if(!checkPhone(oldMobile)){
                    this.$message({
                        type:'error',
                        message:'请输入正确格式的手机号！',
                        showClose:true
                    });
                    return false;
                }
                this.btnLoading = true;
                $api.post(`/bizeff/merchants/${this.mer_uuid}/operator/check`,{
                    mobile_no:oldMobile
                }).then(res =>{
                    this.btnLoading = false;
                    this.oldMobile = '';
                    if(res.resp_code == 200){
                        this.innerVisible = true;
                    }else{
                        this.$message({
                            type:'error',
                            message:res.resp_message || '服务器错误！',
                            showClose:true
                        });
                    }
                })
            },
            //绑定手机号下发验证码
            bindPhoneVerify(){
                //校验手机号码
                let phoneNumber = this.phoneNumber;
                if(!checkPhone(phoneNumber)){
                    this.$message({
                        type:'error',
                        message:'请输入正确格式的手机号！',
                        showClose:true
                    });
                    return false;
                }
                if(this.verifyPhoneLoading){
                    return false;
                }
                this.verifyPhoneLoading = true;
                //ajax下发验证码
                this.realPhoneNumber = phoneNumber;
                verifyTime((res)=>{
                    if(res.statu){
                        //倒计时结束
                        this.btnTextPhone = '获取验证码';
                        this.verifyPhoneLoading = false;
                    }else{
                        this.btnTextPhone = `${res.time}s`;
                    }
                })
            },
            //提交绑定手机号
            phoneDialogSumit(){
                let realPhoneNumber = this.realPhoneNumber;
                if(!realPhoneNumber){
                    this.$message({
                        type:'error',
                        message:'请先获取验证码！',
                        showClose:true
                    });
                    return false;
                }
                if(!checkPhone(realPhoneNumber)){
                    this.$message({
                        type:'error',
                        message:'请输入正确格式的手机号！',
                        showClose:true
                    });
                    return false;
                }
                let verifyPhone = this.verifyPhone;
                if(!trim(verifyPhone)){
                    this.$message({
                        type:'error',
                        message:'请输入验证码！',
                        showClose:true
                    });
                    return false;
                }
                this.phoneLoading = true;
                $api.post(`/bizeff/merchants/${this.mer_uuid}/operator/`,{
                    mobile_no:realPhoneNumber,
                    verify:'123456'
                }).then(res => {
                    this.phoneLoading = false;
                    if(res.resp_code == 200){
                        this.$message({
                            message: '安全手机绑定成功！',
                            type: 'success',
                            showClose:true
                        });
                        this.phoneDialogVisible = false;
                        this.innerVisible = false;
                        this.clearPhoneDialog();
                        //返显数据
                        _.forEach(res.data,(item,key) => {
                            this[key] = item;
                        });
                    }else{
                        this.$message({
                            message: res.resp_message,
                            type: 'error',
                            showClose:true
                        });
                    }
                });
            },
            //清除绑定手机号输入记录
            clearPhoneDialog(){
                this.phoneNumber = '';
                this.verifyPhone = '';
            },
            //修改密码
            editPsw(){
                this.pswDialogVisible = true;
            },
            //提交修改密码
            pswDialogSumit(){
                let {
                    password,
                    newPassword,
                    newPassword2
                } = this;
                // if(!checkPsw(password)){
                //     this.$message({
                //         message: '输入旧密码格式有误！',
                //         type: 'error',
                //         showClose:true
                //     });
                //     return false;
                // }
                // if(!checkPsw(newPassword)){
                //     this.$message({
                //         message: '输入新密码格式有误！',
                //         type: 'error',
                //         showClose:true
                //     });
                //     return false;
                // }
                if( newPassword != newPassword2 ){
                    this.$message({
                        message: '新密码两次输入不一致！',
                        type: 'error',
                        showClose:true
                    });
                    return false;
                }
                
                
                this.pswLoading = true;
                //ajax
                $api.post(`/bizeff/merchants/${this.mer_uuid}/operators`,{
                    operator_uuid:this.operator_uuid,
                    user_name:this.user_name,
                    password:newPassword
                }).then(res => {
                    if(res.resp_code == 200){
                        this.pswDialogVisible = false;
                        this.clearPswDialog();
                        this.$message({
                            type:'success',
                            message:'修改密码成功！',
                            showClose:true
                        });
                    }else{
                        this.$message({
                            type:'error',
                            message:res.resp_message,
                            showClose:true
                        });
                    }
                    
                })
                // 
            },
            //清除修改密码输入记录
            clearPswDialog(){
                this.password = '';
                this.newPassword = '';
                this.newPassword2 = '';
                this.verifyPsw = '';
            },
            //只能输入数字和字母
            onlySandN(val){
                return onlySandN(val);
            },
            //只能是数字
            onlyNumber(val){
                return onlyNumber(val);
            },
            closeDialog(){
                if(!this.mobile_no){
                    this.phoneDialogVisible = false;
                }
                this.innerVisible = false;
            },
            handleClose(done){
                if(!this.mobile_no){
                    this.phoneDialogVisible = false;
                }
                done();
            }
        },
        destroyed(){

        }
    }
</script>
