<template>
    <el-row class="menus-wrap" :gutter="20">
        <el-col class="menus" :span="6">
            <el-menu
            default-active="/menus/page"
            router
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/menus/index">选项1</el-menu-item>
                    <el-menu-item index="/menus/page">选项2</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-menu-item index="/menus/detail">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>导航三</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/menus/logs">选项1</el-menu-item>
                    <el-menu-item index="/menus/center">选项2</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/menus/user">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </el-menu-item>
            </el-menu>
        </el-col>
        <el-col  :span="18">
            <router-view class=""></router-view>
        </el-col>
    </el-row>
</template>

<script>
    import '../less/menus.less';
    export default {
        name: 'menus',
        data(){
            return {}
        },
        created(){
        },
        computed: {},
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
