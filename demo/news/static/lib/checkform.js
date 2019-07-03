//V1.0    段震  2010-01-23
//V1.1          2010-02-03 修改 firefox兼容问题
//------------------------------------------------------
/* 输入串是否为空*/

function checkEmpty(str) {
    var reg = /^\s+$/;
    if ((arr = str.match(reg)) || str == "")
        return "不能为空";
    else
        return "";
}

/*
 * 显示不同的提示信息 errTip：提示信息
 */
function checkEmptyTip(str, errTip) {
    var reg = /^\s+$/;
    if ((arr = str.match(reg)) || str == "")
        return errTip;
    else
        return "";
}

/**
 * 使用js 自带函数校验是否为数字
 *
 * @param str
 * @param errTip
 * @return
 */
function checkShuZi(str, errTip) {
    if (isNaN(str)) {
        return errTip;
    } else
        return "";
}

function checkEmpty2(str) {
    var reg = /^\s+$/;
    if ((arr = str.match(reg)) || str == "")
        return "输入串不能为空";
    else
        return "";
}

/* 输入串中是否是合法字符 */
function checkEnglish(str) {
    str = str.trim();
    var reg = /^\w+[\w\s0-9-\.,\\(\\)]+$/;
    if (arr = str.match(reg) || str == "")
        return "";
    else
        return "输入串为空或包含有非法字符";
}

/* 输入串中是否是汉字 */
function checkChinese(str) {
    str = str.trim();
    var reg = /^[\u4E00-\u9FA5]+$/;
    if (arr = str.match(reg) || str == "")
        return "";
    else
        return "输入串为空或不全是汉字";
}

/* 输入串中是否有非法字符(可以是汉字) */
function checkString(str) {

    str = str.trim();
    var reg = /[a-zA-Z0-9\s]+|[\u4E00-\u9FA5]+/;
    if (arr = str.match(reg) || !str)
        return "";
    else
        return "输入串为空或包含有非法字符";
}

function checkString2(str) {
    str = str.trim();
    var reg = /^(\w|[\u4E00-\u9FA5])+$/;
    if (str == "") {
        return "";
    }
    if (arr = str.match(reg))
        return "";
    else
        return "输入串为空或包含有非法字符";
}

/* 输入串是否整型 */
function checkInteger(str) {
    var reg = /^-?\d+$/;
    if (arr = str.match(reg) || str == "")
        return "";
    else
        return "输入串为空或不全是数字";

}

function checkInteger2(str) {
    var reg = /^-?\d+$/;
    if (str == "") {
        return "";
    }
    if (arr = str.match(reg))
        return "";
    else
        return "输入串为空或不全是数字";

}

/* 输入串是否全是数字 */
function checkNumber(str) {
    var reg = /^\d+$/;
    if (str == "") {
        return "";
    }
    if (arr = str.match(reg))
        return "";
    else
        return "输入串为空或不全是数字";
}

/*判断tc号*/

/*function checkWyhtc(str){
	var reg = /^\d{3,}$/;
    if(str==""){return "";}
    if(arr=str.match(reg))
    	return "";
    else
   	  return "tc号不正确";
}
*/
function checkTc(str) {
    var reg = /^\d{1,3}$/;
    if (str == "") {
        return "";
    }
    if (arr = str.match(reg))
        return "";
    else
        return "tc号不正确";
}

/* 输入串是否是浮点型数字 */
function checkFloat(str) {
    var reg = /^-?\d*(\.)?\d+$/;
    if (arr = str.match(reg) || str == "")
        return "";
    else
        return "输入串为空或非法浮点数";

}

function checkFloat2(str) {
    var reg = /^-?\d*(\.)?\d+$/;
    if (str == "") return "";
    if (arr = str.match(reg))
        return "";
    else
        return "输入串为空或非法浮点数";
}

/* 身份证件号码 */
function checkCertificate1(str) {
    var reg = /^((\d{15})|((\d){17}(\d|X){1}))$/;
    if (arr = str.match(reg) || str == "")
        return "";
    else
        return "身份证位数或格式不对";
}

