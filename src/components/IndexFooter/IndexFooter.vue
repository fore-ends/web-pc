<template>
    <div class="footer">
        <input type="text" v-model="inputs">
        <p>{{inputs}}</p>
        <div>
            <dl v-for="item in lists">
                <dt>{{item.name}}</dt>
            </dl>
        </div>
        <div>
            <button @click="click">click</button>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'footer-wrap',
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
