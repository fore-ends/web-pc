import Vue from 'vue';
import 'flex.css/dist/flex.css';
import './less/base.less';
import './scss/element-variables.scss'
import {
    Button,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Alert,
    Loading,
    MessageBox,
    Message,
    Notification
} from 'element-ui';


Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Button);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$ELEMENT = {
    size: 'small',
    zIndex: 3000
};
import App from './App';
import router from './router';
import * as filters from './filters';
import store from './store';

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});