function checkCertificate(idcard) {
    if (idcard == "") return "";
    var Errors = new Array(
        "验证通过!",
        "身份证号码位数不对!",
        "身份证号码出生日期超出范围或含有非法字符!",
        "身份证号码校验错误!",
        "身份证地区非法!"
    );
    var area = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    };
    var idcard, Y, JYM;
    var S, M;
    var idcard_array = new Array();
    idcard_array = idcard.split("");
    // 地区检验
    if (area[parseInt(idcard.substr(0, 2))] == null) return Errors[4];
    // alert(Errors[4]);
    // 身份号码位数及格式检验
    switch (idcard.length) {
        case 15:
            if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;// 测试出生日期的合法性
            } else {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;// 测试出生日期的合法性
            }
            if (ereg.test(idcard)) return "";// Errors[0];
            // alert(Errors[0]);
            else return Errors[2];
            // alert(Errors[2]);
            break;
        case 18:
            // 18位身份号码检测
            // 出生日期的合法性检查
            if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;// 闰年出生日期的合法性正则表达式
            } else {
                ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;// 平年出生日期的合法性正则表达式
            }
            if (ereg.test(idcard)) {// 测试出生日期的合法性
                // 计算校验位
                S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
                    + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
                    + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
                    + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
                    + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
                    + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
                    + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
                    + parseInt(idcard_array[7]) * 1
                    + parseInt(idcard_array[8]) * 6
                    + parseInt(idcard_array[9]) * 3;
                Y = S % 11;
                M = "F";
                JYM = "10X98765432";
                M = JYM.substr(Y, 1);// 判断校验位
                if (M == idcard_array[17]) return "";// Errors[0]; //检测ID的校验位
                else return Errors[3];
                // alert(Errors[3]);
            } else return Errors[2];
            // alert(Errors[2]);
            break;
        default:
            return Errors[1];
            // alert(Errors[1]);
            break;
    }
}


/* 纳税人识别号是否正确 */

function checkId(str) {
    if (str == "") return "";
    var reg = /^((\S){15})|((\S){18})|((\S){20})$/;
    if (arr = str.match(reg))
        return "";
    else
        return "纳税人识别号位数不对或者中间有空格";
}

/* Email格式是否正确 */

function checkEmail(str) {
    /*
     * var reg = /^(\w+)@(\w+)((\.\w+)+)$/; if(arr=str.match(reg)) return ""; else
     * return "Email 格式错误";
     */
    if (arr = str.indexOf("@") > 0 || str == "")
        return "";
    else
        return "Email 格式错误";
}

/* 年格式是否正确 */

function checkYear(str) {
    var reg = /^\d{4}$/;
    if (arr = str.match(reg) || str == "")
        return "";
    else
        return "年份必须是四位数字";
}

/* 月格式是否正确 */

function checkMonth(str) {
    var reg = /^((0?[1-9])|(1[0-2]))$/;
    if (arr = str.match(reg) || str == "")
        return "";
    else
        return "月份必须是(0)1到12";
}

/* 日格式是否正确 */

function checkDay(str) {
    var reg = /^((0?[1-9])|((1|2)[0-9])|(3(0|1)))$/;
    if (arr = str.match(reg) || str == "")
        return "";
    else
        return "日必须是(0)1到31";
}

/* 电话号码 */
function checkTelephone(str) {
    var reg = /^(\d+)((-*)(\d+))+$/;
    if (arr = str.match(reg) || str == "")
        return "";
    else
        return "电话号码格式不对";
}

/* 组织机构代码 */
function checkOrganizationCode(str) {
    return "";
}

/* 批准文号 */
function checkAffirmNumber(str) {
    return "";
}

/* 营业执照字号 */
function checkBusinessLicenceNumber(str) {
    return "";
}

/* 银行账号 */
function checkBankAccount(str) {
    var reg = /^\d+$/;
    if (arr = str.match(reg) || str == "")
        return "";
    else
        return "非法银行帐号";
}

/* 数值型校验 */
function checkNumericalValue(str) {
    return "";
}

/* 摊位号 */
function checkStallId(str) {
    return "";
}

