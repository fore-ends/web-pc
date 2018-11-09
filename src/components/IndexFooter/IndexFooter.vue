<template>
    <div class="index-footer">footer</div>
</template>
<script>
    import './index-footer.less';
    export default {
        name: 'index-footer',
        // props:['data','items'],
        data(){
            return {
                name:'2222',
                items:[]
            }
        },
        created(){

        },
        computed: {
            inputs:{
                get:function(){
                    console.log(this.data)
                    return this.data;
                },
                set:function(newValue){

                    console.log(newValue);
                    // return newValue;
                    this.inputVal = newValue;
                    return newValue;
                }
            },
            lists:function(){
                let items = [];
                this.items.map(item =>{
                    items.push(item);
                });
                return items;
            }
        },
        methods: {
            click(){
                console.log(this.inputVal);
            }
        },
        destroyed(){

        }
    }
</script>
