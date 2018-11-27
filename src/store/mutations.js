/**
 * Created by chunting on 2018/10/15.
 */
'use strict';
import _ from 'lodash/core';
const mutations = {};


// 商户信息
mutations.setUserInfo = (state, data) => {
	if (data) {
		_.forEach(state, (value, key) => {
			if (data.hasOwnProperty(key)) {
				state[key] = data[key];
			}
		});

	}

};
//账户信息
mutations.setBalances = (state, data) => {
	if (data) {
		_.forEach(state, (value, key) => {
			if (data.hasOwnProperty(key)) {
				state[key] = data[key];
			}
		});
	}
};
//账号信息
mutations.setAccountInfo = (state, data) => {
	if (data) {
		_.forEach(state, (value, key) => {
			if (data.hasOwnProperty(key)) {
				if (key == 'operator_mobile_no') {
					state[key] = data.mobile_no;
				} else if (key == 'operator_email') {
					state[key] = data.email;
				} else {
					state[key] = data[key];
				}
			}
		});
	}
};
export default mutations;