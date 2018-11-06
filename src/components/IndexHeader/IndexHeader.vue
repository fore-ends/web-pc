<template>
    <div class="header">
        header
    </div>
</template>
<script>

    export default {
        name: 'header-wrap',
        props:['data','items'],
        data(){
            return {
                name:this.data
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
