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
                <el-button type="success">导出</el-button>
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
    </div>
</template>
<script>
    import $api from '../tools/api';
    export default {
        name: 'spend-detail',
        data(){
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
            }
        },
        created(){
            
        },
        computed: {

        },
        components: {  },
        methods: {
            handleSizeChange(val){
                console.log(val);
            },
            handleCurrentChange(val){
                console.log(val);
            },
            handleClick(scope){
                console.log(scope);
            }
        },
        destroyed(){

        }
    }
</script>
