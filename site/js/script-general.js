//==========================================================
//                   GENERAL BEHAVIORS
//==========================================================

//collapse the navbar after click
$(".nav-link").not('#funProjectsLink').click(function(){
    $(".navbar-collapse").collapse("hide");
})
//function to scroll to the bottom
function scrollDown() {
    $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
}

//pointer cursors, scroll functions
$(".nav-link, #peters, #backToTop, #linksSearchToggle, #downloadCVtitle").hover(function() {
    $(this).css("cursor", "pointer");
})
$("#homePageContactNav").click(function() {
    scrollDown();
})
$("#homePageHomeNav, #peters, #backToTop").click(function() {
    $("html, body").animate({ scrollTop: 0});
})
$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 200) {
        $("#backToTop").fadeIn(500);
    } else {
        $("#backToTop").fadeOut(500);
    }
});



//$(".nav-item").click(function() {
//    $("html").fadeOut(500, function() {
//        window.location.reload();
//    });
//});


