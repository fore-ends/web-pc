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
	return $api.get('/bizeff/merchants');
};
actions.getUserInfo = ({
	commit
}) => {
	return getUserInfo()
		.then(data => {
			if (data.resp_code == 200) {
				//存储/更新 mer_uuid
				cookie.setItem('bizeffNo', data.data.mer_uuid);
				commit('setUserInfo', data.data);
			}
			return data;
		});
};

//账户信息  （余额等）
let getAccountInfo = () => {
	let mer_uuid = cookie.getItem('bizeffNo');
	return $api.get(`/bizeff/merchants/${mer_uuid}/balances`);
};
actions.getAccountInfo = ({
	commit
}) => {
	return getAccountInfo().then(data => {
		if (data.resp_code == 200) {
			commit('setAccountInfo', data.data);
		}
		return data;
	})
}
export default actions;