<template>
    <div class="user">
        <!-- <ul>
            <li v-for="item in items">
                <template v-if="item.id == 1">
                    <input type="text" 
                        v-model="item.name"
                        @input="item.name = onlyNumber(item.name)"
                        @afterpaste="item.name = onlyNumber(item.name)">
                </template>
                <template v-else>
                    <input type="text" 
                        v-model="item.name"
                        @input="item.name = onlyStr(item.name)"
                        @afterpaste="item.name = onlyStr(item.name)">
                </template>
                
            </li>
        </ul> -->

        <!-- <index-footer :data="name" :items="items"></index-footer> -->
        <!-- <ul>
            <li flex="main:justify" v-for="item in items">
                <span>{{item.name}}</span>
                <span>{{item.href}}</span>
                <span>{{item.time}}</span>
            </li>
        </ul>
        <p>{{items.length}}</p> -->
        用户信息
    </div>
</template>
<script>
    import $api from '../tools/api';
    import { cookie } from '../tools/store';
    import { checkIdNumber, verifyTime, onlyNumber, onlyStr } from '../tools/operation';
    import IndexFooter from '../components/IndexFooter';
    export default {
        name: 'user',
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
        components: { IndexFooter },
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
