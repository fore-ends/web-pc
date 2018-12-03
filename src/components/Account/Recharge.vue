<template>
	<div class="account-recharge">
		<el-tabs type="" v-model="activeName" @tab-click="handleClick">
		  	<el-tab-pane name="wy">
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
		  	<el-tab-pane label="线下转账" name="offline">
		  		<!-- <el-steps direction="vertical" :active="1">
				    <el-step v-for="item in stepItems"
				    	:title="item.title"
				    	:description="item.description"></el-step>
				</el-steps> -->
				<div class="recharge-offline">
					<div flex class="offline-step">
						<div flex-box="0" class="step-left">
							<span class="step-o" style="border-color:#7CCF5B"></span>
							<span class="step-i"></span>
						</div>
						<div flex-box="1" class="step-right">
							<h6>请您 打款前务必 在本页面 填写 正确有效的付款银行账号户名。若预留的户名与实际打款的银行账号户名不一致，将导致无法充值到账。</h6>
						</div>
					</div>
					<div flex class="offline-step">
						<div flex-box="0" class="step-left">
							<span class="step-o"></span>
							<span class="step-i"></span>
						</div>
						<div flex-box="1" class="step-right">
							<h6>打款至您的专属收款账户，账户在收到银行汇款后将自动匹配到您的云账户，线下汇款的款项会自动充值到账户中。</h6>
							<p>转账途径 网上银行/手机银行/电汇/支票/北京同城柜台现金存款<br>收款户名 xxxxxxxxxxx<br>	收款账号 xxxxxxxxxxxxxxxx<br>收款银行 xxxxxxxxxxxxxxxxxxxx</p>
						</div>
					</div>
					<div flex class="offline-step">
						<div flex-box="0" class="step-left">
							<span class="step-o" style="border-color:#409EFF"></span>
							<span class="step-i"></span>
						</div>
						<div flex-box="1" class="step-right">
							<h6>充值结果反馈</h6>
<p>对公转账（线下汇款）到账时间一般为一天以内，具体到账时间依赖于银行系统，请您耐心等待，谢谢！</p>
							<p>我们将通过短信、邮件、站内信的方式向您反馈充值结果，您也可以前往线下汇款查询页面查看您的线下汇款充值进度。</p>
						</div>
					</div>
				</div>

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
		.recharge-offline{
			.offline-step{
				&:not(:last-child){
					.step-right{
						padding-bottom: 25px;
					}
				}
				.step-left{
					width:12px;
					position: relative;
					span{
						display: block;
						position: absolute;
						top:0;
						&.step-o{
							width: 12px;
							height:12px;
							left:0;
							z-index: 9;
							background-color:#fff;
							border:2px solid #ec2a2a;
							border-radius:50%;
						}
						&.step-i{
							width:1px;
							height:100%;
							background-color: #d8d8d8;
							left: 50%;
							transform: translateX(-50%);
							z-index: 7;
						}
					}

				}
				&:last-child{
					.step-left{
						span{
							&.step-i{
								display: none;
							}
						}
					}	
				}
				.step-right{
					padding-left:16px;
					h6{
						font-size: 14px;
					}
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
				activeName:this.$route.query.activeName || 'wy',
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
            },
            handleClick(tab){
				this.$router.replace({
					path:'/menus/account-general',
					query:{
						type:'recharge',
						activeName:tab.name
					}
				});
            }
		}
	}
</script>