/**
 * Created by chunting on 2018/10/15.
 */
'use strict'
const state = {
	mer_uuid: '',
	mer_name: '', //企业名称
	mobile_no: '', //手机号
	email: '', //邮箱
	merchant_info: {}, //商户实名信
	enterprise_info: {}, //企业信息

	account_status: '', // 账户状态类型 1-正常， 0-冻结， -1-异常账户,
	balance_total: 0, //账面总额, = 可用余额+冻结金额+在途金额,
	balance_available: '', //可用余额,
	balance_frozen: '', //冻结金额,

	operator_uuid: '', //操作人uuid,
	operator_no: '', // 操作人编号 (账号ID),
	operator_name: '', // 操作人名称,
	user_name: '', //登录账号
	operator_mobile_no: '', //手机号,(脱敏)
	operator_email: '', //邮箱,(脱敏)
	created_time: '', //创建时间(开通时间),
	updated_time: '', //修改时间,
	//认证信息
	operation_status: '',
	operation_info: {}
};
export default state;