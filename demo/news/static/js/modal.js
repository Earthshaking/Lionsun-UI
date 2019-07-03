/**================================================================
 * 名称：modal.js
 * 描述：基于 layer 封装自定义模态框
 * 作者：方凌松
 ================================================================*/

/**
 * @description: 提示弹窗
 * @param type
 * @param content
 * @param callback
 * @returns: obj
 */
function alertModal(type, content, callback) {

    layer.config({
        extend: 'custom/style.css',
        skin: 'layer-ext-custom'
    });

    if (type == 3) {
        layer.open({
            id: 'layerModal',
            type: 1,
            content: getModalElement(type, content),
            area: ["299px", "138px"],
            title: false,
            shadeClose: true,
            resize: false,
            closeBtn: false,
            maxmin: false,
            success: function (layero, index) {
                layero.find(".btn-yes").on("click", function () {
                    if (typeof callback == "function") {
                        // 如果是，则立即执行
                        callback(index);
                    }
                });
                layero.find(".btn-cancel").on("click", function () {
                    layer.close(index);
                });

            }
        });
    } else {
        layer.open({
            id: 'layerModal2',
            type: 1,
            content: getModalElement(type, content),
            area: ["299px", "101px"],
            title: false,
            shadeClose: true,
            resize: false,
            closeBtn: false,
            maxmin: false,
            success: function (layero, index) {
                // 判断callback是否为一个函数
                if (typeof callback == "function") {
                    // 如果是，则立即执行
                    callback();
                }
                setTimeout(function () {
                    layero.fadeOut(2000, function () {
                        layer.close(index);
                    });
                }, 1000);
                layero.find(".closeButton").on("click", function () {
                    layer.close(index);
                });
            },
            cancel: function (index, layero) {

            },
            end: function () {

            }
        });
    }
}

function getModalElement(type, content) {

    var html = "";
    var btnHtml = "";
    var paths = "/zhinao/resources/mystyle/static/images/";
    if (type == 1) { // 正确的
        // html += "<i class='fa fa-check-circle-o text-success'></i>";
        html += "<img src='" + paths + "icon-ok.png' alt='ok-icon'>";
    } else if (type == 2) {   // 错误的
        // html += "<i class='fa fa-times-circle text-danger'></i>";
        html += "<img src='" + paths + "icon-times.png' alt='times-icon'>";
    } else if (type == 3) {   // 询问的
        // html += "<i class='fa fa-times-circle'></i>";
        html += "<img src='" + paths + "icon-question.png' alt='question-icon'>";
        btnHtml += "<div class='card-footer bn bg-white bsn pt0 text-center pb20'>" +
            "               <button class='btn btn-yes mr5' style='height: 31px;line-height: 1;width: 80px;' type='button'>确定</button>" +
            "               <button class='btn btn-cancel ml5' style='height: 31px;line-height: 1;width: 80px;' type='button'>取消</button>" +
            "           </div>";
    } else if (type == 4) {      // 提示的
        // html += "<i class='fa fa-times-circle'></i>";
        html += "<img src='" + paths + "icon-warning.png' alt='warning-icon'>";
    }
    return " <div class=\"card bn alerttext\">\n" +
        "           <div class=\"card-body bn\">\n" +
        "               " + html + "<span>" + content + "</span>\n" +
        "           </div>\n" + btnHtml +
        "        </div>";
}




