$(function () {
    var $user = $("#link-username").html();
    if ($user == "") {
        $(".head-a-link").css("display","block");
        $("#user-link").css("display","none");
    } else if($user != ""){
        $(".head-a-link").css("display", "none");
        $("#user-link").css("display", "block");
    }

    $(".nav-right li").hover(
        function () {
            $(this).css({
                "background-color": "rgba(246, 119, 119,.8)",
                "color": "#fff"
            });
            $(this).find('.a-btn').css('color', '#fff')
        }, function () {
            $(this).css({
                "background": "rgba(255,255,255,1)",
                "color": "#000"
            });
            $(this).find('.a-btn').css('color', '#000')
        }
    );

    $("#search-link").on("click", function (e) {
        if ($(".search-wrap").hasClass('hide-search')) {
            $(".search-wrap").toggleClass('hide-search show-search');
            $("#search-link").addClass('show-search-parent');
            $("#search-link").css('color','#fff');
        } else {
            $(".search-wrap").toggleClass('show-search hide-search');
            $("#search-link").removeClass('show-search-parent');
            $("#search-link").css('color', '#000');
        }
        e.stopPropagation();
    });

    $("#closer-search").on("click", function () {
        $(".search-wrap").toggleClass('show-search hide-search');
        $("#search-link").removeClass('show-search-parent');
        $("#search-link").css('color', '#000');
    });

    $(".show-search").on("click", function (e) {
        e.stopPropagation();
    });


});