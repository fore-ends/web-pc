<template>
    <div class="index-header">
        <div class="header-border"></div>
        <div flex="main:justify cross:center" class="header-width">
            <div class="header-left">
                <img src="../../images/logo.png" alt="bizeff">
            </div>
            <div flex class="header-right">
                <div flex="cross:center" class="header-search">
                    <el-input
                        class="sear-input"
                        placeholder="请输入搜索内容"
                        prefix-icon="el-icon-search"
                        clearable
                        v-model="searchVal">
                    </el-input>
                    <el-button type="primary">搜索</el-button>
                </div>
                <div flex="cross:center" class="header-navs">
                    <el-menu class="el-menu-demo" mode="horizontal"
                    router
                    @select="handleSelect">
                        <el-submenu index="1">
                            <template slot="title">产品与服务</template>
                            <el-menu-item index="/menus/cloud-settlement">
                                <span flex="main:justify cross:center">
                                    <span>云结算</span>
                                    <el-tag type="danger">审核中</el-tag>
                                </span>
                            </el-menu-item>
                            <el-menu-item index="/menus/cloud-signed">
                                <span flex="main:justify cross:center">
                                    <span>云签约</span>
                                    <el-tag type="info">未开通</el-tag>
                                </span>
                            </el-menu-item>
                            <el-menu-item index="/menus/cloud-finance">
                                <span flex="main:justify cross:center">
                                    <span>云财务</span>
                                    <el-tag type="success">已开通</el-tag>
                                </span>
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">费用</template>
                            <el-menu-item index="/menus/account-general" flex="main:justify">
                                <span>账户余额</span>
                                <span>￥{{balance_total | currencyFormat}}</span>
                            </el-menu-item>
                            <el-menu-item index="/menus/account-general?type=recharge">充值</el-menu-item>
                            <el-menu-item index="/menus/spend-general">消费记录</el-menu-item>
                            <el-menu-item index="/menus/bill-manage">发票管理</el-menu-item>
                            <el-menu-item index="spend-general">费用中心</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">帮助与文档</template>
                            <el-menu-item index="/api">API文档</el-menu-item>
                            <el-menu-item index="/help">帮助中心</el-menu-item>
                            <el-menu-item index="/manual">操作手册</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </div>
                <div flex="cross:center" class="header-user">
                    <el-dropdown class="user-dropdown" @command="handleCommand">
                        <span class="">
                            <router-link to="/menus/user">
                                <img class="user-avatar" :src="avatar" >
                            </router-link>
                        </span>
                        <el-dropdown-menu slot="dropdown" style="min-width:180px;">
                            <el-dropdown-item disabled>
                                <div flex="main:justify" class="dropdown-u-infor">
                                    <span class="ellipsis" style="width:66px">{{user_name}}</span>
                                    <span>实名认证</span>
                                </div>
                                
                            </el-dropdown-item>
                            <el-dropdown-item command="/menus/user">基本资料</el-dropdown-item>
                            <el-dropdown-item command="/menus/safe">安全设置</el-dropdown-item>
                            <!-- <el-dropdown-item>消息</el-dropdown-item> -->
                            <el-dropdown-item divided command="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import './index-header.less';
    import $api from '../../tools/api';
    import {mapState} from 'vuex';
    import store from '../../store';
    export default {
        name: 'index-header',
        props:['data','items'],
        data(){
            return {
                searchVal:'',
                activeIndex:'1',
                avatar:'https://image-static.segmentfault.com/353/178/353178302-5bdfe2c52e3df_articlex',
                isFocus:false,

            }
        },
        created(){
            //当前用户信息
            store.dispatch('getAccountInfo');
            //账户
            store.dispatch('getBalances');
            //认证信息
            store.dispatch('getCertificates');
        },
        computed: {
            ...mapState([
                'user_uuid',
                'mer_name',
                'mobile_no',
                'email',
                'merchant_info',
                'enterprise_info',
                'balance_total',
                'user_name'
            ])
        },
        methods: {
            handleSelect(){

            },
            goLogin(register){
                let query = {};
                if(register == 'register'){
                    query.register = 1;
                }
                this.$router.push({
                    path:'/login',
                    query
                });
            },
            logout(){
                this.$confirm(
                    '您是否确定退出当前账号？',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).then(() => {
                    $api.post('/bizeff/merchants/login_out').then(res => {
                        if(res.resp_code == 200){
                            // this.$message({
                            //     type: 'success',
                            //     message: '删除成功!'
                            // });
                            this.$router.push({
                                path:'/login'
                            });
                        }
                    })
                }).catch(() => {

                });
            },
            handleCommand(command) {
                if(command == 'logout'){
                    this.logout();
                    return false;
                }
                if(command){
                    this.$router.push({
                        path:command
                    });
                }
                
            },
            foucs(){
                alert()
            }
        },
        destroyed(){

        }
    }
</script>
