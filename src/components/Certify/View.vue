<template>
	<div flex="dir:top cross:center" class="certify-view">
		<div>
			<div class="certify-status">
				<template v-if="status == '11'">
					<div class="icon-box" style="color:#409EFF;">
						<i class="el-icon-lx-info"></i>
					</div>
					<div class="certify-p">
						<h6>您提交的实名认证信息正在审核中...</h6>
						<p>请耐心等待审核结果（最长3个工作日完成审核）</p>
					</div>
				</template>
				<template v-if="status == '12'">
					<div class="icon-box" style="color:#ec2a2a;">
						<i class="el-icon-lx-roundclose"></i>
					</div>
					<div class="certify-p">
						<h6>认证失败</h6>
						<p>请仔细核对提交信息，再<el-button type="text" @click.native="linkSubmit" size="medium">重新提交</el-button>！</p>
					</div>
				</template>
				<template v-if="status == '20'">
					<div class="icon-box" style="color:#52C41A;">
						<i class="el-icon-lx-roundcheck"></i>
					</div>
					<div class="certify-p">
						<h6>认证成功</h6>
					</div>
				</template>
			</div>
			<div class="certify-infor">
				<dl flex="cross:center">
					<dt>企业名称：</dt>
					<dd>{{vdata.ent_name}}</dd>
				</dl>
				<dl flex="cross:center">
					<dt>证件号码：</dt>
					<dd>{{vdata.enterprise_registration_no}}</dd>
				</dl>
				<dl v-if="vdata.time" flex="cross:center">
					<dt>认证时间：</dt>
					<dd>{{vdata.time}}</dd>
				</dl>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	@import "../../less/variables";
	.certify-view{
		.certify-status{
			text-align:center;
			margin-bottom:20px;
			.icon-box{
				margin-bottom:8px;
			}
			i{
				font-size: 68px;
			}
			h6{
				font-size: 18px;
			}
			p{
				font-size: 13px;
			}
		}
		.certify-infor{
			dl{
				margin-bottom: 10px;
				font-size: 15px;
				dd{
					color:@color-text;
				}
			}
		}
	}
	
</style>
<script>
	export default {
		name:'certify-view',
		props:{
			vdata:{
				type:Object
			},
			status:{
				type:String
			},
			time:{
				type:String
			}
		},
		data (){
			return {
				
			}
		},
		methods:{
			linkSubmit(){
				this.$emit('linkSubmit');
			}
		}
	}
</script>