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
        <div class="mode-wrap">
        	<el-dialog
			  	:title="dialogTitle"
			  	:visible.sync="dialogVisible"
			  	width="50%"
			  	:before-close="handleClose">
			  	<div class="form-wrap">
                    <dl flex="cross:center">
                        <dt>收件人姓名：</dt>
                        <dd>
                            <el-input type="text" placeholder="请输入收件人姓名" v-model="dialogContent.name"></el-input>
                        </dd>
                    </dl>
                    <dl flex="cross:center">
                        <dt>电话号码：</dt>
                        <dd>
                            <el-input type="text" placeholder="请输入电话号码" v-model="dialogContent.number"></el-input>
                        </dd>
                    </dl>
                    <dl flex="cross:center">
                        <dt>地址：</dt>
                        <dd>
                            <el-input type="text" placeholder="请输入地址" v-model="dialogContent.address"></el-input>
                        </dd>
                    </dl>
                    <dl flex="cross:center">
                        <dt>邮编：</dt>
                        <dd>
                            <el-input type="text" placeholder="请输入邮编" v-model="dialogContent.postcode"></el-input>
                        </dd>
                    </dl>
                </div>
			  	<span slot="footer" class="dialog-footer">
				    <el-button @click="dialogVisible = false">取 消</el-button>
				    <el-button type="primary" @click="dialogSure">确 定</el-button>
			  	</span>
			</el-dialog>

        </div>
	</div>
</template>
<script>
    import '../less/bill-address.less';
	export default {
		name:'bill-address',
		data (){
			return {
                dialogTitle:'新增收货地址',
				dialogVisible:false,
                dialogContent:{
                    name:'',
                    number:'',
                    address:'',
                    postcode:'',
                    operation:''
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
				this.dialogTitle = '新增收货地址';
                this.editIndex = 'no';
				this.dialogVisible = true;
			},
			setDefault(scope){
                console.log(scope);
            },
            //编辑
			edit(scope){
                console.log(scope);
                this.dialogTitle = '编辑收货地址';
                for(let i in this.dialogContent){
                    this.dialogContent[i] = scope.row[i];
                }
                this.editIndex = scope.$index;
                this.dialogVisible = true;
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

            dialogSure(){
                let {
                    name,
                    number,
                    address,
                    postcode,
                } = this;
                //校验
                let item = this.dialogContent;
                if(this.editIndex == 'no'){
                    this.tableData.push(item);
                }else{
                    for(let k in item){
                        this.tableData[this.editIndex][k] = item[k];
                    }

                }

                this.dialogVisible = false;
            },
            handleClose(done) {
                done();
            }
		}
	}
</script>
