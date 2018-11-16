<template>
    <div class="certify-input">
        <div class="input-base">
            <h3>请填写您的企业信息</h3>
            <div>
                <dl flex="cross:center" class="dom-must">
                    <dt>企业名称：</dt>
                    <dd>
                        <el-input v-model="businessName"
                            size="medium"
                            placeholder="请输入企业名称"
                            clearable></el-input>
                    </dd>
                </dl>
                <dl flex="cross:center" class="dom-must">
                    <dt>证件类型：</dt>
                    <dd>
                        <el-select placeholder="" 
                            class="self-select"
                            v-model="cardType"
                            size="medium">
                            <el-option
                                v-for="item in cardTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </dd>
                </dl>
                <dl flex="cross:center" class="dom-must">
                    <dt>证件号：</dt>
                    <dd>
                        <el-input v-model="businessName"
                            size="medium"
                            placeholder="请输入证件号"
                            clearable></el-input>
                    </dd>
                </dl>
                <dl flex="cross:center" class="dom-must">
                    <dt>开户行：</dt>
                    <dd>
                        <el-input v-model="businessName"
                            size="medium"
                            placeholder="请输入开户行"
                            clearable></el-input>
                    </dd>
                </dl>
                <dl flex="cross:center" class="dom-must">
                    <dt>账户名称：</dt>
                    <dd>
                        <el-input v-model="businessName"
                            size="medium"
                            placeholder="请输入账户名称"
                            clearable></el-input>
                    </dd>
                </dl>
                <dl flex="cross:center" class="dom-must">
                    <dt>账户号：</dt>
                    <dd>
                        <el-input v-model="businessName"
                            size="medium"
                            placeholder="请输入账户号"
                            clearable></el-input>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="input-attachment">
            <h3>请上传实名认证附件</h3>
            <div flex class="attachment-upload">
                <dl v-for="item in attachmentItems" class="dom-must">
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
        .input-base{
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
                    .self-select{
                        width:100%;
                    }
                }
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
<script>
    import $api from '../../tools/api';
    import { cookie } from '../../tools/store';
    import { checkIdNumber, verifyTime, onlyNumber, onlyStr } from '../../tools/operation';
    export default {
        name: 'certify-input',
        data(){
            return {
                businessName:'',
                cardType:'0',
                cardTypeOptions: [
                    {
                        value: '0',
                        label: '三证合一'
                    },{
                        value: '1',
                        label: '营业执照'
                    }
                ],
                attachmentItems:[
                    {
                        title:'法定代表人证件正面',
                        desc:'支持扩展名：.rar .zip .doc .docx .pdf .jpg',
                        success:(file, fileList) =>{
                            console.log(file, fileList)
                        },
                        error:(file, fileList) =>{
                            console.log(file, fileList)
                        }

                    },{
                        title:' 法定代表人证件反面',
                        desc:'支持扩展名：.rar .zip .doc .docx .pdf .jpg',
                        success:(file, fileList) =>{
                            console.log(file, fileList)
                        },
                        error:(file, fileList) =>{
                            console.log(file, fileList)
                        }

                    },{
                        title:' 营业执照',
                        desc:'支持扩展名：.rar .zip .doc .docx .pdf .jpg',
                        success:(file, fileList) =>{
                            console.log(file, fileList)
                        },
                        error:(file, fileList) =>{
                            console.log(file, fileList)
                        }

                    }
                ],
                uploadAccept:'image/gif, image/jpeg,application/pdf,application/msword, application/vnd.ms-works,application/vnd.openxmlformats-officedocument.wordprocessingml.document,aplication/zip'
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
