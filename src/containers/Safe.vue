<template>
    <div class="safe">
        
    </div>
</template>
<script>
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
