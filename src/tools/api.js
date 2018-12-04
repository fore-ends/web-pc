/**
 * Created by chunting on 2018/10/15.
 */
import 'babel-polyfill';
import axios from 'axios';
import * as config from './config';
import {
    cookie
} from '../tools/store';
import {
    Message,
    Loading
} from 'element-ui';
import {
    logout
} from './operation';
let serverUrl = config.devUrl;
let sysUrl = config.sysDev;
if (process.env.bizeff == 'test') {
    serverUrl = config.testUrl;
    sysUrl = config.sysTest;
}
if (process.env.bizeff == 'production') {
    serverUrl = config.productionUrl;
    sysUrl = config.sysProduction;
}
let $query = (data) => {
    let str = [];
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (typeof data[key] != 'object') {
                str.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            } else {
                str.push(encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(data[key])));
            }
        }
    }
    return str.join('&');
};
let get = (path, data = {}) => {
    data.t = new Date().getTime();
    let url = '';
    //获取 mer_uuid
    let mer_uuid = cookie.getItem('bizeffNo') || '';
    if (/http/.test(path)) {
        url = `${path}`;

    } else {
        url = `${serverUrl + path}`
    }
    return axios({
        url,
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            mer_uuid,
            'sequence_no': new Date().getTime()
        },
        params: data,
        withCredentials: true
    }).then(response => {
        if (response.status == 200) {

            return response.data;
        }

        return {};
    }).then(data => {
        if (data.resp_code == 401) {
            logout();
        }
        return data;
    }).catch(err => {
        console.log('err--->')
        console.log(err)
    })

};

let getSys = (path, data = {}) => {
    let url = `${sysUrl + path}`
    return get(url, data);
};

let post = (path, data = {}) => {
    let url = '';
    if (/http/.test(path)) {
        url = `${path}`;
    } else {
        url = `${serverUrl + path}`;
    }
    //获取 mer_uuid
    let mer_uuid = cookie.getItem('bizeffNo') || '';
    return axios({
        url,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'mer_uuid': mer_uuid,
            'sequence_no': new Date().getTime()
        },
        params: {
            t: new Date().getTime()
        },
        withCredentials: true,
        dataType: 'json',
        data: data
    }).then(response => {
        if (response.status == 200) {

            return response.data;
        } else {
            return {};
        }
    }).then(data => {
        if (data.code == 401) {
            logout();
        }
        return data;
    }).catch(err => {
        console.log('err--->')
    })

};
// post2 header 内 没有 user_uuid
let post2 = (path, data = {}) => {
    let url = '';
    if (/http/.test(path)) {
        url = `${path}`;
    } else {
        url = `${serverUrl + path}`;
    }
    return axios({
        url,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'sequence_no': new Date().getTime()
        },
        params: {
            t: new Date().getTime()
        },
        withCredentials: true,
        dataType: 'json',
        data: data
    }).then(response => {
        if (response.status == 200) {

            return response.data;
        } else {
            return {};
        }
    }).then(data => {
        if (data.code == 401) {
            // logout();
        }
        return data;
    }).catch(err => {
        console.log('err--->')
    })

};
let put = (path, data = {}) => {
    let url = '';
    if (/http/.test(path)) {
        url = `${path}`;
    } else {
        url = `${serverUrl + path}`;
    }
    //获取 mer_uuid
    let mer_uuid = cookie.getItem('bizeffNo') || '';
    return axios({
        url,
        method: 'put',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'mer_uuid': mer_uuid,
            'sequence_no': new Date().getTime()
        },
        params: {
            t: new Date().getTime()
        },
        withCredentials: true,
        dataType: 'json',
        data: data
    }).then(response => {
        if (response.status == 200) {

            return response.data;
        } else {
            return {};
        }
    }).then(data => {
        if (data.code == 401) {
            logout();
        }
        return data;
    }).catch(err => {
        console.log('err--->')
    })

};
let postSys = (path, data = {}) => {
    let url = `${sysUrl + path}`;
    return post(url, data);
};
const $api = {
    get,
    post,
    post2,
    put,
    getSys,
    postSys,
    serverUrl
};
export default $api;