/* 网址 */
function checkHttp(str) {
    return "";
}

/* 百分比 */
function checkPercent(str) {
    var reg = /^\d*(\.)?\d+$/;
    if (arr = str.match(reg) || str == "")
        return "";
    else
        return "非法百分比";
}

/* 代理人资格证书字号 */
function checkAgentQualificationNumber(str) {
    return "";
}

/* 征收管理码 */
function checkLevyMangaeKey(str) {
    return "";
}

/* 邮编 */
function checkZipcode(str) {
    var reg = /^\d{6}$/;
    if (arr = str.match(reg) || str == "")
        return "";
    else
        return "非法邮编，邮编必须为6位数字";
}

/* select是否选择了值 */
function checkSelect(selectedIndex) {
    if (selectedIndex < 0) {
        return "必选的下拉列表框没有选择";
    }
    return "";
}

/* 手机 */
function checkMphone(str) {
    var reg = /^\d{11}$/;
    if (arr = str.match(reg) || str == "")
        return "";
    else
        return "非法手机号码";

}

function IsDate(str) {
    // formatString = formatString || "ymd";
    var formatString = "ymd";
    var m, year, month, day;
    switch (formatString) {
        case "ymd" :
            m = str.match(new RegExp("^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})$"));
            if (m == null) return false;
            day = m[6];
            month = m[5]--;
            year = (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
            break;
        case "dmy" :
            m = str.match(new RegExp("^(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))$"));
            if (m == null) return false;
            day = m[1];
            month = m[3]--;
            year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10));
            break;
        default :
            break;
    }
    if (!parseInt(month)) return false;
    month = month == 12 ? 0 : month;
    var date = new Date(year, month, day);
    return (typeof (date) == "object" && year == date.getFullYear() && month == date.getMonth() && day == date.getDate());

    function GetFullYear(y) {
        return ((y < 30 ? "20" : "19") + y) | 0;
    }
}

function checkDate(str) {
    if (!IsDate(str)) {
        return "日期格式不正确";
    }
    return "";
}

function IsDateTime(str) {

    var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    var r = str.match(reg);
    if (r == null) return false;
    var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
}

function checkDatetime(str) {
    if (!IsDate(str)) {
        if (!IsDateTime(str)) return "日期时间格式不正确";
    }
    return "";
}

function SetError(cid, err, mode) {
    if (mode == 2) {
        var strErrID = cid.id + "_err";
        var ErrID = document.getElementById(strErrID);
        if (ErrID != null) {
            if (navigator.appName.indexOf("Explorer") > -1) {
                ErrID.innerText = err;
            } else {
                ErrID.textContent = err;
            }

            if (err == "") ErrID.style.color = "";
            else ErrID.style.color = "red";

        }
    } else {
        cid.focus();
        cid.select();
        alert(err);
    }

    return mode;
}


