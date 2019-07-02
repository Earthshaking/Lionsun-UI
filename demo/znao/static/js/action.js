$.validator.setDefaults({
    focusInvalid: true,
    submitHandler: function (form) {
        var formData = $.Util.serializeJSON($(form));
        var actionType = $(form).attr('data-submit');

        // LogJson("数据", formData);
        submitForm(actionType,formData,function () {
        
        });
    }
});

function verdictType() {

}

/**
 * 根据自定义表单的data-submit属性值来判断提交的数据和方式
 * @param type
 * @param formdata
 * @param callback
 */
function submitForm(type, formdata, callback) {
    
    /**
     * security：    实名认证
     * login：       登录
     * register：    注册
     * addArticle：  发布文章
     * uploadPhoto： 上传图片或者头像
     * updatePsd：   修改密码
     * updateUser：  修改个人资料
     */
    
    
    if (type == "security") {
        $.get('../tepl/security.html', function (data) {
            showModal(['455px', '365px'], data, function () {
            });
        });
    }
    
    
    
}


function Action() {
    
    /**
     * 登录
     * @constructor
     */
    this.Login = function () {
        var forms = $("#loginForm");
        
        console.log(formData);
    };
    
    /**
     * 注册
     * @constructor
     */
    this.Register = function () {
    
    };
    
    return this;
}


window.Action = new Action();

