<template>
    <div class="account-general">
        <div v-if="status == 'general'" class="general-wrap">
            <div flex="main:justify" class="property">
                <el-card class="el-card-self">
                    <dl flex="main:justify cross:center" class="dl-header">
                        <dt>账户余额</dt>
                        <dd>
                            <el-button type="text" size="medium"
                                @click.native="goQuery('recharge')">充值</el-button>
                            <el-button type="text" size="medium"
                                @click.native="goQuery('withdraw')">提现</el-button>
                        </dd>
                    </dl>
                    <div flex="main:center cross:center" class="card-inner">
                        <span>￥{{balance_total | currencyFormat}}</span>
                    </div>
                </el-card>
                <el-card class="el-card-self">
                    <dl flex="main:justify cross:center" class="dl-header">
                        <dt>可开票金额</dt>
                        <dd>
                            <el-button type="text" size="medium"
                                @click.native="goBill">发票管理</el-button>
                        </dd>
                    </dl>
                    <div flex="main:center cross:center" class="card-inner">
                        <span>￥{{can_invoice | currencyFormat}}</span>
                    </div>
                </el-card>

            </div>
            <div class="warning-wrap">
                <el-card>
                    <div flex="main:justify cross:center">
                        <dl flex="cross:center">
                            <dt>预警阙值：</dt>
                            <dd>
                                <el-input type="text" placeholder="请输入预警阙值" clearable
                                    v-model="threshold"
                                    @keyup.native="threshold = clearNoNum(threshold)"
                                    @afterpaste.native="threshold = clearNoNum(threshold)"></el-input>
                            </dd>
                            <dd style="padding-left:16px;">
                                <el-button type="primary">确定</el-button>
                            </dd>
                        </dl>
                        <div>
                            <el-switch
                                v-model="switchVal"
                                active-text="开"
                                inactive-text="关">
                            </el-switch>
                        </div>
                    </div>
                </el-card>
            </div>
            <div flex="main:justify" class="account-record">
                <el-card class="el-card-self">
                    <dl flex="main:justify cross:center" class="dl-header">
                        <dt>本月收支</dt>
                        <dd>
                            <el-button type="text" size="medium"
                                @click.native="goMoneyDetail">收支明细</el-button>
                        </dd>
                    </dl>
                    <div flex="main:justify box:mean" class="card-inner">
                        <div flex="dir:top main:justify cross:center" class="money-in">
                            <span class="money-text">入账</span>
                            <span>￥{{account_in | currencyFormat}}</span>
                        </div>
                        <div flex="dir:top main:justify cross:center" class="money-out">
                            <span class="money-text">出账</span>
                            <span>￥{{account_out | currencyFormat}}</span>
                        </div>
                    </div>
                </el-card>
                <el-card class="el-card-self">
                    <dl flex="main:justify cross:center" class="dl-header">
                        <dt>本月消费</dt>
                        <dd>
                            <el-button type="text" size="medium"
                                @click.native="goSpendGeneral">消费记录</el-button>
                        </dd>
                    </dl>
                    <div flex="dir:top main:center cross:center" class="card-inner">
                        <div flex="dir:top main:justify cross:center" class="money-out">
                            <span class="money-text" style="visibility: hidden;">本月消费</span>
                            <span>￥{{consumption_month | currencyFormat}}</span>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
        <account-recharge
            v-if="status == 'recharge'"></account-recharge>
        <account-withdraw
            v-if="status == 'withdraw'"></account-withdraw>
    </div>
</template>
<script>

    import '../less/account-general.less';
    import $api from '../tools/api';
    import { cookie } from '../tools/store';
    import { checkIdNumber, verifyTime, clearNoNum, onlyStr } from '../tools/operation';
    import AccountRecharge from '../components/Account/Recharge';
    import AccountWithdraw from '../components/Account/Withdraw';
    import _ from 'lodash/core';
    export default {
        name: 'account-general',
        data(){
            return {
                // status:'recharge',
                mer_uuid:this.$store.state.mer_uuid,
                switchVal:'',
                threshold:'',
                balance_total:100030,//账户总额
                can_invoice:0,//可开发票金额
                account_in:0,//入账(账户入账),
                account_out:0,//出账(账户出账),
                consumption_month:0,//本月消费,
            }
        },
        created(){
            console.log(_);
            this.getData();
        },
        computed: {
            status:function(){
                let type = this.$route.query.type;
                if(type != 'recharge' && type != 'withdraw'){
                    return 'general';
                }
                return type;
                 
            }
        },
        components: { AccountRecharge, AccountWithdraw },
        methods: {
            //获取数据
            getData(){
                $api.get(`/bizeff/merchants/${this.mer_uuid}/accounts`).then(res =>{
                    if(res.resp_code == '1'){
                        _.forEach(res.data,(item,key) => {
                            this[key] = item;
                        });
                    }
                })
            },
            goQuery(type){
                this.$router.push({
                    path:'/menus/account-general',
                    query:{
                        type
                    }
                })
            },
            goMoneyDetail(){
                this.$router.push({
                    path:'/menus/money-detail'
                })
            },
            goSpendGeneral(){
                this.$router.push({
                    path:'/menus/spend-general'
                })
            },
            goBill(){
                this.$router.push({
                    path:'/menus/bill-manage'
                })
            },
            //只能输入两位小数内的数字
            clearNoNum(val){
                return clearNoNum(val);
            },
            //提交阙值
            postThreshold(){
                let value = '100';
                let switchVal = 1;
                $api.post('/threshold',{
                    value,
                    switchVal
                }).then(res => {
                    console.log(res);
                })
            }
        },
        destroyed(){

        }
    }
</script>
