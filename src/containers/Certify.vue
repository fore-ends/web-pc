<template>
    <div class="certify">
        <div v-if="showGuide" class="certify-guide">
            <template v-for="item in guideItems">
                <el-card class="el-card-wrap">
                    <div flex="main:justify cross:center" class="el-card-box">
                        <div flex-box="1" class="el-card-left">
                            <h5>{{item.title}}</h5>
                            <p>{{item.page1}}</p>
                            <p>{{item.page2}}</p>
                        </div>
                        <div flex-box="0" class="el-card-right">
                            <el-button type="primary">{{guideBtnTxt}}</el-button>
                        </div>
                    </div>
                </el-card>
            </template>
        </div>
        <div v-else>
            <certify-input v-if="operation_status == '10'"></certify-input>
            <certify-view v-else 
                :status="operation_status"
                :vdata="operation_info"
                :time = "'2018-11-11 11:11:11'"
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
    export default {
        name: 'certify',
        data(){
            return {
                showStaus:'0',
                operation_status:'12',//操作状态 10-提交 11-审核中 20-认证成功 12-驳回
                operation_info:{
                    ent_name:'智赋科技***公司',
                    enterprise_registration_no:'9839******SKJ12',
                    time:'2018-11-11 11:11:11'
                },
                showGuide:false,
                guideItems:[
                    {
                        title:'单位证件认证',
                        page1:'1、请准备好企业统一信用代码，以及法定代表人的身份证',
                        page2:'2、提交以上信息后，需等待审核'
                    }
                ],
                guideBtnTxt:'立刻认证'
            }
        },
        created(){
            
        },
        computed: {

        },
        components: { CertifyInput, CertifyView },
        methods: {
            linkSubmit(){
                this.status = '0';
            },
            //取详
            getData(){
                let mer_uuid = this.$store.state.mer_uuid;
                $api.get(`/bizeff/merchants/${mer_uuid}/certificates`).then(res => {
                    if(res.resp_code == 200){
                        _.forEach(res.data,(item,key) => {
                            this[key] = item;
                        });
                    }
                })
            }
        },
        destroyed(){

        }
    }
</script>
