//==========================================================
//                   PORTFOLIO SCRIPTS
//==========================================================
const portfolio = {
    init() {
        this.animateArrows();
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
    }
}
/*
no-boostrap, plain jquery
hide details --> on click : animate enlarge pic, toggle content 
(like links search box)
use this.hasclass(show) : add/removeclass(show) or something like that
*/