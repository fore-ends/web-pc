<template>
    <div class="user">
        <div class="user-head"
            v-if="operation_status == '10' || operation_status == '12'">
            <!-- <div class="user-tit">
                <i class="el-icon-warning"></i><span>您的企业信息尚未完善，请完善企业信息</span>
            </div>
            <p class="user-wran">请务必准确填写您公司真实信息，实名认证成功后此处将被替换为实名认证时提交的信息，且不能再被修改。</p> -->
            <p><i class="el-icon-warning"></i>您还未实名，为保证您的业务尽快开展，请<el-button type="text" @click="link">立即实名</el-button>！</p>
        </div>
        <div class="user-main">

            <dl class="user-main-com user-base">
                <dt class="user-avatar" flex="main:center cross:center">
                    <img src="https://image-static.segmentfault.com/353/178/353178302-5bdfe2c52e3df_articlex" alt="">
                </dt>
                <dd class="user-com-list">
                    <dl flex="cross:center" class="user-name">
                        <dt>企业名称：</dt>
                        <dd>{{mer_name}}</dd>
                    </dl>
                    <dl flex="cross:center" class="">
                        <dt>证件类型：</dt>
                        <dd v-if="enterprise_info.enterprise_card_type == '02'">营业执照</dd>
                        <dd v-if="enterprise_info.enterprise_card_type == '03'">统一社会信用代码</dd>
                    </dl>
                    <dl flex="cross:center" class="">
                        <dt>证件号：</dt>
                        <dd>{{enterprise_info.enterprise_registration_no}}</dd>
                    </dl>
                    <!-- <dl class="dom-must" flex="cross:center">
                        <dt>所在区域：</dt>
                        <dd flex="main:justify">
                            <el-select v-model="city" placeholder="请选择城市"
                                size="medium">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select v-model="country" placeholder="请选择区县"
                                size="medium">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                            </el-select>
                        </dd>
                    </dl>
                    <dl class="dom-must" flex="cross:center">
                        <dt>营业地址：</dt>
                        <dd>
                            <el-input v-model="address"
                                size="medium"
                                placeholder="请输入营业地址"
                                clearable></el-input>
                        </dd>
                    </dl> -->
                </dd>
            </dl>
            <!-- <dl class="user-main-com">
                <dt class="user-com-title">法人信息</dt>
                <dd class="user-com-list">
                    <dl class="dom-must" flex="cross:center">
                        <dt>法人姓名：</dt>
                        <dd>
                            <el-input v-model="address"
                                size="medium"
                                placeholder="请输入法人姓名"
                                clearable></el-input>
                        </dd>
                    </dl>
                    <dl class="dom-must" flex="cross:center">
                        <dt>证件类型：</dt>
                        <dd>
                            <el-select v-model="cardType" placeholder="请选择证件类型"
                                size="medium">
                                <el-option
                                  v-for="item in cardOptions"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                            </el-select>
                        </dd>
                    </dl>
                    <dl class="dom-must" flex="cross:center">
                        <dt>法人证件号：</dt>
                        <dd>
                            <el-input v-model="address"
                                size="medium"
                                placeholder="请输入法人证件号"
                                clearable></el-input>
                        </dd>
                    </dl>
                    <dl class="dom-must" flex="cross:center">
                        <dt>联系电话：</dt>
                        <dd>
                            <el-input v-model="address"
                                size="medium"
                                placeholder="请输入联系电话"
                                clearable></el-input>
                        </dd>
                    </dl>
                </dd>
            </dl> -->
        </div>
        <!-- <div class="user-bottom">
            <el-button type="primary" size="medium">保存</el-button>
        </div> -->
    </div>
</template>
<script>
    import '../less/user.less';
    import $api from '../tools/api';
    import { cookie } from '../tools/store';
    import { checkIdNumber, verifyTime, onlyNumber, onlyStr } from '../tools/operation';
    import { mapState } from 'vuex';
    export default {
        name: 'user',
        data(){
            return {
                city:'',
                // mer_name:'',
                country:'',
                options: [
                    {
                        value: '北京',
                        label: '北京'
                    },{
                        value: '天津',
                        label: '天津'
                    }
                ],
                cardOptions:[
                    {
                        value: '0',
                        label: '身份证'
                    },{
                        value: '1',
                        label: '驾照'
                    }
                ],
                address:'',
                cardType:''
            }
        },
        created(){
            // setTimeout(() => { this.name = 'http' },2000);
            this.getList();
        },
        computed: {
            ...mapState([
                'user_uuid',
                'mer_name',
                'mobile_no',
                'email',
                'merchant_info',
                'enterprise_info'
            ])
        },
        components: { },
        methods: {
            getList(){
                
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
            },
            changeImg(){

            },
            callBack(res){
                console.log(res)
                this.imgSrc = res;
            },
            link(){
                this.$router.push({
                    path:'/menus/certify'
                });
            }
        },
        destroyed(){

        }
    }
</script>
