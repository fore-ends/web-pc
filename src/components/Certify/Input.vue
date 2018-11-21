<template>
    <div class="certify-input">
        <div class="input-base">
            <h3>请填写您的企业信息</h3>
            <div>
                <div class="input-list">
                    <dl flex="cross:center" class="dom-must">
                        <dt>企业名称：</dt>
                        <dd>
                            <el-input v-model="ent_name"
                                size="medium"
                                placeholder="请输入企业名称"
                                maxlength="50"
                                clearable>
                            </el-input>
                        </dd>
                    </dl>
                    <dl flex="cross:center" class="dom-must">
                        <dt>企业证件：</dt>
                        <dd>
                            <el-input v-model="enterprise_registration_no"
                                size="medium"
                                placeholder="请输入证件号码"
                                class="input-with-select"
                                maxlength="30"
                                clearable>
                                    <el-select placeholder="" 
                                    class="in-input"
                                    v-model="enterprise_card_type"
                                    slot="prepend"
                                    size="medium">
                                    <el-option
                                        v-for="item in cardTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-input>
                        </dd>
                    </dl>
                </div>
                <div class="input-list">
                    <dl flex="cross:center" class="dom-must">
                        <dt>开户行：</dt>
                        <dd>
                            <el-input v-model="opening_bank"
                                size="medium"
                                placeholder="请输入开户行"
                                maxlength="50"
                                clearable></el-input>
                        </dd>
                    </dl>
                    <dl flex="cross:center" class="dom-must">
                        <dt>账户名称：</dt>
                        <dd>
                            <el-input v-model="account_name"
                                size="medium"
                                placeholder="请输入账户名称"
                                maxlength="50"
                                clearable></el-input>
                        </dd>
                    </dl>
                    <dl flex="cross:center" class="dom-must">
                        <dt>账户号：</dt>
                        <dd>
                            <el-input
                                size="medium"
                                placeholder="请输入账户号"
                                maxlength="30"
                                v-model="account_number"
                                @keyup.native="account_number = formatBankNumber(account_number)"
                                clearable></el-input>
                        </dd>
                    </dl>
                </div>
                <div class="input-list">
                    <dl flex="cross:center" class="dom-must">
                        <dt>法人姓名：</dt>
                        <dd>
                            <el-input v-model="corporation_name"
                                size="medium"
                                placeholder="请输入法人姓名"
                                maxlength="30"
                                clearable></el-input>
                        </dd>
                    </dl>
                    <dl flex="cross:center" class="dom-must">
                        <dt>法人证件：</dt>
                        <dd>
                            <el-input v-model="corporation_id_no"
                                size="medium"
                                placeholder="请输入法人证件号码"
                                class="input-with-select"
                                maxlength="20"
                                clearable>
                                    <el-select placeholder="" 
                                    class="in-input"
                                    v-model="corporation_id_type"
                                    slot="prepend"
                                    size="medium">
                                    <el-option
                                        v-for="item in cardOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-input>
                        </dd>
                    </dl>
                </div>
                <div class="input-list">
                    <dl flex="cross:center" class="dom-must">
                        <dt>联系电话：</dt>
                        <dd>
                            <el-input v-model="mobile_no"
                                size="medium"
                                placeholder="请输入联系电话"
                                maxlength="20"
                                clearable></el-input>
                        </dd>
                    </dl>
                    <dl class="dom-must" flex="cross:center">
                        <dt>所在区域：</dt>
                        <dd flex="main:justify">
                            <el-select class="location-select" v-model="province" placeholder="请选择省份"
                            @change="change"
                                size="medium">
                                <el-option
                                  v-for="item in provinceOptions"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select class="location-select" v-model="city" placeholder="请选择城市"
                                size="medium">
                                <el-option
                                  v-for="item in cityOptions"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select class="location-select" v-model="county" placeholder="请选择区县"
                                size="medium">
                                <el-option
                                  v-for="item in countyOptions"
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
                            <el-input v-model="business_address"
                                size="medium"
                                placeholder="请输入营业地址"
                                clearable></el-input>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="input-attachment">
            <h3>请上传实名认证附件</h3>
            <div flex class="attachment-upload">
                <dl v-for="(item,key) in attachmentItems" class="dom-must">
                    <dt>{{item.title}}</dt>
                    <dd>
                        <el-upload
                            class="upload-demo"
                            drag
                            with-credentials
                            :limit="1"
                            :accept="uploadAccept"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-success="item.success"
                            :on-error="item.error"
                            multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖拽到这里上传，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg</div>
                        </el-upload>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="input-bottom">
            <el-button type="primary" size="medium">提交认证</el-button>
            <el-button size="medium">取消</el-button>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "../../less/variables";
    .certify-input{
        padding:0 20px;
        // border-bottom:1px dashed @color-split;
        h3{
            margin-bottom: 16px;
        }
        .in-input{
            width:112px;

        }
        .input-base{
            .input-list:not(:last-child){
                padding-bottom: 20px;
                border-bottom:1px dashed @color-split;
                margin-bottom: 16px;
            }
            dl{
                &:not(:last-child){
                    margin-bottom: 16px;
                }
                dt{
                    width:167px;
                    text-align:right;
                }
                dd{
                    min-width:269px;
                    width:412px;
                    .self-select{
                        width:100%;
                    }
                }
            }
            .location-select{
                width:30%;
            }
        }
        .input-attachment{
            padding-top:20px;
            margin-bottom:16px;
            .attachment-upload{
                padding:0 20px;
                flex-wrap:wrap;
                dl{
                    
                    margin-bottom: 20px;
                    &:not(:last-child){
                        margin-right:38px;
                    }
                    dt{
                        margin-bottom:8px;
                    }
                }
            }
        }
        .input-bottom{
            // padding-left:20px;
            button:first-child{
                margin-right: 60px;
            }
        }
    }
