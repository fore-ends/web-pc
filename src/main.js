import Vue from 'vue';
import 'flex.css/dist/flex.css';
import './less/base.less';
// import './scss/element-variables.scss'
import {
    Row,
    Col,
    Button,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    Select,
    Option,
    InputNumber,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Dialog,
    Card,
    Switch,
    Upload,
    Tabs,
    TabPane,
    Table,
    TableColumn,
    Pagination,
    DatePicker,
    Tag,
    Steps,
    Step,
    Alert,
    Loading,
    MessageBox,
    Message,
    Notification
} from 'element-ui';


Vue.use(Row);
Vue.use(Col);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Dialog);
Vue.use(Card);
Vue.use(Switch);
Vue.use(Upload);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Button);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(DatePicker);
Vue.use(Tag);
Vue.use(Steps);
Vue.use(Step);
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
store.dispatch('getAccountInfo');
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});