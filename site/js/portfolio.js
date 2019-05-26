//==========================================================
//                   PORTFOLIO SCRIPTS
//==========================================================
const portfolio = {
    init() {
        this.animateArrows();
        this.showDetailsToggleListener();
    },
    setArrow: (id) => $(id).css({'color':'white' , 'transform' : 'scale(1, 1)'}),
    resetArrow: (id) => $(id).css({'color':'darkorange' , 'transform' : 'scale(1, 0.7)'}),
    animateArrows() {
        this.setArrow('#pf-arrow-1');
        setTimeout(() => {
            this.resetArrow('#pf-arrow-1');
            this.setArrow('#pf-arrow-2');
            setTimeout(() => {
                this.resetArrow('#pf-arrow-2');
                this.setArrow('#pf-arrow-3');
                setTimeout(() => {
                    this.resetArrow('#pf-arrow-3');
                }, 50)
            }, 50)
        }, 50)
        setTimeout(() => {
            return this.animateArrows();
        }, 1000)
    },
    showDetailsToggleListener() {        
        $('.pf-title-row').click(function() {
            let collapse = $(this).next('.pf-details'); 
            let myDiv = $(this).parent();
            let imageDiv = $(this).parent().next('.pf-img-div');
            let image = imageDiv.find('img');

            if ($(window).width() > 768) {
                if (collapse.hasClass('expanded')) {
                    collapse.removeClass('expanded');
                    image.animate({width: '20%', opacity: .05}, 500, 'easeOutCubic', () => {
                        myDiv.removeClass('col-md-6').addClass('col-md-9');
                        imageDiv.removeClass('col-md-6').addClass('col-md-3');
                        image.animate({width: '100%', opacity: 1}, 500, 'easeInCubic');
                    });  
                } else {
                    collapse.addClass('expanded');
                    image.animate({width: '20%', opacity: .05}, 500, 'easeOutCubic', () => {
                        myDiv.removeClass('col-md-9').addClass('col-md-6');
                        imageDiv.removeClass('col-md-3').addClass('col-md-6');
                        image.animate({width: '100%', opacity: 1}, 500, 'easeInCubic');
                    });
                }
            }
            collapse.toggle('slow');
        });
    },
}
/*
no-boostrap, plain jquery
hide details --> on click : animate enlarge pic, toggle content 
(like links search box)
use this.hasclass(show) : add/removeclass(show) or something like that
*/