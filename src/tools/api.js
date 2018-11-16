/**
 * Created by chunting on 2018/10/15.
 */
import 'babel-polyfill';
import axios from 'axios';
import * as config from './config';
import {
    Message
} from 'element-ui';
// Message({
//     showClose: true,
//     message: '测试代码',
//     type: 'error'
// });
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
    data.callSystemID = '3102';
    data.t = new Date().getTime();
    let url = '';
    if (/http/.test(path)) {
        url = `${path}`;

    } else {
        url = `${serverUrl + path}`
    }
    return axios({
        url,
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: data,
        withCredentials: true
    }).then(response => {
        if (response.status == 200) {

            return response.data;
        }

        return {};
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

    return axios({
        url,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            t: new Date().getTime(),
            callSystemID: '3102'

        },
        withCredentials: true,
        dataType: 'json',
        data: $query(data)
    }).then(response => {
        if (response.status == 200) {

            return response.data;
        } else {
            return {};
        }
    }).then(data => {
        if (data.code == 1220) {
            // logout();
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
    getSys,
    postSys,
    serverUrl
};
export default $api;