</style>
<style>
    /*.el-select .el-input {
        width: 130px;
    }*/
    .input-with-select .el-input-group__prepend{
        background-color: #fff;
    }
</style>
<script>
    import $api from '../../tools/api';
    import { cookie } from '../../tools/store';
    import { checkIdNumber, verifyTime, onlyNumber, onlyStr, formatBankNumber } from '../../tools/operation';
    import pcaCode from '../../data/pca-code';
    export default {
        name: 'certify-input',
        data(){
            return {
                ent_name:'',
                enterprise_card_type:'0',//企业证件类型
                cardTypeOptions: [
                    {
                        value: '0',
                        label: '三证合一'
                    },{
                        value: '1',
                        label: '营业执照'
                    }
                ],
                enterprise_registration_no:'',//证件号码
                opening_bank:'',//开户行
                account_name:'',//账户名称
                account_number:'',//账户号
                corporation_name:'',//法人姓名
                corporation_id_type:'',//法人证件类型,
                corporation_id_no:'',//法人证件号码,
                mobile_no:'',//联系电话
                business_area:'',//所在区域
                business_address:'',//营业地址
                province:'',
                provinceName:'',
                city:'',
                cityName:'',
                county:'',
                provinceOptions: this.dealKey(pcaCode),
                cardOptions:[
                    {
                        value: '0',
                        label: '身份证'
                    },{
                        value: '1',
                        label: '驾照'
                    }
                ],
                attachmentItems:{
                    enterprise_card_file:{
                        title:'法定代表人证件正面',
                        desc:'支持扩展名：.rar .zip .doc .docx .pdf .jpg',
                        success:(file, fileList) =>{
                            console.log(file, fileList)
                        },
                        error:(file, fileList) =>{
                            console.log(file, fileList)
                        }

                    },
                    corporation_id_face_file:{
                        title:' 法定代表人证件反面',
                        desc:'支持扩展名：.rar .zip .doc .docx .pdf .jpg',
                        success:(file, fileList) =>{
                            console.log(file, fileList)
                        },
                        error:(file, fileList) =>{
                            console.log(file, fileList)
                        }

                    },
                    corporation_id_back_file:{
                        title:' 营业执照',
                        desc:'支持扩展名：.rar .zip .doc .docx .pdf .jpg',
                        success:(file, fileList) =>{
                            console.log(file, fileList)
                        },
                        error:(file, fileList) =>{
                            console.log(file, fileList)
                        }

                    }
                },
                uploadAccept:'image/gif, image/jpeg,application/pdf,application/msword, application/vnd.ms-works,application/vnd.openxmlformats-officedocument.wordprocessingml.document,aplication/zip'
            }
        },
        created(){
            // setTimeout(() => { this.name = 'http' },2000);
            // this.getList();
            // alert()
        },
        computed: {
            cityOptions:function(){
                for(let i = 0;i<this.provinceOptions.length;i++){
                    if(this.provinceOptions[i].value == this.province){
                        this.provinceName = this.provinceOptions[i].label;
                        let options = this.provinceOptions[i].children;
                        this.city = this.dealKey(options)[0].value;
                        return this.dealKey(options);
                    }
                }
                return [];
            },
            countyOptions:function(){
                for(let i = 0;i<this.cityOptions.length;i++){
                    if(this.cityOptions[i].value == this.city){
                        this.cityName = this.cityOptions[i].label;
                        let options = this.cityOptions[i].children;
                        this.county = this.dealKey(options)[0].value;
                        return this.dealKey(options);
                    }
                }
                return [];
            },
            countyName:function(){
                for(let i=0;i<this.countyOptions.length;i++){
                    if(this.countyOptions[i].value == this.county){
                        return this.countyOptions[i].label;
                    }
                }
                return '';
            }
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
            },
            dealKey(options){
                let arr = [];
                console.log(options)
                options.forEach(({code,name,children}) =>{
                    arr.push({
                        value:code,
                        label:name,
                        children
                    });
                });
                return arr;
            },
            change(res){
                console.log(res);
            },
            //格式化 银行卡
            formatBankNumber(input){
                return formatBankNumber(input);
            }
        },
        destroyed(){

        }
    }
</script>
