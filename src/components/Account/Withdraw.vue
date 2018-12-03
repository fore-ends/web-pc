<template>
	<div class="account-withdraw">
		<el-card>
			<dl flex="main:justify cross:center" class="withdraw-dl">
				<dt flex="cross:center">
					<span class="withdraw-txt">可提现金额：</span>
					<span class="withdraw-money">￥10000.00</span>
				</dt>
				<dd>
					<el-button type="primary">现在提现</el-button>
				</dd>
			</dl>
		</el-card>
		<div class="withdraw-detail">
			<h6>提现明细</h6>
			<el-table
			    :data="tableData"
			    stripe
			    style="width: 100%">
			    <el-table-column
			      	prop="time1"
			      	label="申请时间"
			      	>
			    </el-table-column>
			    <el-table-column
			      	prop="mount"
			      	label="金额(元)"
			      	>
			    </el-table-column>
			    <el-table-column
			      	prop="status"
			      	label="状态">
			    </el-table-column>
			    <el-table-column
			      	prop="time2"
			      	label="完成时间">
			    </el-table-column>
		  	</el-table>
		  	<div flex="dir:right cross:center" class="withdraw-pagination">
		  		<el-pagination
		  			background
			      	@size-change="handleSizeChange"
			      	@current-change="handleCurrentChange"
			      	:current-page="pageNo"
			      	:page-sizes="[10, 20, 30, 40]"
			      	:page-size="pageSize"
			      	layout="total, sizes, prev, pager, next, jumper"
			      	:total="100">
			    </el-pagination>
		  	</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.account-withdraw{
		.el-card{
			margin-bottom: 20px;
		}
		.withdraw-dl{
			.withdraw-txt{
				font-size: 16px;
			}
			.withdraw-money{
				font-size: 30px;
				font-weight:bold;
			}
		}
		.withdraw-detail{
			h6{
				font-size: 16px;
				margin-bottom: 10px;
			}
		}
		.withdraw-pagination{
			padding-top:16px;
		}
	}
</style>
<script>
	export default {
		name:'account-withdraw',
		data (){
			return {
				tableData: [
					{
						time1:'2016-05-02',
						mount:'100000',
						status:'成功',
						time2:'2018-11-14'

					},{
						time1:'2016-05-02',
						mount:'100000',
						status:'成功',
						time2:'2018-11-14'

					},{
						time1:'2016-05-02',
						mount:'100000',
						status:'成功',
						time2:'2018-11-14'

					},{
						time1:'2016-05-02',
						mount:'100000',
						status:'成功',
						time2:'2018-11-14'

					},{
						time1:'2016-05-02',
						mount:'100000',
						status:'成功',
						time2:'2018-11-14'

					},{
						time1:'2016-05-02',
						mount:'100000',
						status:'成功',
						time2:'2018-11-14'

					}
				],
				pageNo:4,
				pageSize:10,
			}
		},
		methods:{
			handleSizeChange(val){
				console.log(val);
			},
			handleCurrentChange(val){
				console.log(val);
			}
		}
	}
</script>