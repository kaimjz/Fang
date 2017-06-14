﻿/* jquery 表单验证使用实例！  */
//获取Request notnull
function isRequestNotNull(obj) {
    obj = $.trim(obj);
    if (obj.length == 0 || obj == null || obj == undefined) {
        return true;
    }
    else
        return false;
}
//验证不为空 notnull
function isNotNull(obj) {
    obj = $.trim(obj);
    if (obj.length == 0 || obj == null || obj == undefined) {
        return true;
    }
    else
        return false;
}

//验证只能输入正整数 add by wj
function CheckNum(obj) {
    reg = /^[0-9]*[1-9][0-9]*$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证数字 num
function isInteger(obj) {
    reg = /^[-+]?\d+$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证数字 num  或者null,空
function isIntegerOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    reg = /^[-+]?\d+$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//Email验证 email
function isEmail(obj) {
    reg = /^\w{1,}@\w+(\.\w+)+$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//Email验证 email   或者null,空
function isEmailOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    reg = /^\w{3,}@\w+(\.\w+)+$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证只能输入英文字符串 echar
function isEnglishStr(obj) {
    reg = /^[a-z,A-Z]+$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证只能输入英文字符串 echar 或者null,空
function isEnglishStrOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    reg = /^[a-z,A-Z]+$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否是n位数字字符串编号 nnum
function isLenNum(obj, n) {
    reg = /^[0-9]+$/;
    obj = $.trim(obj);
    if (obj.length > n)
        return false;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否是n位数字字符串编号 nnum或者null,空
function isLenNumOrNull(obj, n) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    reg = /^[0-9]+$/;
    obj = $.trim(obj);
    if (obj.length > n)
        return false;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否小于等于n位数的字符串 nchar
function isLenStr(obj, n) {
    //reg = /^[A-Za-z0-9\u0391-\uFFE5]+$/;
    obj = $.trim(obj);
    if (obj.length == 0 || obj.length > n)
        return false;
    else
        return true;
    //    if (!reg.test(obj)) {
    //        return false;
    //    } else {
    //        return true;
    //    }
}

//验证是否小于等于n位数的字符串 nchar或者null,空
function isLenStrOrNull(obj, n) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    //reg = /^[A-Za-z0-9\u0391-\uFFE5]+$/;
    obj = $.trim(obj);
    if (obj.length > n)
        return false;
        //    if (!reg.test(obj)) {
        //        return false;
        //    } else {
        //        return true;
        //    }
    else
        return true;
}

//验证是否电话号码 phone
function isTelephone(obj) {
    reg = /^([0-9]{3,4}-)?[1-9]{7,8}$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否电话号码 phone或者null,空
function isTelephoneOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    reg = /^(\d{3,4}\-)?[1-9]\d{6,7}$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否手机号 mobile
function isMobile(obj) {
    reg = /^(\+\d{2,3}\-)?\d{11}$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否手机号 mobile或者null,空
function isMobileOrnull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    reg = /^(\+\d{2,3}\-)?\d{11}$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否手机号或电话号码 mobile phone 
function isMobileOrPhone(obj) {
    reg_mobile = /^(\+\d{2,3}\-)?\d{11}$/;
    reg_phone = /^(\d{3,4}\-)?[1-9]\d{6,7}$/;
    if (!reg_mobile.test(obj) && !reg_phone.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//支持手机号码，3-4位区号，7-8位直播号码，1－4位分机号）add by wj 2015-01-06
function isMobileAndPhoneOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    reg_mobile = /^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
    if (!reg_mobile.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证是否手机号或电话号码 mobile phone或者null,空
function isMobileOrPhoneOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    reg = /^(\+\d{2,3}\-)?\d{11}$/;
    reg2 = /^(\d{3,4}\-)?[1-9]\d{6,7}$/;
    if (!reg.test(obj) && !reg2.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证网址 uri
function isUri(obj) {
    reg = /^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证网址 uri或者null,空
function isUriOrnull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    reg = /^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//验证两个值是否相等 equals
function isEqual(obj1, controlObj) {
    if (obj1.length != 0 && controlObj.length != 0) {
        if (obj1 == controlObj)
            return true;
        else
            return false;
    }
    else
        return false;
}

//判断日期类型是否为YYYY-MM-DD格式的类型 date
function isDate(obj) {
    if (obj.length != 0) {
        reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
        if (!reg.test(obj)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断日期类型是否为YYYY-MM-DD格式的类型 date或者null,空
function isDateOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    if (obj.length != 0) {
        reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
        if (!reg.test(obj)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型 datetime
function isDateTime(obj) {
    if (obj.length != 0) {
        reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        if (!reg.test(obj)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型 datetime或者null,空
function isDateTimeOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    if (obj.length != 0) {
        reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        if (!reg.test(obj)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断日期类型是否为hh:mm:ss格式的类型 time
function isTime(obj) {
    if (obj.length != 0) {
        reg = /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/;
        if (!reg.test(obj)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断日期类型是否为hh:mm:ss格式的类型 time或者null,空
function isTimeOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    if (obj.length != 0) {
        reg = /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/;
        if (!reg.test(obj)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断输入的字符是否为中文 cchar 
function isChinese(obj) {
    if (obj.length != 0) {
        reg = /^[\u0391-\uFFE5]+$/;
        if (!reg.test(str)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断输入的字符是否为中文 cchar或者null,空
function isChineseOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    if (obj.length != 0) {
        reg = /^[\u0391-\uFFE5]+$/;
        if (!reg.test(str)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断输入的邮编(只能为六位)是否正确 zip
function isZip(obj) {
    if (obj.length != 0) {
        reg = /^\d{6}$/;
        if (!reg.test(str)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断输入的邮编(只能为六位)是否正确 zip或者null,空
function isZipOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    if (obj.length != 0) {
        reg = /^\d{6}$/;
        if (!reg.test(str)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断输入的字符是否为双精度 double
function isDouble(obj) {
    if (obj.length != 0) {
        reg = /^[-\+]?\d+(\.\d+)?$/;
        if (!reg.test(obj)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断输入的字符是否为双精度 double或者null,空
function isDoubleOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    if (obj.length != 0) {
        reg = /^[-\+]?\d+(\.\d+)?$/;
        if (!reg.test(obj)) {
            return false;
        }
        else {
            return true;
        }
    }
}

//判断是否为身份证 idcard
function isIDCard(obj) {
    if (obj.length != 0) {
        reg = /^\d{15}(\d{2}[A-Za-z0-9;])?$/;
        if (!reg.test(obj))
            return false;
        else
            return true;
    }
}

//判断是否为身份证 idcard或者null,空
function isIDCardOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    if (obj.length != 0) {
        reg = /^\d{15}(\d{2}[A-Za-z0-9;])?$/;
        if (!reg.test(obj))
            return false;
        else
            return true;
    }
}
//判断是否为IP地址格式
function isIP(obj) {
    var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式 
    if (re.test(obj)) {
        if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) return true;
    }
    return false;
}
//判断是否为IP地址格式 或者null,空
function isIPOrNull(obj) {
    var controlObj = $.trim(obj);
    if (controlObj.length == 0 || controlObj == null || controlObj == undefined) {
        return true;
    }
    var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式 
    if (re.test(obj)) {
        if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) return true;
    }
    return false;
}

//验证只能输入数字，字母，下划线
//创建人：lwj
//时间：2015-4-23
function CheckName(name) {
    var re = /^[a-zA-Z0-9_-]{1,25}$/;
    if (re.exec(name)) {
        return true;
    }
    else {
        return false;
    }
}

//验证密码中是否有空格
//创建人：wp
//创建时间：2015-7-17
function CheckSpace(keyword) {
    var re = /\s+/g;
    if (re.test(keyword)) {
        return true;
    }
    else {
        return false;
    }
}



//验证机器码
//创建人：wp
function Checkmachinecode(machinecode) {
    var re = /^[a-zA-Z0-9]{1,50}$/;
    if (re.exec(machinecode)) {
        return true;
    }
    else {
        return false;
    }
}

//验证数字 num(真实姓名验证)c)真实名称必填 长度为20字以内，可以包含汉字、字母、英文 . （中间允许空格），例：张三、Quella、Quella. Elina、Quella Elina。
function CheckRealName(obj) {

    reg = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s\ • ]{1,20})$/;
    if (reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//只能包含中文、数字、字母、_
function CheckNameValue(obj) {
    reg = /^[\w\u4e00-\u9fa5]+$/gi;
    if (reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}

//联系电话非必填 长度为20个字以内，可以包含固话、手机号格式，例：xxxxxxxxxxx、xxxx-xxxxxxx、xxxx xxxxxxx、xxxxxxxxxxx。
function CheckTelephone(obj) {
    reg = /^(\d{3,4}\-)?(\d{3,4}\s)?(\d{3,4})?[1-9]\d{6,7}$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}
//只允许输入汉字、字母
function CheckYou(cs) {
    var regu = "^[a-zA-Z\u4e00-\u9fa5]+$";
    var re = new RegExp(regu);
    if (cs.search(re) != -1) {
        return true;
    } else {
        return false;
    }
}

//验证脚本
//obj为当前input所在的空间容器 (例如：Div,Panel)
//脚本中 checkvalue 验证函数  err 属性表示提示【中文名称】
function JudgeValidate(obj) {
    $("i").html("").hide();
    var Validatemsg = "";
    var Validateflag = true;
    $("#" + obj).find("[datacol=yes]").each(function () {
        if ($(this).attr("checkexpession") != undefined) {
            switch ($(this).attr("checkexpession")) {
                case "default":
                    {
                        if (isNotNull($(this).attr("value"))) {
                            Validatemsg = $(this).attr("err") + "\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "NotNull":
                    {
                        if (isNotNull($(this).attr("value"))) {
                            if ($(this).is('input')) {
                                Validatemsg = $(this).attr("err") + "必填项\n";
                            }
                            else {
                                Validatemsg = $(this).attr("err") + "必选项\n";
                            }

                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "Num":
                    {
                        if (!isInteger($(this).attr("value"))) {
                            Validatemsg = $(this).attr("err") + "必须为数字\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "ZNum":
                    {
                        if (!CheckNum($(this).attr("value"))) {
                            Validatemsg = $(this).attr("err") + "必须为正整数\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                            break;
                        }

                        if (!isLenStr($(this).attr("value"), $(this).attr("length"))) {
                            Validatemsg = $(this).attr("err") + "长度小于" + $(this).attr("length") + "位\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                            break;
                        }
                    }
                case "NumOrNull":
                    {
                        if (!isIntegerOrNull($(this).attr("value"))) {
                            Validatemsg = $(this).attr("err") + "必须为数字\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "Email":
                    {
                        if (!isEmail($(this).attr("value"))) {
                            Validatemsg = $(this).attr("err") + "必须为E-mail格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "EmailOrNull":
                    {
                        if (!isEmailOrNull($(this).attr("value"))) {
                            Validatemsg = $(this).attr("err") + "必须为E-mail格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "EnglishStr":
                    {
                        if (!isEnglishStr($(this).attr("value"))) {
                            Validatemsg = $(this).attr("err") + "必须为字符串\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "EnglishStrOrNull":
                    {
                        if (!isEnglishStrOrNull($(this).attr("value"))) {
                            Validatemsg = $(this).attr("err") + "必须为字符串\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "LenNum":
                    {
                        if (!isLenNum($(this).attr("value"), $(this).attr("length"))) {
                            Validatemsg = $(this).attr("err") + "必须为" + $(this).attr("length") + "位数\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "LenNumOrNull":
                    {
                        if (!isLenNumOrNull($(this).attr("value"), $(this).attr("length"))) {
                            Validatemsg = $(this).attr("err") + "必须为" + $(this).attr("length") + "位数\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "LenStr":
                    {
                        if (isNotNull($(this).attr("value"))) {
                            Validatemsg = $(this).attr("err") + "必填项\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                            break;
                        }
                        if (!isLenStr($(this).attr("value"), $(this).attr("length"))) {
                            Validatemsg = $(this).attr("err") + "长度为1-" + $(this).attr("length") + "位\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                            break;
                        }
                    }
                case "LenStrOrNull":
                    {
                        if (!isLenStrOrNull($(this).attr("value"), $(this).attr("length"))) {
                            Validatemsg = $(this).attr("err") + "长度为1-" + $(this).attr("length") + "位\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "Phone":
                    {
                        if (!isTelephone($(this).attr("value"))) {
                            Validatemsg = $(this).attr("err") + "必须电话格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "Fax":
                    {
                        if (!isTelephoneOrNull($(this).attr("value"))) {
                            Validatemsg = $(this).attr("err") + "必须为传真格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "PhoneOrNull":
                    {
                        if (!isTelephoneOrNull($(this).attr("value"))) {
                            Validatemsg = $(this).attr("err") + "必须电话格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "Mobile":
                    {
                        if (!isMobile($(this).attr("value"))) {
                            Validatemsg = $(this).attr("err") + "必须为手机格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "MobileOrNull":
                    {
                        if (!isMobileOrnull($(this).attr("value"))) {
                            Validatemsg = $(this).attr("err") + "必须为手机格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "MobileOrPhone":
                    {
                        if (!isMobileOrPhone($(this).attr("value"))) {
                            Validatemsg = $(this).attr("err") + "必须为电话格式或手机格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "MobileOrPhoneOrNull":
                    {
                        if (!isMobileOrPhoneOrNull($(this).attr("value"))) {
                            Validatemsg = $(this).attr("err") + "必须为电话或手机格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "Uri":
                    {
                        if (!isUri($(this).attr("value"))) {
                            Validatemsg = $(this).attr("err") + "必须为网址格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "UriOrNull":
                    {
                        if (!isUriOrnull($(this).attr("value"))) {
                            Validatemsg = $(this).attr("err") + "必须为网址格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "Equal":
                    {
                        if (!isEqual($(this).attr("value"), $(this).attr("eqvalue"))) {
                            Validatemsg = $(this).attr("err") + "不相等\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "Date":
                    {
                        if (!isDate($(this).attr("value"), $(this).attr("eqvalue"))) {
                            Validatemsg = $(this).attr("err") + "必须为日期格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "DateOrNull":
                    {
                        if (!isDateOrNull($(this).attr("value"), $(this).attr("eqvalue"))) {
                            Validatemsg = $(this).attr("err") + "必须为日期格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "DateTime":
                    {
                        if (!isDateTime($(this).attr("value"), $(this).attr("eqvalue"))) {
                            Validatemsg = $(this).attr("err") + "必须为日期时间格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "DateTimeOrNull":
                    {
                        if (!isDateTimeOrNull($(this).attr("value"), $(this).attr("eqvalue"))) {
                            Validatemsg = $(this).attr("err") + "必须为日期时间格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "Time":
                    {
                        if (!isTime($(this).attr("value"), $(this).attr("eqvalue"))) {
                            Validatemsg = $(this).attr("err") + "必须为时间格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "TimeOrNull":
                    {
                        if (!isTimeOrNull($(this).attr("value"), $(this).attr("eqvalue"))) {
                            Validatemsg = $(this).attr("err") + "必须为时间格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "ChineseStr":
                    {
                        if (!isChinese($(this).attr("value"), $(this).attr("eqvalue"))) {
                            Validatemsg = $(this).attr("err") + "必须为中文\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "ChineseStrOrNull":
                    {
                        if (!isChineseOrNull($(this).attr("value"), $(this).attr("eqvalue"))) {
                            Validatemsg = $(this).attr("err") + "必须为中文\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "Zip":
                    {
                        if (!isZip($(this).attr("value"), $(this).attr("eqvalue"))) {
                            Validatemsg = $(this).attr("err") + "必须为邮编格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "ZipOrNull":
                    {
                        if (!isZipOrNull($(this).attr("value"), $(this).attr("eqvalue"))) {
                            Validatemsg = $(this).attr("err") + "必须为邮编格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "Double":
                    {
                        if (!isDouble($(this).attr("value"), $(this).attr("eqvalue"))) {
                            Validatemsg = $(this).attr("err") + "必须为小数\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "DoubleOrNull":
                    {
                        if (!isDoubleOrNull($(this).attr("value"), $(this).attr("eqvalue"))) {
                            Validatemsg = $(this).attr("err") + "必须为小数\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "IDCard":
                    {
                        if (!isIDCard($(this).attr("value"), $(this).attr("eqvalue"))) {
                            Validatemsg = $(this).attr("err") + "必须为身份证格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "IDCardOrNull":
                    {
                        if (!isIDCardOrNull($(this).attr("value"), $(this).attr("eqvalue"))) {
                            Validatemsg = $(this).attr("err") + "必须为身份证格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "RequestNotNull":
                    {
                        if (isNotNull($(this).attr("value"))) {
                            Validatemsg = $(this).attr("err") + "\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "IsExist":
                    {
                        Validatemsg = $(this).attr("err") + "\n";
                        Validateflag = false;
                        ChangeCss($(this), Validatemsg);
                        break;
                    }
                case "IsIP":
                    {
                        if (!isIP($(this).attr("value"), $(this).attr("eqvalue"))) {
                            Validatemsg = $(this).attr("err") + "必须为IP格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                case "IPOrNull":
                    {
                        if (!isIPOrNullOrNull($(this).attr("value"), $(this).attr("eqvalue"))) {
                            Validatemsg = $(this).attr("err") + "必须为IP格式\n";
                            Validateflag = false;
                            ChangeCss($(this), Validatemsg);
                        }
                        break;
                    }
                default:
                    break;
            }
        }
    });
    if (Validatemsg.length > 0) {
        return Validateflag;
    }
    return Validateflag;
}
//修改出错的input的外观
function ChangeCss(obj, Validatemsg) {
    $(obj).siblings("i").show();
    $(obj).siblings("i").html(Validatemsg);
    return;

    $('#tipTable').hide();
    $('.tooltipinputerr').removeClass("tooltipinputerr");
    $(obj).removeClass("x");
    if ($(obj).attr('class') == 'txt') {
        $(obj).addClass("tooltipinputerr");
        $(obj).removeClass("txt");
    } else if ($(obj).attr('class') == 'select') {
        $(obj).addClass("tooltipselecterr");
        $(obj).removeClass("select");
    }
    $(obj).focus(); //焦点
    $('body').append('<table id="tipTable" class="tableTip"><tr><td  class="leftImage"></td> <td class="contenImage" align="left"></td> <td class="rightImage"></td></tr></table>');
    var X = $(obj).offset().top;
    var Y = $(obj).offset().left;
    $('#tipTable').css({ left: Y - 2 + 'px', top: X + 25 + 'px' });
    $('#tipTable').show()
    $('.contenImage').html(Validatemsg);
    $(obj).change(function () {
        if ($(obj).val() != "") {
            if ($(obj).attr('class') == 'txt') {
                $(obj).addClass("txt");
                $(obj).removeClass("tooltipinputerr");
            } else if ($(obj).attr('class') == 'select') {
                $(obj).addClass("select");
                $(obj).removeClass("tooltipselecterr");
            }
            $('#tipTable').remove()
        }
    });
    $(obj).blur(function () {
        if ($(obj).val() != "") {
            if ($(obj).attr('type') == 'text') {
                $(obj).addClass("txt");
                $(obj).removeClass("tooltipinputerr");
            } else {
                $(obj).removeClass("tooltipselecterr");
            }
            $('#tipTable').remove()
        }
    });
}
