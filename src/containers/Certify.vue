<template>
    <div class="certify" v-loading="vLoading">
        <div v-if="showGuide" class="certify-guide">
            <template v-for="item in guideItems">
                <el-card class="el-card-wrap">
                    <div flex="main:justify cross:center" class="el-card-box"
                        @click="showGuide = false">
                        <div flex-box="1" class="el-card-left">
                            <h5>{{item.title}}</h5>
                            <p>{{item.page1}}</p>
                            <p>{{item.page2}}</p>
                        </div>
                        <div flex-box="0" class="el-card-right">
                            <el-button type="primary"
                                v-if="operation_status == '10'">立刻认证</el-button>
                            <el-button type="warning"
                                v-if="operation_status == '11'">审核中</el-button>
                            <el-button type="danger"
                                v-if="operation_status == '12'">认证失败</el-button>
                            <el-button type="success" disabled
                                v-if="operation_status == '20'">认证成功</el-button>
                        </div>
                    </div>
                </el-card>
            </template>
        </div>
        <div v-else>
            <certify-input
                v-if="operation_status == '10' || $route.query.status == 'input'"
                :data="operation_info"
                @callBack="callBack"></certify-input>
            <certify-view v-else 
                :status="operation_status"
                :vdata="operation_info"
                @linkSubmit="linkSubmit"></certify-view>
        </div>
    </div>
</template>
<script>
    import '../less/certify.less';
    import $api from '../tools/api';
    import CertifyInput from '../components/Certify/Input';//填写
    import CertifyView from '../components/Certify/View';//
    import _ from 'lodash/core';
    import EventBus from  '../tools/event-bus';
    export default {
        name: 'certify',
        data(){
            return {
                // inputShow:false,
                operation_status:'',//操作状态 10-提交 11-审核中 20-认证成功 12-驳回
                operation_info:{},
                showGuide:true,
                guideItems:[
                    {
                        title:'单位证件认证',
                        page1:'1、请准备好企业统一信用代码，以及法定代表人的身份证',
                        page2:'2、提交以上信息后，需等待审核'
                    }
                ],
                guideBtnTxt:'',
                operation_uuid:'',//操作表uuid
                operation_pass_time:'',//认证时间,
                // operation_info:{},
                payload:'',//'备注及扩展JSON信息',
                operator_uuids:'',//操作人uuid,
                created_time:'',//创建时间,
                updated_time:'',//修改时间

                vLoading:true
            }
        },
        created(){
            // setTimeout(()=>{
            //     this.operation_info = {
            //         ent_name:'智赋公司',
            //         enterprise_registration_no:'9839******SKJ12',
            //         time:'2018-11-11 11:11:11',
            //         business_area:'河北省-石家庄市-鹿泉区'
            //     }
            // },1000);

            //以下设置在认证成功后数据不再接口更新
            if(EventBus.operationData && EventBus.operationData.operation_status == '20'){
                _.forEach(EventBus.operationData,(item,key) => {
                    this[key] = item;
                });
                this.vLoading = false;
            }else{
                this.getData();
            }
            
        },
        computed: {
            // inputShow:function(){
            //     if(this.$route.query.status == 'input'){
            //         return true;
            //         $api.get()
            //     }
            //     return false;
            // }
        },
        components: { CertifyInput, CertifyView },
        methods: {
            linkSubmit(){
                this.$router.replace({
                    path:'/menus/certify',
                    query:{
                        status:'input'
                    }
                })
            },
            //取详
            getData(){
                // const loading = this.$loading({
                //     lock: true
                // });
                let mer_uuid = this.$store.state.mer_uuid;
                $api.get(`/bizeff/merchants/${mer_uuid}/certificates`).then(res => {
                    // loading.close();
                    this.vLoading = false;
                    if(res.resp_code == 200){
                        _.forEach(res.data,(item,key) => {
                            this[key] = item;
                        });
                        if(!this.operation_uuid){
                            this.operation_status = '10';
                        }
                        //存储认证状态
                        EventBus.operationData = res.data;
                    }else{
                        this.$message({
                            type:'error',
                            message:res.resp_message,
                            showClose:true
                        });
                    }
                })
            },
            //保存成功回调
            callBack(data){
                _.forEach(data,(item,key) => {
                    this[key] = item;
                });
                //存储认证状态
                // EventBus.operationData = res.data;
                this.showGuide = true;
            }
        },
        destroyed(){

        }
    }
</script>
