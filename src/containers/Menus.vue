<template>
    <div flex="dir:top cross:center" class="menus-wrap">
        <index-header flex-box="0"></index-header>
        <div flex-box="1" flex="dir:top" class="index-content-width">
            <div flex-box="1" flex="main:justify" class="index-main" >
                <div flex-box="0" class="menus">
                    <div class="menus-title">{{menusTitle}}</div>
                    <el-menu
                        :default-active="defaultActive"
                        router
                        class="el-menu-vertical"
                        unique-opened
                        @open="handleOpen"
                        @close="handleClose">
                        <template v-for="item in menusItems">
                            <template v-if="item.subs">
                                <el-submenu :index="item.index" :key="item.index">
                                    <template slot="title">
                                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                                    </template>
                                    <template v-for="subItem in item.subs">
                                        <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                            <template slot="title">{{ subItem.title }}</template>
                                            <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                                {{ threeItem.title }}
                                            </el-menu-item>
                                        </el-submenu>
                                        <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                            {{ subItem.title }}
                                        </el-menu-item>
                                    </template>
                                </el-submenu>
                            </template>
                            <template v-else>
                                <el-menu-item :index="item.index" :key="item.index">
                                    <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                                </el-menu-item>
                            </template>
                        </template>
                        <!-- <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>导航一</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/menus/detail">选项1</el-menu-item>
                                <el-menu-item index="/menus/user">选项2</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu> -->

                        <!-- <el-menu-item index="/menus/detail">
                            <i class="el-icon-menu"></i>
                            <span slot="title">触发页面</span>
                        </el-menu-item> -->
                        <!-- <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-document"></i>
                                <span>导航三</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/menus/logs">选项1</el-menu-item>
                                <el-menu-item index="/menus/center">选项2</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu> -->
                        <!-- <el-menu-item index="/menus/user">
                            <i class="el-icon-setting"></i>
                            <span slot="title">个人信息</span>
                        </el-menu-item> -->
                    </el-menu>
                </div>
                <div flex-box="1" flex="dir:top" class="main-inner">
                    <index-title flex-box="0" :title="indexTitile"></index-title>
                    <router-view flex-box="1" class="inner-box"></router-view>
                </div>
            </div>
        </div>
        <index-footer flex-box="0"></index-footer>
        
    </div>
</template>

<script>
    import '../less/menus.less';
    import IndexHeader from '../components/IndexHeader';
    import IndexFooter from '../components/IndexFooter';
    import IndexTitle from '../components/IndexTitle';
    
    export default {
        name: 'menus',
        data(){
            return {
                menusTitle:'',
                menusObj:{
                    "accountMs":{
                        title:'账号管理',
                        items:[
                            {
                                icon: 'el-icon-lx-profile',
                                index: '/menus/user',
                                title: '基本资料'
                            },
                            {
                                icon: 'el-icon-lx-vipcard',
                                index: '/menus/certify',
                                title: '实名认证'
                            },
                            {
                                icon: 'el-icon-lx-lock',
                                index: '/menus/safe',
                                title: '安全设置'
                            }
                        ]
                    },
                    "costCenter":{
                        title:'费用中心',
                        items:[
                            {
                                icon: 'el-icon-lx-addressbook',
                                index: '/menus/account-general',
                                title: '账户总览'
                            },
                            {   
                                icon: 'el-icon-lx-calendar',
                                index: '/menus/money-detail',
                                title: '收支明细'
                            },
                            {
                                icon: 'el-icon-lx-recharge',
                                index: '/menus/spend',
                                title: '消费管理',
                                subs:[
                                   {
                                        index: '/menus/spend-general',
                                        title: '消费总览'
                                    },
                                    {
                                        index: '/menus/spend-detail',
                                        title: '消费明细'
                                    } 
                                ]
                            },
                            {
                                icon: 'el-icon-lx-text',
                                index: '/menus/bill',
                                title: '发票管理',
                                subs:[
                                   {
                                        index: '/menus/bill-manage',
                                        title: '发票管理'
                                    },
                                    {
                                        index: '/menus/bill-address',
                                        title: '发票地址管理'
                                    } 
                                ]
                            }
                        ]
                    },
                    "pAndS":{
                        title:'产品与服务',
                        items:[
                            {
                                icon: 'el-icon-lx-copy',
                                index: '/menus/cloud-settlement',
                                title: '云结算'
                            },{
                                icon: 'el-icon-lx-edit',
                                index: '/menus/cloud-signed',
                                title: '云签约'
                            },{
                                icon: 'el-icon-lx-recharge',
                                index: '/menus/cloud-finance',
                                title: '云财务'
                            }
                        ]
                    }
                },
                // menusItems: [
                //     {
                //         icon: 'el-icon-lx-profile',
                //         index: '0',
                //         title: '账号管理',
                //         subs: [
                //             {
                //                 index: '/menus/user',
                //                 title: '基本资料'
                //             },
                //             {
                //                 index: '/menus/certify',
                //                 title: '实名认证'
                //             },
                //             {
                //                 index: '/menus/safe',
                //                 title: '安全设置'
                //             }
                //         ]
                //     },{
                //         icon: 'el-icon-lx-recharge',
                //         index: '1',
                //         title: '费用中心',
                //         subs: [
                //             {
                //                 index: '/menus/account-general',
                //                 title: '账户总览'
                //             },
                //             {
                //                 index: '/menus/money-detail',
                //                 title: '收支明细'
                //             },
                //             {
                //                 index: '/menus/',
                //                 title: '消费管理',
                //                 subs:[
                //                    {
                //                         index: '/menus/spend-general',
                //                         title: '消费总览'
                //                     },
                //                     {
                //                         index: '/menus/spend-detail',
                //                         title: '消费明细'
                //                     } 
                //                 ]
                //             }
                //         ]
                //     }
                // ]
            }
        },
        created(){
            console.log(this.$route.path)
        },
        computed: {
            defaultActive:function(){
                return this.$route.path;
            },
            indexTitile:function(){
                return this.$route.meta.title;
            },
            //菜单
            menusItems:function(){
                let { belong } = this.$route.meta;
                let munus = this.menus

                this.menusTitle = this.menusObj[belong].title;
                return this.menusObj[belong].items;
            }
        },
        components: {
            IndexHeader,IndexFooter,IndexTitle
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        destroyed(){

        }
    }
</script>
