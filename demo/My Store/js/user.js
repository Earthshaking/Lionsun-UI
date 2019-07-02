$(function () {
    var $sex = $("#sex-bs").html();

    if ($sex == "男") {
        $("#boy").attr("checked", "true");
    }
    if ($sex == '女') {
        $("#girl").attr("checked", "true");
    }
    if ($sex == null) {
        $("#girl,#boy").attr("checked", "false");
    }

    $("#a-order").click(function () {
        $("#oder-submenu").slideToggle("fast");
    });

    $("#a-info").click(function () {
        $("#info-submenu").slideToggle("fast");
    });


});