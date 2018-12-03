<template>
    <div class="detail">
        <el-button type="primary" @click.native="addData">点击测试</el-button>
    </div>
</template>
<script>
    import $api from '../tools/api';
    export default {
        name: 'user',
        data(){
            return {
                
            }
        },
        created(){
            // setTimeout(() => { this.name = 'http' },2000);
            // this.getList();
        },
        computed: {

        },
        components: {  },
        methods: {
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
