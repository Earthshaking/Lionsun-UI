//合计
function total() {

    // 获取选中的行
    var much = $('.shop-box').find("input[name='check']:checked");

    // 合计金额
    var all_total =0;

    // 循环遍历选中的行
    much.each(function (i, dom) {

        //获取选中的行数量
        var num = $(dom).length;

        //获取选中行的金额小计
        var much_price = $(dom).parent('.checkbox').parent('.product').find('.this-price').text();

        //计算每行小计的总和
        all_total += parseInt(much_price*num);
    });

    // 显示合计金额
    $("#allprice").html(all_total.toFixed(2));
}

// 单项小计
function this_total() {

    // 获取每行
    var $row = $("#shop-list").find('.shop-box');

    // 循环遍历每行
    $row.each(function (i, dom) {

        //每行商品数量
        var num = parseInt($(dom).find(".pnumber").val());

        //每行商品单价
        var price = $(dom).find(".now-price").text();

        //每行的金额小计
        var ever_price = num * price;

        //显示金额小计
        $(dom).find(".this-price").text(ever_price.toFixed(2));
    });

    // 重新计算总计金额
    total();

}

$(function () {

    // 减少数量
    $(".reduce").on("click", function () {
        var $num = $(this).parent(".number-wrap").children(".pnumber");
        if ($num.val() - 0 > 1) {
            $num.val($num.val() - 1);
            this_total();
        }
    });

    //增加数量
    $(".insert").on("click", function () {
        var $num = $(this).parent(".number-wrap").children(".pnumber");
        $num.val($num.val() - 0 + 1);
        this_total();
    });

    //点击全选按钮
    $("#all-select").click(function () {
        if ($(this).attr("checked")) {
            $("input[name='check']").attr("checked", true);
            total();
        } else {
            $("input[name='check']").attr("checked", false);
            total();
        }
    });

    //点击复选框
    $("input[name='check']").change(function () {
        if ($("input[name='check']").not("input:checked").size() <= 0) {
            $("#all-select").attr("checked", true);
            total();
        } else {
            $("#all-select").attr("checked", false);
            total();
        }
    });

    $(".pnumber").blur(this_total);

    this_total();
    total();
});