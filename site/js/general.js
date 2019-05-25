//==========================================================
//                   GENERAL BEHAVIORS
//==========================================================
const general = {
    init() {
        this.collapseNavbarListener();
        this.contactClickListener();
        this.toTopListener();
        this.enterKeyListener();
    },
    collapseNavbarListener() {
        //collapse the navbar after click
        $('.nav-link').not('#funProjectsLink').click(() => $('.navbar-collapse').collapse('hide'));
    },
    contactClickListener() {
        $('#homePageContactNav').click(() => general.scrollDownToBottom());
    },
    toTopListener() {
        $('#homePageHomeNav, #peters, #backToTop').click(() =>$('html, body').animate({ scrollTop: 0}));
        $(window).scroll(() => {
            let scroll = $(window).scrollTop();
            if (scroll >= 200) $('#backToTop').fadeIn(500);
            else $('#backToTop').fadeOut(500);
        });
    },
    enterKeyListener() {
        /*** */
        ////TODOOOO
        /*** */
        $('#linksInput').keypress(function (e) {
            var key = e.which;
            if (key == 13) {$('#linksSubmit').click(); return false;}
        }); 
        $('#passwordInput').keypress((e) => {
            let key = e.which;
            if (key == 13) {$('#CVSubmit').click();}
        }); 
    },
    scrollDownToBottom() {
        $('html, body').animate({ scrollTop: $(document).height()-$(window).height() });
    },
    scrollDown(pixels) {
        $('html, body').animate({ scrollTop: `+=${pixels}` }, 500);
    }
}