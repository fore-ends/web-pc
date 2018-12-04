/**
 * Created by chunting on 2018/10/15.
 */

'use strict';
const actions = {};
import $api from '../tools/api';
import {
	cookie
} from '../tools/store';

// 商户信息
let getUserInfo = () => {
	let mer_uuid = cookie.getItem('bizeffNo') || '';
	return $api.get(`/bizeff/merchants/${mer_uuid}`);
};
actions.getUserInfo = ({
	commit
}) => {
	return getUserInfo()
		.then(data => {
			console.log('ddd', data);
			if (data && data.resp_code == 200) {
				//存储/更新 mer_uuid  bizeffNo即为mer_uuid;
				cookie.setItem('bizeffNo', data.data.mer_uuid, 1);
				commit('setUserInfo', data.data);
			}
			return data;
		});
};

//账户信息  （余额等）
let getBalances = () => {
	let mer_uuid = cookie.getItem('bizeffNo') || '';
	return $api.get(`/bizeff/merchants/${mer_uuid}/balances`);
};
actions.getBalances = ({
	commit
}) => {
	return getBalances().then(data => {
		if (data && data.resp_code == 200) {
			commit('setBalances', data.data);
		}
		return data;
	})
}

//账号信息  （当前账号）
let getAccountInfo = () => {
	let mer_uuid = cookie.getItem('bizeffNo') || '';
	return $api.get(`/bizeff/merchants/${mer_uuid}/operators`);
};
actions.getAccountInfo = ({
	commit
}) => {
	return getAccountInfo().then(data => {
		if (data && data.resp_code == 200) {
			commit('setAccountInfo', data.data);
		}
		return data;
	})
}
//认证信息 
let getCertificates = () => {
	let mer_uuid = cookie.getItem('bizeffNo') || '';
	return $api.get(`/bizeff/merchants/${mer_uuid}/certificates`);
};
actions.getCertificates = ({
	commit
}) => {
	return getCertificates().then(data => {
		if (data && data.resp_code == 200) {
			commit('setCertificates', data.data);
		}
		return data;
	})
}
export default actions;