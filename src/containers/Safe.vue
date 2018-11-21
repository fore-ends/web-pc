<template>
    <div class="safe">
        <div class="safe-infor">
            <h5>账户信息</h5>
            <div class="safe-list">
                <dl flex="cross:center">
                    <dt>登录账号：</dt>
                    <dd>
                        <span>zfkij</span>
                        <span>(未认证，<el-button type="text">点击进行实名认证</el-button>)</span>
                    </dd>
                </dl>
                <dl flex="cross:center">
                    <dt>账号ID：</dt>
                    <dd>11020181111010</dd>
                </dl>
                <dl flex="cross:center">
                    <dt>开通时间：</dt>
                    <dd>2018-11-11</dd>
                </dl>
            </div>
        </div>
        <div class="safe-setting">
            <h5>安全设置</h5>
            <div class="safe-list">
                <dl flex="cross:center">
                    <dt>安全手机：</dt>
                    <dd>
                        <template v-if="phoneNumberView">{{phoneNumberView}}</template>
                        <template v-else>未绑定</template>
                    </dd>
                    <dd v-if="!phoneNumberView"><el-button type="text" @click = "bindPhone">绑定</el-button></dd>
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
        <el-dialog class="dialog-phone"
            title="绑定手机号"
            :visible.sync="phoneDialogVisible"
            width="360px"
            center>
            <div class="phone-form">
                <dl class="dom-must" flex="main:justify cross:center">
                    <dt flex-box="0">手机号：</dt>
                    <dd flex-box="1">
                        <el-input type="text" placeholder="请输入手机号"
                            v-model="phoneNumber"></el-input>
                    </dd>
                </dl>
                <dl class="dom-must" flex="main:justify cross:center">
                    <dt flex-box="0">验证码：</dt>
                    <dd flex-box="1" flex="main:justify">
                        <span class="verify-input">
                            <el-input type="text" placeholder="请输入验证码"
                                v-model="verifyPhone"></el-input>
                        </span>
                        <span><el-button type="primary">发送验证码</el-button></span>
                    </dd>
                </dl>
            </div>
            <span slot="footer" class="dialog-footer" flex="box:mean">
                <div>
                    <el-button @click="phoneDialogVisible = false">取 消</el-button>
                </div>
                <div>
                    <el-button type="primary" @click="phoneDialogSumit">确 定</el-button>
                </div>
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
                <dl class="dom-must" flex="main:justify cross:center">
                    <dt flex-box="0">验证码：</dt>
                    <dd flex-box="1" flex="main:justify">
                        <span class="verify-input">
                            <el-input type="text" placeholder="请输入验证码"
                            v-model="verifyPsw"></el-input>
                        </span>
                        <span class="verify-btn">
                            <el-button type="primary">发送验证码</el-button>
                        </span>
                    </dd>
                </dl>
            </div>
            <span slot="footer" class="dialog-footer" flex="box:mean">
                <div>
                    <el-button @click="pswDialogVisible = false">取 消</el-button>
                </div>
                <div>
                    <el-button type="primary" @click="pswDialogSumit">确 定</el-button>
                </div>
            </span>
        </el-dialog>

    </div>
</template>
<script>
    import '../less/safe.less';
    import $api from '../tools/api';
    import { cookie } from '../tools/store';
    import { verifyTime, checkPhone, checkPsw } from '../tools/operation';
    export default {
        name: 'safe',
        data(){
            return {
                name:'www',
                account:'',//账号
                phoneDialogVisible:false,
                phoneNumber:'',//安全手机
                verifyPhone:'',
                phoneNumberView:'',
                password:'',
                newPassword:'',
                newPassword2:'',
                verifyPsw:'',
                pswDialogVisible:false
            }
        },
        created(){
            // setTimeout(() => { this.name = 'http' },2000);
            this.getList();
        },
        computed: {

        },
        components: {  },
        methods: {
            getList(){
                $api.get('/search').then(res =>{
                    if(res.code == 200){
                        this.items = res.data;
                    }
                });
            },
            addData(){
                let params = {
                    name:'chunting',
                    href:window.location.href,
                    time:new Date()
                };
                $api.post('/add',params).then(res =>{
                    console.log(res);
                })
            },
            //绑定手机号
            bindPhone(){
                this.phoneDialogVisible = true;
            },
            //提交绑定手机号
            phoneDialogSumit(){
                let phoneNumber = this.phoneNumber;
                if(checkPhone(phoneNumber)){
                    this.$message({
                        message: '安全手机绑定成功！',
                        type: 'success',
                        showClose:true
                    });
                    this.phoneDialogVisible = false;
                    this.phoneNumberView = phoneNumber;
                    this
                }else{
                    this.$message({
                        message: '输入的手机号格式有误！',
                        type: 'error',
                        showClose:true
                    });
                }
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
                if(!checkPsw(password)){
                    this.$message({
                        message: '输入旧密码格式有误！',
                        type: 'error',
                        showClose:true
                    });
                    return false;
                }
                if(!checkPsw(newPassword)){
                    this.$message({
                        message: '输入新密码格式有误！',
                        type: 'error',
                        showClose:true
                    });
                    return false;
                }
                if( newPassword != newPassword2 ){
                    this.$message({
                        message: '新密码两次输入不一致！',
                        type: 'error',
                        showClose:true
                    });
                    return false;
                }
                //submit
                alert('uuuu');
                this.clearPswDialog();
                // this.pswDialogVisible = false;
            },
            //清除修改密码输入记录
            clearPswDialog(){
                this.password = '';
                this.newPassword = '';
                this.newPassword2 = '';
                this.verifyPsw = '';
            }
        },
        destroyed(){

        }
    }
</script>
