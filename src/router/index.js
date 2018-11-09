import Vue from 'vue';
import store from '../store';
import Router from 'vue-router';
import {
    logout
} from '../tools/operation';
Vue.use(Router)
import {
    setTitle
} from '../tools/operation';
const Home = resolve => require(['../containers/Home'], resolve);
const Menus = resolve => require(['../containers/Menus'], resolve);
const User = resolve => require(['../containers/User'], resolve);
const Detail = resolve => require(['../containers/Detail'], resolve);
const Login = resolve => require(['../containers/Login'], resolve);
const Safe = resolve => require(['../containers/Safe'], resolve);
const Certify = resolve => require(['../containers/Certify'], resolve);
// import Home from '../containers/Home';
// import Menus from '../containers/Menus';
const title = '平台';
let routes = [{
    path: '/',
    redirect: '/home'
}, {
    path: '/home',
    component: Home,
    meta: {
        title: title,
    },
}, {
    path: '/login',
    component: Login,
    meta: {
        title: '登录'
    }
}, {
    path: '/menus',
    name: 'menus',
    component: Menus,
    children: [{
        path: 'index',
        name: 'index',
        component: Home,
    }, {
        path: 'page',
        name: 'page',
        component: Home,
    }, {
        path: 'center',
        name: 'center',
        component: Home,
    }, {
        path: 'logs',
        name: 'logs',
        component: Home,
    }, {
        path: 'detail',
        name: 'detail',
        component: Detail,
    }, {
        path: 'user',
        name: 'user',
        component: User,
        meta: {
            title: '基本资料'
        }
    }, {
        path: 'certify',
        name: 'certify',
        component: Certify,
        meta: {
            title: '实名认证'
        }
    }, {
        path: 'safe',
        name: 'safe',
        component: Safe,
        meta: {
            title: '安全设置'
        }
    }]
}];
routes.map(route => {
    route.beforeEnter = (to, from, next) => {
        let {
            meta
        } = to;
        let {
            title
        } = meta;
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