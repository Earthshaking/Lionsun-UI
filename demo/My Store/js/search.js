$(function () {

    setTimeout(function () {
        $(".box-wrap:eq(0)").css("display","none")
    },1000);

    $(".success-dialog").hide();
    $(".add-shopping a").on("click",function () {
        $(".success-dialog").slideDown("fast");
        setTimeout(function () {
            $(".success-dialog").slideUp("fast");
        },2000);
    });
});