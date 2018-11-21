/**
 * Created by chunting on 2018/10/28.
 */
//设置页面标题
export let setTitle = (title) => {
    setTimeout(function() {
        //利用iframe的onload事件刷新页面
        document.title = title || '标题';
        var iframe = document.createElement('iframe');
        iframe.style.visibility = 'hidden';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.onload = function() {
            setTimeout(function() {
                document.body.removeChild(iframe);
            }, 0);
        };
        document.body.appendChild(iframe);
    }, 0);
};

export let checkPhone = (phone) => {
    let regPhone = /^1[3|4|5|6|7|8|9]\d{9}$/;
    return regPhone.test(phone);
};
//身份证号校验
export let checkIdNumber = (idCard) => {
    let regIdCard = /^(^[1-9]\d{7}((0[1-9])|(1[0-2]))(0[1-9]|([1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9]|[1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
        //18位校验末位校验码。
        if (idCard.length == 18) {
            let idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
            let idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            let idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
            for (let i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }
            let idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
            let idCardLast = idCard.substring(17); //得到最后一位身份证号码
            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
                if (idCardLast == "X" || idCardLast == "x") {
                    return true;
                } else {
                    return false;
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        //15位校验通过
        return true;
    } else {
        return false;
    }
};
//邮箱
export let checkEmail = (email) => {
    let regEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    return regEmail.test(email);
};
//去掉前后空格
export let trim = (str) => {
    str = str.toString();
    if (!String.prototype.trim) {
        String.prototype.trim = function() {
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        };
    }
    return str.trim();
};
//验证码倒计时
export let verifyTime = (param) => {
    let time = 60; //预设60s;
    let call = null;
    if (typeof param == 'function') {
        call = param;
    } else if (typeof param != 'object') {
        return false;
    } else {
        time = param.time || 60;
        call = param.call;
    }
    var timer = null;
    let fun = () => {
        if (time <= 0) {
            call && call({
                time,
                statu: 1
            });
            if (timer) {
                clearTimeout(timer);
            }
            return false;
        }
        call && call({
            time,
            statu: 0
        });
        time--;

        timer = setTimeout(() => {
            fun();
        }, 1000);
    };
    fun();
};
// 只能输入数字
export let onlyNumber = (val) => {
    val = val.toString();
    if (val) {
        val = val.replace(/[^\d]/g, '');
    }
    return val;
};
//只能输入最多两位小数
export let clearNoNum = (val) => {
    val = val.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符   
    val = val.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
    val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数   
    if (val.indexOf(".") < 0 && val != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
        val = parseFloat(val);
    }
    return val;
}
// 只能英文、数字、下划线
export let onlyStr = (val) => {
    val = val.toString();
    if (val) {
        val = val.replace(/[^\w]/g, '');
    }
    return val;
};
//密码验证   //以字母开头，长度在6-18之间，只能包含字符、数字和下划线
export let checkPsw = (val) => {
    let reg = /^[a-zA-Z]\w{5,17}$/;
    return reg.test(val);
};
//格式化银行卡号
export let formatBankNumber = (val) => {
    if (val) {
        return val.replace(/\D/g, '').replace(/....(?!$)/g, '$& ');
    }
    return '';
};
//登出
export let logout = () => {
    window.location.replace('/login');
};
let $operation = {
    setTitle
}
export default $operation;