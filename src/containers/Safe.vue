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
                    <dd>未绑定</dd>
                    <dd><el-button type="text">绑定</el-button></dd>
                </dl>
                <dl flex="cross:center">
                    <dt>注册邮箱：</dt>
                    <dd>未绑定</dd>
                    <dd><el-button type="text">绑定</el-button></dd>
                </dl>
                <dl flex="cross:center">
                    <dt>登录密码：</dt>
                    <dd>**********</dd>
                    <dd><el-button type="text">修改</el-button></dd>
                </dl>
                <dl flex="cross:center">
                    <dt>交易密码：</dt>
                    <dd>未设置</dd>
                    <dd><el-button type="text">设置</el-button></dd>
                </dl>
            </div>
        </div>
    </div>
</template>
<script>
    import '../less/safe.less';
    import $api from '../tools/api';
    import { cookie } from '../tools/store';
    import { checkIdNumber, verifyTime, onlyNumber, onlyStr } from '../tools/operation';
    export default {
        name: 'safe',
        data(){
            return {
                name:'www',
                items:[
                    {
                        id:0,
                        name:'ddd'
                    },{
                        id:1,
                        name:'nnn'
                    },{
                        id:2,
                        name:'mmm'
                    }
                ]
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
            onlyNumber(val){
                console.log(val);
                return onlyNumber(val);
            },
            onlyStr(val){
                console.log(val);
                return onlyStr(val);
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
            }
        },
        destroyed(){

        }
    }
</script>
