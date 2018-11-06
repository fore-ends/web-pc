<template>
    <div class="home">
        <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
        <div>
            <div :style="{color:watchIdNumber}">{{val | translatePate}}</div>
            <el-input v-model.trim="idNumber" placeholder="请输入身份证号号码"></el-input>
            <div><el-button @click.stop="clickV">{{btnText}}</el-button></div>
        </div>
    </div>
</template>
<script>
    import '../less/home.less';
    import $api from '../tools/api';
    import { cookie } from '../tools/store';
    import { checkIdNumber, verifyTime } from '../tools/operation';
    export default {
        name: 'home',
        data(){
            return {
                val:6,
                idNumber:'333',
                btnText:'点击获取验证码'
            }
        },
        created(){
            // console.log(cookie.getItem('ddd'));
            console.log(String.lllll);
            cookie.removeItem('ddd')
            let fun = (res) => {
                return new Promise(function(resolve,reject){
                    if(res == 200){
                        resolve(res);
                    }else{
                        reject(res);
                    }
                });
            };
            fun(200).then((data)=>{
                console.log(data);
                return {'ddd':'12334'};
            }).then(data =>{
                console.log('dddd',data);
                cookie.setItem({
                    key:'ddd',
                    value:data
                });
                cookie.setItem({
                    key:'ddd2',
                    value:0
                });
            }).catch(data => {
                console.log('catch',data);
            });
        },
        computed: {
            watchIdNumber:function(){
                console.log(this.idNumber)
                return checkIdNumber(this.idNumber) ? 'red' : 'green';
            }
        },
        methods: {
            clickV(){
                if(this.vIsloading){
                    return false;
                }
                this.vIsloading = true;
                verifyTime((res)=>{
                    if(res.statu){
                        //倒计时结束
                        this.btnText = '点击获取验证码';
                        this.vIsloading = false;
                    }else{
                        this.btnText = `${res.time}s`;
                    }
                })
            }
        },
        destroyed(){

        }
    }
</script>
