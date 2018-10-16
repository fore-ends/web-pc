import Vue from 'vue';
import store from '../store';
import Router from 'vue-router';
import {logout} from '../tools/operation';
Vue.use(Router)
import {setTitle} from '../tools/operation';
const Home = resolve => require(['../containers/Home'], resolve);
const Menus = resolve => require(['../containers/Menus'], resolve);
// import Home from '../containers/Home';
// import Menus from '../containers/Menus';
const title = '开放平台';
let routes = [
    {
        path:'/',
        redirect:'/home'
    },{
        path:'/home',
        component:Home,
        meta: {
            title: title,
        },
    },{
        path:'/menus',
        name:'menus',
        component:Menus,
        children:[
            {
                path:'index',
                name:'index',
                component:Home,
            },{
                path:'page',
                name:'page',
                component:Home,
            },{
                path:'center',
                name:'center',
                component:Home,
            },{
                path:'logs',
                name:'logs',
                component:Home,
            },{
                path:'detail',
                name:'detail',
                component:Home,
            },{
                path:'user',
                name:'user',
                component:Home,
            }
        ]
    }
];
routes.map(route => {
    route.beforeEnter = (to, from, next)=>{
        let {meta} = to;
        let {title} = meta;
        setTitle(title);
        next();
    };
});
routes.push({
    path: '*',
    redirect: '/home'
});
export default new Router({
    mode: 'history',
    routes
})