
// 校验姓名
function checkName() {

    var $name = $("#name").val();

    if ($name == "") {
        $("#name").addClass('erro-input');
        $("#name-erro-wrap").show();
        $("#name-erro").html("姓名不能为空");
        return false;
    }
    $("#name").removeClass('erro-input');
    $("#name-erro-wrap").hide();
    $("#name-erro").html("");
    return true;
}

//  校验用户名
function checkAccount() {
    var $account = $("#account").val();
    if ($account == "") {
        $("#account").addClass('erro-input');
        $("#account-erro-wrap").show();
        $("#account-erro").html("用户名不能为空");
        return false;
    } else if ($account.length < 8) {
        $("#account").addClass('erro-input');
        $("#account-erro-wrap").show();
        $("#account-erro").html("用户名不能少于8个字符");
        return false;
    } else if ($account.length > 12) {
        $("#account").addClass('erro-input');
        $("#account-erro-wrap").show();
        $("#account-erro").html("用户名不能超过12个字符");
        return false;
    }
    $("#account").removeClass('erro-input');
    $("#account-erro-wrap").hide();
    $("#account-erro").html("");
    return true;
}

//  校验密码
function checkPsd1() {
    var $psd = $("#psd1").val();
    if ($psd == "") {
        $("#psd1").addClass('erro-input');
        $("#psd1-erro-wrap").show();
        $("#psd1-erro").html("密码不能为空");
        return false;
    } else if ($psd.length < 6) {
        $("#psd1").addClass('erro-input');
        $("#psd1-erro-wrap").show();
        $("#psd1-erro").html("密码不能少于6个字符");
        return false;
    } else if ($psd.length > 15) {
        $("#psd1").addClass('erro-input');
        $("#psd1-erro-wrap").show();
        $("#psd1-erro").html("密码不能超过12个字符");
        return false;
    }
    $("#psd1").removeClass('erro-input');
    $("#psd1-erro-wrap").hide();
    $("#psd1-erro").html("");
    return true;
}

//  校验确认密码
function checkPsd2() {
    var $psd1 = $("#psd1").val();
    var $psd2 = $("#psd2").val();
    if ($psd1 != $psd2) {
        $("#psd2").addClass('erro-input');
        $("#psd2-erro-wrap").show();
        $("#psd2-erro").html("两次密码输入不一致");
        return false;
    } else if ($psd1 == "") {
        $("#psd2").addClass('erro-input');
        $("#psd2-erro-wrap").show();
        $("#psd2-erro").html("两次密码输入不一致");
        return false;
    }
    $("#psd2").removeClass('erro-input');
    $("#psd2-erro-wrap").hide();
    $("#psd2-erro").html("");
    return true;
}

//  校验手机号码
function checkPhone() {
    var $phe = $("#phone").val();
    if ($phe.length < 11) {
        $("#phone").addClass('erro-input');
        $("#phone-erro-wrap").show();
        $("#phone-erro").html("手机号码不正确");
        return false;
    } else if ($phe.length == "") {
        $("#phone").addClass('erro-input');
        $("#phone-erro-wrap").show();
        $("#phone-erro").html("手机号码不能为空");
        return false;
    }
    $("#phone").removeClass('erro-input');
    $("#phone-erro-wrap").hide();
    $("#phone-erro").html("");
    return true;
}

//  聚焦失焦时执行的方法
$(function () {
    $("#name").blur(checkName);
    $("#account").blur(checkAccount);
    $("#psd1").blur(checkPsd1);
    $("#psd2").blur(checkPsd2);
    $("#phone").blur(checkPhone);
});

//  表单提交
$(function () {
    $(".register-page").submit(function () {
        var flag = true;
        if (!checkName()) {
            flag = false;
        }
        if (!checkAccount()) {
            flag = false;
        }
        if (!checkPsd1()) {
            flag = false;
        }
        if (!checkPsd2()) {
            flag = false;
        }
        if (!checkPhone()) {
            flag = false;

        }
        if (!checkName() || !checkAccount() || !checkPsd1() || !checkPsd2() || !checkPhone()) {
            $("#register_form").removeClass('shake_effect');
            setTimeout(function () {
                $("#register_form").addClass('shake_effect')
            }, 1);
        }
        return flag;
    });
});