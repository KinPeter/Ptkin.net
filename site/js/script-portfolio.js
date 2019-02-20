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


var setArrow = (id) => $(id).css({'color':'orange' , 'transform' : 'scale(1, 1)'});
var resetArrow = (id) => $(id).css({'color':'black' , 'transform' : 'scale(1, 0.7)'});

function downArrows() {
    setArrow('#pf-arrow-1');
    setTimeout(() => {
        resetArrow('#pf-arrow-1');
        setArrow('#pf-arrow-2');
        setTimeout(() => {
            resetArrow('#pf-arrow-2');
            setArrow('#pf-arrow-3');
            setTimeout(() => {
                resetArrow('#pf-arrow-3');
            }, 50)
        }, 50)
    }, 50)

    setTimeout(() => {
        downArrows();
    }, 1000)
}
downArrows();

// function setArrow(id) {$(id).css({'color':'orange' , 'transform' : 'scale(1.1, 0.7)'});}
// function resetArrow(id) {$(id).css({'color':'black' , 'transform' : 'scale(1, 0.7)'});}    
// function downArrows() {
//     $('#pf-arrow-1').css({'color':'orange' , 'transform' : 'scale(1.1, 0.7)'});
//     setTimeout(() => {
//         $('#pf-arrow-1').css({'color':'black' , 'transform' : 'scale(1, 0.7)'});
//         $('#pf-arrow-2').css({'color':'orange' , 'transform' : 'scale(1.1, 0.7)'});
//         setTimeout(() => {
//             $('#pf-arrow-2').css({'color':'black' , 'transform' : 'scale(1, 0.7)'});
//             $('#pf-arrow-3').css({'color':'orange' , 'transform' : 'scale(1.1, 0.7)'});
//             setTimeout(() => {
//                 $('#pf-arrow-3').css({'color':'black' , 'transform' : 'scale(1, 0.7)'});
//             }, 50)
//         }, 50)
//     }, 50)

//     setTimeout(() => {
//         downArrows();
//     }, 1000)
// }
// downArrows();




/****************************************************
*                  HEADER FUNCTIONS
*/

