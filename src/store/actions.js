/**
 * Created by chunting on 2018/10/15.
 */

'use strict';
const actions = {};
import $api from '../tools/api';
// 个人信息
let getUserInfo = () => {
	return $api.get('/users/infor');
};
actions.getUserInfo = ({
	commit
}) => {
	return getUserInfo()
		.then(data => {
			if (data.status == '1') {
				commit('setUserInfo', data.data)
			}
			return data;
		});
};
export default actions;