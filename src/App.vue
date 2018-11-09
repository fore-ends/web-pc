<template>
    <div id="app" class="app" flex="dir:top">
        <router-view flex-box="1" class="app-wrapper"></router-view>

    </div>
</template>

<script>
    import './less/app.less';
    import './less/icon.less';
    export default {
        name: 'app',
        data(){
            return{

            }
        },
        methods:{

        }
    }
</script>
