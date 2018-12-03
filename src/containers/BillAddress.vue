<template>
	<div class="bill-address">
		<div flex="main:justify" class="table-header-bar">
            <div>
                <el-button type="primary" icon="el-icon-plus"
                	@click.native="add">新增</el-button>
            </div>
        </div>
        <el-card shadow="never">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="收件人姓名"
                    >
                </el-table-column>
                <el-table-column
                    prop="number"
                    label="电话号码"
                    >
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
                </el-table-column>
                <el-table-column
                    prop="postcode"
                    label="邮编">
                </el-table-column>
                <el-table-column
                	min-width="100"
                    prop="time2"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text"
                        	@click="setDefault(scope)">设为默认地址</el-button>
                        <el-button type="text"
                        	@click="edit(scope)">编辑</el-button>
                        <el-button type="text"
                        	@click="remove(scope)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <div class="index-p-tit" v-if="tableData.length>=5">最多可保存5个收货地址！</div>
        <!-- 发票管理 -->
        <bill-address-edit :data = "dialogData" @billBack="billBack"></bill-address-edit>
	</div>
</template>
<script>
    import BillAddressEdit  from '../components/Bill/AddressEdit';
    import '../less/bill-address.less';
	export default {
		name:'bill-address',
		data (){
			return {
                dialogData:{
                    visible:false,
                    id:'',
                    name:'',
                    number:'',
                    address:'',
                    postcode:''
                },
				tableData:[
                    {
						name:'宋金荣',
						number:'138****1122',
						address:'北京市上地********108号',
						postcode:'157100',
						operation:''
                    },{
						name:'王欢',
						number:'138****1122',
						address:'北京市上地********108号',
						postcode:'157100',
						operation:''
                    },{
						name:'李旭晨',
						number:'138****1122',
						address:'北京市上地********108号',
						postcode:'157100',
						operation:''
                    },{
						name:'王春廷',
						number:'138****1122',
						address:'北京市上地********108号',
						postcode:'157100',
						operation:''
                    },{
						name:'王春廷',
						number:'138****1122',
						address:'北京市上地********108号',
						postcode:'157100',
						operation:''
                    }
                ]
			}
		},
        components:{
            BillAddressEdit
        },
		methods:{
			//新增
			add(){
				let leng = this.tableData.length;
				if(leng && leng >=5 ){
					this.$message({
						type:'warning',
						showClose:true,
						message:'最多可保存5个收货地址！'
					});
					return false;
				}
                this.dialogData.name = '';
                this.dialogData.number = '';
                this.dialogData.address = '';
                this.dialogData.postcode = '';
				this.dialogData.visible = true;
			},
			setDefault(scope){
                console.log(scope);
            },
            //编辑
			edit(scope){
                
                for(let i in scope.row){
                    this.dialogData[i] = scope.row[i];
                }
                this.dialogData.id = scope.$index;
                this.dialogData.visible = true;
            },
            //删除
			remove(scope){
                console.log(scope);
                this.$confirm('删除后不能恢复, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.tableData.splice(scope.$index, 1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {});

            },

            billBack(res){
                console.log(res)
                this.dialogData.visible = false;
            }
		}
	}
</script>
