//==========================================================
//                   PORTFOLIO SCRIPTS
//==========================================================

/****************************************************
*                  HEADER FUNCTIONS
*/
function moveObject(target, divider) {
    var origMarLeft = parseInt(target.css('margin-left').slice(0, -2));
    var origMarTop = parseInt(target.css('margin-top').slice(0, -2));
    $(window).on('mousemove', (e) => {
        var curX = e.pageX;
        var curY = e.pageY;
        var wW = $(window).width();
        var wH = $(window).height();
        var newMarLeft, newMarTop;
        if (curX < wW / 2) {
            newMarLeft = origMarLeft + (wW/2-curX)/divider;
            target.css('margin-left', newMarLeft + 'px');
        } else {
            newMarLeft = origMarLeft - (wW/2+curX)/divider + (wW)/divider;
            target.css('margin-left', newMarLeft + 'px');
        }
        if (curY < wH / 2) {
            newMarTop = origMarTop + (wH/2-curY)/divider;
            target.css('margin-top', newMarTop + 'px');
        } else {
            newMarTop = origMarTop - (wH/2+curY)/divider + (wH)/divider;
            target.css('margin-top', newMarTop + 'px');
        }
    });
};
if ($(window).width() > 1330) {
    // $(".headerContainer").find('*').removeAttr("style");
    moveObject($('.pf-logo-grp1'),100);
    moveObject($('.pf-logo-grp2'),50);
    moveObject($('.pf-logo-grp3'),600);
} else {
    // $(".headerContainer").find('*').removeAttr("style");
    moveObject($('.pf-logos'),100);
}





/****************************************************
*                  HEADER FUNCTIONS
*/

