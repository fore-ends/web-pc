/**
 * Created by chunting on 2018/10/15.
 */
let protocol = window.location.protocol;
export const devUrl = 'http://192.168.0.105:3000';
export const testUrl = ``;
export const sysDev = ``;
export const sysTest = ``;
export const sysProduction = ``;
export const productionUrl = ``;
export const telNumber = '';
let encrypt = false;
export const company = '北京智赋科技有限公司';
export const registeredNo = '京ICP备1805811号';

/*prod env*/
if (process.env.kingold == 'production') {

	encrypt = true;
}

export let doEncrypt = encrypt;