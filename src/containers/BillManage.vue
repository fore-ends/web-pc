<template>
	<div class="bill-manage">
		<el-card class="bill-header">
			<p>1.本月产生的后付费业务月结算单在下个月二号以后才可以索取发票。</p>
			<p>2. 您的发票申请将于15个工作日内完成审批及开具，发票开具完成后3个工作日寄出。收到发票包裹后，如有问题请及时拒收。</p>
		</el-card>
		<div flex="main:justify" class="bill-card">
			<el-card  :body-style="{ padding: '0px' }">
				<dl flex="main:justify cross:center" class="card-head">
					<dt>可开票金额</dt>
					<dd>
						<el-button type="text" size="medium" style="visibility:hidden;">t</el-button>
					</dd>
				</dl>
				<div flex="main:justify cross:center" class="card-content">
					<div class="money-font">￥0.00</div>
					<div>
						<el-button type="primary">申请开票</el-button>
					</div>
				</div>
			</el-card>
			<el-card  :body-style="{ padding: '0px' }">
				<dl flex="main:justify cross:center" class="card-head">
					<dt>发票抬头</dt>
					<dd>
						<el-button type="text" size="medium" @click="editBillName">修改</el-button>
					</dd>
				</dl>
				<div flex="main:center cross:center" class="card-content">
                    <span v-if="billName">{{billName}}</span>
					<span v-else>
                        您还未填写发票信息，<el-button type="text" size="medium" @click="editBillName">现在填写</el-button>！               
                    </span>
                    
				</div>
			</el-card>
			<el-card  :body-style="{ padding: '0px' }">
				<dl flex="main:justify cross:center" class="card-head">
					<dt>默认邮寄地址</dt>
					<dd>
						<router-link to="/menus/bill-address">
							<el-button type="text" size="medium">管理地址</el-button>
						</router-link>
					</dd>
				</dl>
				<div flex="main:center cross:center" class="card-content">
					您还未填写邮寄地址，<el-button type="text" size="medium" @click="addressEdit">现在填写</el-button>！
				</div>
			</el-card>
		</div>
		<div flex="main:justify" class="table-header-bar">
            <dl flex="cross:center">
                <dt>交易日期：</dt>
                <dd>
                    <el-date-picker
                        v-model="date"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </dd>
            </dl>
            <dl flex="cross:center">
                <dt>交易类型：</dt>
                <dd>
                    <el-select v-model="style" clearable placeholder="请选择">
                        <el-option
                            v-for="item in styleOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </dd>
            </dl>
            <div>
                <el-button type="primary">查询</el-button>
            </div>
        </div>
        <el-card shadow="never">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                    prop="time1"
                    label="交易时间"
                    >
                </el-table-column>
                <el-table-column
                    prop="mount"
                    label="交易类型"
                    >
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="账户动账(元)">
                </el-table-column>
                <el-table-column
                    prop="time2"
                    label="可用余额(元)">
                </el-table-column>
                <el-table-column
                    prop="time2"
                    label="状态">
                </el-table-column>
                <el-table-column
                    prop="time2"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope)" type="text">申请退款</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <div flex="dir:right cross:center" class="pagination-wrap">
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
        <!-- 发票抬头 -->
        <el-dialog
            class="bill-head"
            title="发票抬头"
            :visible.sync="visible"
            width="38%"
            :before-close="handleClose">
            <div class="form-wrap">
                <el-input type="text" size="large" placeholder="请输入内容" v-model="billName2"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="dialogSure">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 发票管理 -->
        <bill-address-edit :data = "dialogData" @billBack="billBack"></bill-address-edit>
	</div>
</template>
<script>
	import '../less/bill-manage.less';
    import BillAddressEdit from '../components/Bill/AddressEdit';
	export default {
		name:'bill-manage',
		data (){
			return {
				date:'',
                style:'',
                styleOptions:[
                    {
                        value:'0',
                        label:'充值'
                    },{
                        value:'1',
                        label:'提现'
                    },{
                        value:'2',
                        label:'消费'
                    },{
                        value:'3',
                        label:'退款'
                    },{
                        value:'4',
                        label:'冻结'
                    },{
                        value:'5',
                        label:'解冻'
                    }
                ],
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
                pageNo:1,
                pageSize:10,
                visible:false,
                billName:'',
                billName2:'',
                dialogData:{
                    visible:false,
                    id:'',
                    name:'',
                    number:'',
                    address:'',
                    postcode:''
                }
			}
		},
        components:{
            BillAddressEdit
        },
		methods:{
			handleSizeChange(val){
                console.log(val);
            },
            handleCurrentChange(val){
                console.log(val);
            },
            handleClick(scope){
                console.log(scope);
            },
            //填写发票地址
            addressEdit(){
                this.dialogData.visible = true;
                this.dialogData.name = '';
                this.dialogData.number = '';
                this.dialogData.address = '';
                this.dialogData.postcode = '';
            },
            billBack(res){
                console.log(res)
                this.dialogData.visible = false;
            },
            //抬头修改
            editBillName(){
                this.billName2 = this.billName;
                this.visible = true;
            },
            handleClose(done){
                this.billName2 = '';
                done();
            },
            dialogSure(){
                if(this.billName2){
                    this.billName = this.billName2;
                    this.visible = false;
                }
            }
		}
	}
</script>