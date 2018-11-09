<template>
    <div flex="main:justify cross:center" class="index-header">
        <div class="header-left">brizeff</div>
        <div flex class="header-right">
            <div flex="cross:center" class="header-search">
                <el-input
                    class="sear-input"
                    placeholder="请输入搜索内容"
                    prefix-icon="el-icon-search"
                    v-model="searchVal">
                </el-input>
                <el-button type="primary">搜索</el-button>
            </div>
            <div flex="cross:center" class="header-navs">
                <el-menu class="el-menu-demo" mode="horizontal" 
                router
                @select="handleSelect">
                    <el-submenu index="1">
                        <template slot="title">申请</template>
                        <el-menu-item index="/menus/detail">我的申请</el-menu-item>
                        <el-menu-item index="2-2">申请进度</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">费用</template>
                        <el-menu-item index="2-1" flex="main:justify">
                            <span>账户余额</span>
                            <span>￥88.88</span>
                        </el-menu-item>
                        <el-menu-item index="2-2">充值</el-menu-item>
                        <el-menu-item index="2-3">消费记录</el-menu-item>
                        <el-menu-item index="2-3">发票管理</el-menu-item>
                        <el-menu-item index="2-3">进入费用中心</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">帮助与文档</template>
                        <el-menu-item index="2-1">API文档</el-menu-item>
                        <el-menu-item index="2-2">帮助中心</el-menu-item>
                        <el-menu-item index="2-3">操作手册</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
            <div flex="cross:center" class="header-user">
                <el-dropdown class="user-dropdown">
                    <span class="">
                        <router-link to="/menus/user">
                            <img class="user-avatar" :src="avatar" :alt="userName">
                        </router-link> 
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item flex="main:justify">
                            <span>萧十一郎</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>实名认证</span>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <router-link class="reset-style" to="/menus/user">基本资料</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <router-link class="reset-style" to="/menus/safe">安全设置</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item>消息</el-dropdown-item>
                        <el-dropdown-item divided
                            @click.native="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    import './index-header.less';
    export default {
        name: 'index-header',
        props:['data','items'],
        data(){
            return {
                searchVal:'',
                activeIndex:'1',
                avatar:'https://image-static.segmentfault.com/353/178/353178302-5bdfe2c52e3df_articlex',
                userName:'萧十一郎',
                isFocus:false
            }
        },
        created(){

        },
        computed: {
            inputs:{
                get:function(){
                    console.log(this.data)
                    return this.data;
                },
                set:function(newValue){

                    console.log(newValue);
                    // return newValue;
                    this.inputVal = newValue;
                    return newValue;
                }
            },
            lists:function(){
                let items = [];
                this.items.map(item =>{
                    items.push(item);
                });
                return items;
            }
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
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                              
                });
            },
            foucs(){
                alert()
            }
        },
        destroyed(){

        }
    }
</script>