// ×××××××××××命名规则：每个checkType的值都要以一个分号（;）结束××××××××××××//
// ×××××××××××判断可空否：如果控件可以为空，checkType的第一个值为“null”；若要检测非空用“empty”×××××××××××//
// mode模式 1表示弹出提示框 2 表示错误显示在label中 label名称=出错控件名+_err
function checkdata(formname, mode) {

    var e = document.getElementById(formname);
    // var e=document.forms[formname];
    var strErr = "";
    var strValue = "";
    var strR = "";
    var eid;
    var errTip = "";
    for (var i = 0; i < e.length; i++) {
        var ele = e[i];

        if (ele.name != null) {
            if (ele.required == "yes" && ele.selectedIndex == 0) {
                strErr = "下拉菜单没有选择值！";
                ele.focus();
                return false;
            }
            var maxlen = ele.getAttribute("maxlength");
            if (maxlen) {
                var intmaxlen = Number(maxlen);
                if (ele.nodeName == "TEXTAREA") {
                    strValue = ele.value;
                    if (strValue.length > intmaxlen) {
                        eid = ele;
                        strErr = strErr + "超过最大长度";
                        if (SetError(eid, "超过最大长度", mode) == 1) return false;
                    }
                }
            }
            var checkType = ele.getAttribute("checkType");
            if (checkType) {
                // 分解checkType的值，判断是否是多种校验

                var str = checkType.toLowerCase();

                var checkContent = str.split(";");
                var checkAccount = checkContent ? checkContent.length : 0;


                strValue = ele.value;
                eid = ele;
                // add start
                errTip = ele.errTip;
                // add end

                if (mode == 2) SetError(eid, "", 2);

                for (j = 0; j < checkAccount; j++) // 多校验循环
                {
                    if (!checkContent[j]) {
                        continue;
                    }
                    var sc = checkContent[j];
                    // alert("sc="+sc);

                    if (sc == "english")  // english 为检查英文
                    {

                        strR = checkEnglish(strValue);

                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }

                    if (sc == "chinese")  // english 为检查英文
                    {
                        strR = checkChinese(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }

                    if (sc == "string")  // string 为检查输入串中是否有非法字符
                    {
                        strR = checkString(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "integer")  // integer 为检查输入串是否全是数字
                    {
                        strR = checkInteger(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "float")  // float 为检查输入串是否是浮点型数字
                    {
                        strR = checkFloat(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "date")  // date 为检查日期格式是否正确
                    {
                        strR = checkDate(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "datetime")  // date 为检查日期格式是否正确
                    {
                        strR = checkDatetime(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "certificate")  // certificate 为检查身份证件号码
                    {
                        strR = checkCertificate1(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "id")  // id 为检查纳税人识别号是否正确
                    {
                        strR = checkId(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "email")  // email 为检查Email格式是否正确
                    {
                        strR = checkEmail(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "year")  // year 为检查年格式是否正确
                    {
                        strR = checkYear(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "month")  // month 为检查月格式是否正确
                    {
                        strR = checkMonth(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "day")  // day 为检查日格式是否正确
                    {
                        strR = checkDay(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "telephone")  // telephone 为检查电话号码
                    {
                        strR = checkTelephone(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }

                    if (sc == "organizationCode")  // organizationCode 为检查组织机构代码
                    {
                        strR = checkOrganizationCode(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "affirmNumber")  // affirmNumber 为检查批准文号
                    {
                        strR = checkAffirmNumber(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "businessLicenceNumber")  // businessLicenceNumber 为检查营业执照字号
                    {
                        strR = checkBusinessLicenceNumber(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "bankaccount")  // bankaccount 为检查银行账号
                    {
                        strR = checkBankAccount(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "numericalValue")  // numericalValue 为检查数值型校验
                    {
                        strR = checkNumericalValue(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "stallId")  // stallId 为检查摊位号
                    {
                        strR = checkStallId(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "http")  // http 为检查网址
                    {
                        strR = checkHttp(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "percent")  // percent 为检查百分比
                    {
                        strR = checkPercent(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "agentQualificationNumber")  // agentQualificationNumber
                    // 为检查代理人资格证书字号
                    {
                        strR = checkAgentQualificationNumber(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "levyMangaeKey")  // levyMangaeKey 为检查征收管理码
                    {
                        strR = checkLevyMangaeKey(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "zipcode")  // zipcode 为检查邮政编码
                    {
                        strR = checkZipcode(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "empty")  // empty 为检查是否为空checkSelect
                    {
// alert(strValue);
                        // 如果jsp页面元素没有errTip属性，调用checkEmpty(strValue)；否则调用checkEmptyTip(strValue,errTip)
                        if (errTip == "" || errTip == null)
                            strR = checkEmpty(strValue);
                        else
                            strR = checkEmptyTip(strValue, errTip);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }
                    if (sc == "mphone")  // mphone 为检查手机号
                    {

                        if (errTip == "" || errTip == null)
                            strR = checkMphone(strValue);
                        else
                            strR = checkEmptyTip(strValue, errTip);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }
                    }

                    /*  if(sc=="wyhtc"){

                          strR=checkWyhtc(strValue);
                          if (strR!="")
                          {
                              strErr=strErr+strR;
                              if (SetError(eid,strR,mode)==1) return false;
                          }

                      }*/

                    if (sc == "tc") {

                        strR = checkTc(strValue);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (SetError(eid, strR, mode) == 1) return false;
                        }

                    }


                    if (sc == "select")  // 为检查select是否有选中值
                    {
                        strR = checkSelect(eid.selectedIndex);
                        if (strR != "") {
                            strErr = strErr + strR;
                            if (mode == 2) {
                                var strErrID = eid.id + "_err";
                                var ErrID = document.getElementById(strErrID);
                                if (ErrID != null) ErrID.innerText = err;
                            } else {
                                eid.focus();
                                alert(err);
                                return false;
                            }
                        }
                    }


                }// for循环(多校验循环)结束

                // 可以根据此框架扩展....
            }
        }
    }
    if (strErr == "") return true;
    else return false;
}


function checkpassword(form) {
    if (form.confirmPassword.value != form.password.value) {
        alert("\两次密码输入不一致 !!");
        return false;
    }
    return true;
}

function checkDateAhead1(year1, month1, day1, year2, month2, day2) {
    var strdate1 = year1 + "" + month1 + "" + day1;
    var strdate2 = year2 + "" + month2 + "" + day2;
    var date1 = new Number(strdate1);
    var date2 = new Number(strdate2);
    // alert(date1+" < "+date2)
    return date1 < date2;
}

function checkDateAhead(year1, month1, day1, year2, month2, day2) {

    var aheadYear = new Number(year1);
    var curDate = new Date();
    var backYear = year2 ? new Number(year2) : curDate.getYear();
    if (aheadYear < backYear) {
        return true;
    }
    if (aheadYear > backYear) {
        return false;
    }
    var aheadMonth = new Number(month1);
    var backMonth = month2 ? new Number(month2) : curDate.getMonth() + 1;
    if (aheadMonth < backMonth) {
        return true;
    }
    if (aheadMonth > backMonth) {
        return false;
    }
    var aheadDay = new Number(day1);
    var backDay = day2 ? new Number(day2) : curDate.getDay() + 1;
    if (aheadDay < backDay) {
        return true;
    }
    if (aheadDay > backDay) {
        return false;
    }
    return false;
}

function getDateInterval(year1, month1, day1, year2, month2, day2) {
    var aheadYear = new Number(year1);
    var aheadMonth = new Number(month1);
    var aheadDay = new Number(day1);
    var curDate = new Date();
    var backYear = year2 ? new Number(year2) : curDate.getYear();
    var backMonth = month2 ? new Number(month2) : curDate.getMonth() + 1;
    var backDay = day2 ? new Number(day2) : curDate.getDay() + 1;
    var retInterval = Date.UTC(backYear, backMonth, backDay) - Date.UTC(aheadYear, aheadMonth, aheadDay);
    return retInterval;

}

function checkSnUsed(webroot, snValue) {
    var urlPath = webroot + "/checkSnUsed.do?taxpayerId=" + snValue;
    // alert("urlPath=" + urlPath);
    window.open(urlPath, "checkSnUsed", "left=100000, top=1,resizable=no");

}

function confirmSn(snValue) {
    var confirmsn = window.prompt("请核对输入的纳税人识别号:", "");
    if (snValue == confirmsn) {
        return true;
    } else {
        alert("纳税人识别号核对不正确，请检查纳税人识别号");
        return false;
    }
}

function checkLength(value, len, err) {
// var a = 0;
// for(var i = 0;i<value.length;i++){
// if(value.charCodeAt(i)>127||value.charCodeAt(i)==94){
// a+=2;
// }else
// a++;
// }
    if (value.length > len) {
        alert(err + "输入长度大于限制长度！限制为" + len + "字！");
        this.focus();
        return true;
    } else
        return false;
}


function checkLength2(value, len, err) {
    var a = 0;
    for (var i = 0; i < value.length; i++) {
        if (value.charCodeAt(i) > 127 || value.charCodeAt(i) == 94) {
            a += 2;
        } else
            a++;
    }
    if (a > len) {
        alert(err + "输入长度大于限制长度！当前已有" + a + "字节，限制为" + len + "字节（1个中文占2个字节）！");
        this.focus();
        return true;
    } else
        return false;
}

