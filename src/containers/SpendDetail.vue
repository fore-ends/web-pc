<template>
    <div class="spend-detail">
        <div flex="main:justify" class="table-header-bar">
            <dl flex="cross:center">
                <dt>交易日期：</dt>
                <dd>
                    <el-date-picker
                        v-model="date"
                        type="daterange"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </dd>
            </dl>
            <dl flex="cross:center">
                <dt>交易类型：</dt>
                <dd>
                    <el-select v-model="tran_type" clearable placeholder="请选择">
                        <el-option
                            v-for="item in tranTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </dd>
            </dl>
            <div>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button type="success">导出</el-button>
            </div>
        </div>
        <el-card shadow="never">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                    prop="created_time"
                    label="交易时间"
                    >
                </el-table-column>
                <el-table-column
                    prop="tran_type"
                    label="交易类型"
                    >
                    <template slot-scope="scope">
                        <template v-if="scope.row.tran_type == 1">充值</template>
                        <template v-if="scope.row.tran_type == 2">提现</template>
                        <template v-if="scope.row.tran_type == 3">转账</template>
                        <template v-if="scope.row.tran_type == 4">分账</template>
                        <template v-if="scope.row.tran_type == 5">虚拟账户上账</template>
                        <template v-if="scope.row.tran_type == 6">虚拟账户下账</template>
                        <template v-if="scope.row.tran_type == 7">冻结账户金额</template>
                        <template v-if="scope.row.tran_type == 8">解冻账户金额</template>
                        <template v-if="scope.row.tran_type == 9">消费</template>
                        <template v-if="scope.row.tran_type == 10">退款</template>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="amount"
                    label="账户动账(元)">
                    <template slot-scope="scope">
                        {{scope.row.amount | currencyFormat}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="balance_total"
                    label="可用余额(元)">
                    <template slot-scope="scope">
                        {{scope.row.balance_total | currencyFormat}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="tran_status"
                    label="状态">
                    <template slot-scope="scope">
                        <template v-if="scope.row.tran_status == 1">成功</template>
                        <template v-if="scope.row.tran_status == 0">等待验证</template>
                        <template v-if="scope.row.tran_status == -1">失败</template>
                        <template v-if="scope.row.tran_status == -2">部分成功</template>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="id"
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
                :current-page="page_no"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="page_size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total_size">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import $api from '../tools/api';
    export default {
        name: 'spend-detail',
        data(){
            return {
                mer_uuid:this.$store.state.mer_uuid,
                date:'',
                tran_type:'',
                tranTypeOptions:[
                    {
                        value:1,
                        label:'充值'
                    },{
                        value:2,
                        label:'提现'
                    },{
                        value:3,
                        label:'转账'
                    },{
                        value:4,
                        label:'分账'
                    },{
                        value:5,
                        label:'虚拟账户上账'
                    },{
                        value:6,
                        label:'虚拟账户下账'
                    },{
                        value:7,
                        label:'冻结账户金额'
                    },{
                        value:8,
                        label:'解冻账户金额'
                    },{
                        value:9,
                        label:'消费'
                    },{
                        value:10,
                        label:'退款'
                    }
                ],
                tableData: [],
                //
                page_no:1,
                page_size:10,
                total_size:20,
                realQuery:{
                    start_date:'',
                    end_date:'',
                    tran_type:''
                }
            }
        },
        created(){
            this.getData();
        },
        computed: {
            start_date:function(){
                return this.date[0];
            },
            end_date:function(){
                return this.date[1];
            }
        },
        components: {  },
        methods: {
            getData(){
                let {
                    page_no,
                    page_size
                } = this;
                let {
                    start_date,
                    end_date,
                    tran_type,
                } = this.realQuery;
                let transaction_data = {
                    "id": '1',
                    "tran_uuid": '母交易uuid',
                    "sub_tran_uuid": '每一笔子交易uuid',
                    "tran_type": 1,
                    "source_account_uuid":'23455',
                    "source_account_no": '4444444',
                    "source_user_uuid": '566788',
                    "source_mer_uuid":'67883eerrrg',
                    "money_type":'4',
                    "target_account_uuid": '3273829f',
                    "target_account_no": '236872648',
                    "target_user_uuid": '3293fe',
                    "target_mer_uuid": 'ewej48484',
                    "amount": 235000,
                    "balance_total":34455000,
                    "currency": '$',
                    "tran_status": 1,
                    "accounting_category_code": 3,
                    "created_time": '2018-11-21',
                    "updated_time": '2019-01-01'
                };
                this.tableData.push(transaction_data);
                $api.get(`/bizeff/merchants/${this.mer_uuid}/accounts/statement`,{
                    start_date,
                    end_date,
                    tran_type,
                    page_no,
                    page_size
                }).then(res => {
                    if(res.resp_code == 200){
                        this.tableData = [];
                        this.total_size = res.data.total_size;
                        res.data.transaction_data.map(item => {
                            this.tableData.push(item);
                        });
                    }else{
                        this.$message({
                            type:'error',
                            message:res.resp_message,
                            showClose:true
                        });
                    }
                })
            },
            handleSizeChange(val){
                this.page_size = val;
                this.getData();
            },
            handleCurrentChange(val){
                this.page_no = val;
                this.getData();
            },
            handleClick(scope,value){
                console.log(scope,value);
            },
            //查询
            search(){
                this.realQuery.start_date = this.start_date;
                this.realQuery.end_date = this.end_date;
                this.realQuery.tran_type = this.tran_type;
                this.getData();
            },
            //导出
            output(){
                let {
                    start_date,
                    end_date,
                    tran_type,
                } = this.realQuery;
                $api.get(`bizeff/merchants/${this.mer_uuid}/accounts/${this.accounts_uuid}/export_statement`,{
                    start_date,
                    end_date,
                    tran_type
                }).then(res => {
                    if(res.resp_code == 200){
                        this.$message({
                            message:'ok',
                            type:'error',
                            showClose:true
                        });
                    }
                })
            }
        },
        destroyed(){

        }
    }
</script>
