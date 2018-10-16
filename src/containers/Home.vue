<template>
    <div class="home">
        <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
    </div>
</template>

<script>
    import '../less/home.less';
    export default {
        name: 'home',
        data(){
            return {}
        },
        created(){
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
