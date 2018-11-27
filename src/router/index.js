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
const Demo = resolve => require(['../containers/Demo'], resolve);
const Menus = resolve => require(['../containers/Menus'], resolve);
const User = resolve => require(['../containers/User'], resolve);
const Detail = resolve => require(['../containers/Detail'], resolve);
const Login = resolve => require(['../containers/Login'], resolve);
const Safe = resolve => require(['../containers/Safe'], resolve);
const Certify = resolve => require(['../containers/Certify'], resolve);
const AccountGeneral = resolve => require(['../containers/AccountGeneral'], resolve);
const MoneyDetail = resolve => require(['../containers/MoneyDetail'], resolve);
const SpendGeneral = resolve => require(['../containers/SpendGeneral'], resolve);
const SpendDetail = resolve => require(['../containers/SpendDetail'], resolve);
const BillManage = resolve => require(['../containers/BillManage'], resolve);
const BillAddress = resolve => require(['../containers/BillAddress'], resolve);
const CloudSettlement = resolve => require(['../containers/CloudSettlement'], resolve);
const CloudSigned = resolve => require(['../containers/CloudSigned'], resolve);
const CloudFinance = resolve => require(['../containers/CloudFinance'], resolve);
const Api = resolve => require(['../containers/Home'], resolve);
const Help = resolve => require(['../containers/Home'], resolve);
const Manual = resolve => require(['../containers/Home'], resolve);

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
        title: '首页',
        withoutLogin: true
    }
}, {
    path: '/demo',
    component: Demo,
    meta: {
        title: title,
    },
}, {
    path: '/login',
    component: Login,
    meta: {
        title: '登录',
        withoutLogin: true
    }
}, {
    path: '/api',
    component: Api,
    meta: {
        title: 'API文档',
        withoutLogin: true
    }
}, {
    path: '/help',
    component: Help,
    meta: {
        title: '帮助中心',
        withoutLogin: true
    }
}, {
    path: '/manual',
    component: Manual,
    meta: {
        title: '操作手册',
        withoutLogin: true
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
            title: '基本资料',
            belong: 'accountMs'
        }
    }, {
        path: 'certify',
        name: 'certify',
        component: Certify,
        meta: {
            title: '实名认证',
            belong: 'accountMs'
        }
    }, {
        path: 'safe',
        name: 'safe',
        component: Safe,
        meta: {
            title: '安全设置',
            belong: 'accountMs'
        }
    }, {
        path: 'account-general',
        name: 'account-general',
        component: AccountGeneral,
        meta: {
            title: '账户总览',
            belong: 'costCenter'
        }
    }, {
        path: 'money-detail',
        name: 'money-detail',
        component: MoneyDetail,
        meta: {
            title: '收支明细',
            belong: 'costCenter'
        }
    }, {
        path: 'spend-general',
        name: 'spend-general',
        component: SpendGeneral,
        meta: {
            title: '消费总览',
            belong: 'costCenter'
        }
    }, {
        path: 'spend-detail',
        name: 'spend-detail',
        component: SpendDetail,
        meta: {
            title: '消费明细',
            belong: 'costCenter'
        }
    }, {
        path: 'bill-manage',
        name: 'bill-manage',
        component: BillManage,
        meta: {
            title: '发票管理',
            belong: 'costCenter'
        }
    }, {
        path: 'bill-address',
        name: 'bill-address',
        component: BillAddress,
        meta: {
            title: '发票收货地址管理',
            belong: 'costCenter'
        }
    }, {
        path: 'cloud-settlement',
        name: 'cloud-settlement',
        component: CloudSettlement,
        meta: {
            title: '云结算',
            belong: 'pAndS'
        }
    }, {
        path: 'cloud-signed',
        name: 'cloud-signed',
        component: CloudSigned,
        meta: {
            title: '云签约',
            belong: 'pAndS'
        }
    }, {
        path: 'cloud-finance',
        name: 'cloud-finance',
        component: CloudFinance,
        meta: {
            title: '云财务',
            belong: 'pAndS'
        }
    }]
}];

let beforeEach = ((to, from, next) => {
    if (store.state.enterprise_info.enterprise_card_type) {
        next()
    } else {
        store.dispatch('getUserInfo')
            .then(data => {
                if (data) {
                    if (data.resp_code != 200) {
                        logout();
                    } else {
                        next()
                    }
                } else {
                    logout();
                }
            });
    }
})
routes.map(route => {
    if (route.name == 'menus') {
        route.children.map(routeChild => {
            routeChild.beforeEnter = (to, from, next) => {
                let {
                    meta
                } = to;
                let {
                    title
                } = meta;
                setTitle(title);
                if (!routeChild.meta.withoutLogin) { //此页面需要登录
                    return beforeEach(to, from, next);
                } else {
                    next();
                }
            };
        });
    } else {
        route.beforeEnter = (to, from, next) => {
            let {
                meta
            } = to;
            let {
                title
            } = meta;
            setTitle(title);
            if (!route.meta.withoutLogin) { //此页面需要登录
                return beforeEach(to, from, next);
            } else {
                next();
            }
        };
    }
});
routes.push({
    path: '*',
    redirect: '/home'
});
export default new Router({
    mode: 'history',
    routes
})