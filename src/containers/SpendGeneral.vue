<template>
    <div class="spend-general">
        <div flex="main:justify" class="table-header-bar">
            <dl flex="cross:center">
                <dt>月度消费统计：</dt>
                <dd>
                    <el-date-picker
                        v-model="month"
                        type="month"
                        value-format="yyyy-MM"
                        placeholder="选择月">
                    </el-date-picker>
                </dd>
            </dl>
            
            <div>
                <el-button type="primary">查询</el-button>
            </div>
        </div>
        <el-card shadow="never">
            <div class="spend-mount">账单金额：￥8000.00</div>
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                    prop="time1"
                    label="产品名称"
                    >
                </el-table-column>
                <el-table-column
                    prop="mount"
                    label="计费模式"
                    >
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="交易金额(元)">
                </el-table-column>
                <el-table-column
                    prop="time2"
                    label="次数">
                </el-table-column>
                <el-table-column
                    prop="time2"
                    label="消费金额(元)">
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
<style scoped="">
    .spend-mount{
        font-size:24px;
        font-weight: bold;
        padding-bottom:12;
    }
</style>
<script>
    import $api from '../tools/api';
    export default {
        name: 'spend-general',
        data(){
            return {
                month:'2018-11',
                tableData: [
                    {
                        time1:'微信扫码',
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
