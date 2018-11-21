<template>
	<div class="account-recharge">
		<el-tabs type="">
		  	<el-tab-pane>
			    <span slot="label"><i class="el-icon-lx-vipcard"></i> 网银</span>
			    <div class="recharge-wy">
			    	<dl flex="cross:center" class="wy-item">
			    		<dt>充值金额：</dt>
			    		<dd>
			    			<el-input type="text"
			    				placeholder="请输入金额"
			    				clearable
			    				v-model="amount"
			    				@keyup.native="amount = onlyNumber(amount)"
                        		@afterpaste="amount = onlyNumber(amount)"></el-input>
			    		</dd>
			    		<dd>&nbsp;元</dd>
			    	</dl>
			    	<div class="wy-item">
			    		<p>选择银行：</p>
			    		<ul flex>
			    			<li v-for="item in items">
			    				<el-card>
			    					{{item.name}}
			    				</el-card>
			    			</li>
			    		</ul>
			    	</div>
			    	<div class="recharge-wy-btn">
			    		<el-button type="primary">充值</el-button>
			    		<el-button @click.native="back">取消</el-button>
			    	</div>
			    </div>
		  	</el-tab-pane>
		  	<el-tab-pane label="线下转账">
		  		<el-steps direction="vertical" :active="1">
				    <el-step v-for="item in stepItems"
				    	:title="item.title"
				    	:description="item.description"></el-step>
				</el-steps>
		  	</el-tab-pane>
		</el-tabs>
	</div>
</template>
<style lang="less" scoped>
	.account-recharge{
		.recharge-wy{
			.wy-item{
				margin-bottom: 20px;
				dt,p{
					width:76px;
				}
			}
			.recharge-wy-btn{
				padding-left:76px;
				button:first-child{
					margin-right: 20px;
				}
			}
		}
		
	}
</style>
<script>
	import { onlyNumber } from '../../tools/operation';
	export default {
		name:'account-recharge',
		data(){
			return {
				amount:'',
				items:[
					{
						name:'中国银行'
					},{
						name:'中国人民银行'
					},{
						name:'中国建设银行'
					},{
						name:'中国工商银行'
					},{
						name:'中国农业银行'
					},{
						name:'浦发银行'
					}
				],
				stepItems:[
					{
						title:'请您 打款前务必 在本页面 填写 正确有效的付款银行账号户名。若预留的户名与实际打款的银行账号户名不一致，将导致无法充值到账。',
						description:''
					},{
						title:'打款至您的专属收款账户，账户在收到银行汇款后将自动匹配到您的云账户，线下汇款的款项会自动充值到账户中。',
						description:'转账途径 网上银行/手机银行/电汇/支票/北京同城柜台现金存款<br>收款户名 xxxxxxxxxxx<br>收款账号 xxxxxxxxxxxxxxxx<br>收款银行 xxxxxxxxxxxxxxxxxxxx'
					}
				]
			}
		},
		methods:{
			back(){
				this.$router.push({
					path:'/menus/account-general'
				})
			},
			onlyNumber(val){
                console.log(onlyNumber(val));
                return onlyNumber(val).replace(/\D/g,'').replace(/...(?!$)/g, '$& ');
            }
		}
	}
</script>