<template>
    <div flex="cross:center" class="index-title">
        <span>{{title}}</span>
    </div>
</template>
<script>
    import './index-title.less';
    export default {
        name: 'index-title',
        props:{
            title:{
                type:String,
                default:'标题示例'
            }
        },
        data(){
            return {
                
            }
        },
        created(){

        },
        computed: {
            
        },
        methods: {
            
        },
        destroyed(){

        }
    }
</script>
