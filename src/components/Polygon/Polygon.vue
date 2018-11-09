<template>
    <div class="polygon-wrap"
        :style="{width:wrapLeng+'px'}">
        <div class="polygon-m"
            :style="{
                width:bigLeng+'px',
                height:sideLeng+'px',
                transform:`translateX(-${moveLeng}px)`
            }">
            <div class="polygon-l">
                <div flex="main:center cross:center" class="polygon-r">
                    <img ref="imgs" :src="image" :style="{width:imgWidth,height:imgHeight}">
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    .polygon-wrap{
        overflow: hidden;
        .polygon-m{
             div{
                width:100%;
                height:100%;
                overflow:hidden;
            }
            .polygon-l{
                transform: rotate(240deg);
            }
            .polygon-r{
                transform: rotate(60deg);
            }
            img{
                transform: rotate(60deg);
            }
        }
    }
    
</style>
<script>
    import EventBus from '../../tools/event-bus';
    export default {
        name: 'polygon-wrap',
        props:{
            sideLeng:{
                type:Number,
                default:100
            },
            image:{
                type:String,
                default:'http://tse3.mm.bing.net/th?id=OIP.xqiF1g7jbRKpCU7NQrZB-AHaLe&w=130&h=202&c=7&o=5&dpr=2&pid=1.7'
            },
            update:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                imgWidth:'100%',
                imgHeight:'auto',
                refreshImg:true//true:本次需要更新
            }
        },
        created(){
            if(!this.update){
                //不需要强制刷新
                this.getImg();
            }
            
        },
        computed: {
            bigLeng:function(){
                return (this.sideLeng*Math.sqrt(3)).toFixed();
            },
            wrapLeng:function(){
                return (this.sideLeng*Math.sqrt(3)*2/3).toFixed();
            },
            moveLeng:function(){
                return (this.sideLeng*Math.sqrt(3)/6).toFixed();
            }
        },
        methods: {
            getImg(){
                if(EventBus.polygonObj){
                    this.imgWidth = EventBus.polygonObj.imgWidth;
                    this.imgHeight = EventBus.polygonObj.imgHeight;
                    this.refreshImg = false;
                }
            },
            setImg(){
                if(!this.refreshImg){
                    return false;
                }
                const that = this;
                this.$refs.imgs.onload = function(){
                    let width = this.width;
                    let height = this.height;
                    let r1 = width/height;
                    let r2 = that.wrapLeng/that.sideLeng;
                    if(r1 <= r2){
                        that.imgWidth = that.wrapLeng+'px';
                        that.imgHeight = 'auto';
                    }else{
                        that.imgWidth = 'auto';
                        that.imgHeight = that.sideLeng+'px';
                    }
                    let polygonObj = {
                        imgWidth:that.imgWidth,
                        imgHeight:that.imgHeight
                    }
                    //存储
                    EventBus.polygonObj = polygonObj;
                }
            }
        },
        mounted(){
            this.setImg();
        },
        destroyed(){

        }
    }
</script>
