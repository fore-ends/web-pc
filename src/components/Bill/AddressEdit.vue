<template>
	<el-dialog
		class="address-edit"
	  	:title="title"
	  	:visible.sync="data.visible"
	  	width="50%"
	  	:before-close="handleClose">
	  	<div class="form-wrap">
            <dl flex="cross:center">
                <dt>收件人姓名：</dt>
                <dd>
                    <el-input type="text" placeholder="请输入收件人姓名" v-model="data.name"></el-input>
                </dd>
            </dl>
            <dl flex="cross:center">
                <dt>电话号码：</dt>
                <dd>
                    <el-input type="text" placeholder="请输入电话号码" v-model="data.number"></el-input>
                </dd>
            </dl>
            <dl flex="cross:center">
                <dt>地址：</dt>
                <dd>
                    <el-input type="text" placeholder="请输入地址" v-model="data.address"></el-input>
                </dd>
            </dl>
            <dl flex="cross:center">
                <dt>邮编：</dt>
                <dd>
                    <el-input type="text" placeholder="请输入邮编" v-model="data.postcode"></el-input>
                </dd>
            </dl>
        </div>
	  	<span slot="footer" class="dialog-footer">
		    <el-button @click="data.visible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogSure">确 定</el-button>
	  	</span>
	</el-dialog>
</template>
<style lang="less" scoped="">
	.address-edit{
		.form-wrap{
            dl{
                &:not(:last-child){
                    margin-bottom:20px;
                }
                dt{
                    width:112px;
                    text-align:right;
                }
                dd{
                    width:262px;
                }

            }
        }
	}
	
</style>
<script>
	export default {
		name:'address-edit',
		props:{
			data:{
				type:Object
			}
		},
		data(){
			return {
				
			}
		},
		computed:{
			title:function(){
				if(this.data.id.toString()){
					return '修改收货地址';
				}
				return '新增收货地址';
			}
		},
		methods:{
			dialogSure(){
                let {
                    name,
                    number,
                    address,
                    postcode,
                    id
                } = this.data;
                //校验
                //测试时模拟
                this.$emit('billBack',this.data);

                this.dialogVisible = false;
            },
            handleClose(done) {
                done();
            }
		}
	}
</script>