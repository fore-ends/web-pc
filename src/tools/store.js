/**
 * Created by chunting on 2018/10/26.
 */
let session = {};
let local = {};
let cookie = {};
session.getItem = (key) => {
    if (window.sessionStorage.getItem(key)) {
        let val = window.sessionStorage.getItem(key);
        try {
            return JSON.parse(val);
        } catch (e) {
            return val;
        }

    }
    return '';

};
session.setItem = (key, value = '') => {
    if (typeof value === 'object') {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    } else {
        window.sessionStorage.setItem(key, value);
    }
    return '';
};
session.removeItem = (key) => {
    if (!key) {
        return false;
    }
    window.sessionStorage.removeItem(key);
};
session.clear = () => {
    window.sessionStorage.clear();
};


local.getItem = (key) => {
    if (window.localStorage.getItem(key)) {
        let val = window.localStorage.getItem(key);
        try {
            return JSON.parse(val);
        } catch (e) {
            return val;
        }

    }
    return '';

};
local.setItem = ({
    key,
    value = ''
}) => {
    if (typeof value === 'object') {
        window.localStorage.setItem(key, JSON.stringify(value));
    } else {
        window.localStorage.setItem(key, value);
    }
    return '';
};
local.removeItem = (key) => {
    if (!key) {
        return false;
    }
    window.localStorage.removeItem(key);
};

local.clear = () => {
    window.localStorage.clear();
};


cookie.getItem = (key) => {
    let reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
    let arr = document.cookie.match(reg);
    if (arr) {
        try {
            return JSON.parse(unescape(arr[2]));
        } catch (e) {
            return arr[2];
        }
    } else {
        return null;
    }
};
cookie.setItem = ({
    key,
    value = '',
    day = 30
}) => {
    typeof value === 'object' ? value = JSON.stringify(value) : '';
    let d = new Date();
    d.setTime(d.getTime() + (day * 24 * 60 * 60 * 1000));
    let expires = 'expires=' + d.toGMTString();
    document.cookie = key + '=' + value + '; ' + expires;
    return null;
};
cookie.removeItem = (key) => {
    if (!key) {
        return false;
    }
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
export {
    session,
    local,
    cookie
};
let store = {
    session,
    local,
    cookie
};
export default store;