/**
 * Created by chunting on 2018/10/15.
 */
'use strict';

const mutations = {};


// 个人信息
mutations.setUserInfo = (state, data) => {
    if (data) {
        Object.keys(state).forEach(key => {
            if (data.hasOwnProperty(key)) {
                state[key] = data[key];
            }
        });

    }

};
export default  mutations;
