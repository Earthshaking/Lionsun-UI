$(function () {
    $("#reduce").on("click", function () {
        var $num = $(this).parent(".btn-box").children("#product-num");
        if ($num.html() - 0 > 1) {
            $num.html($num.html() - 1);
        }
    });

    $("#insert").on("click", function () {
        var $num = $(this).parent(".btn-box").children("#product-num");
        $num.html($num.html() - 0 + 1);
    });

});