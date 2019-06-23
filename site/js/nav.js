//==========================================================
//                   GENERAL BEHAVIORS
//==========================================================
const nav = {
    init() {
        this.collapseNavbarListener();
        this.navbarAndLinkClickListener();
        this.scrollSpy();
        this.scrollListener();
        this.toTopListener();
        this.enterKeyListener();
    },
    collapseNavbarListener() {
        $('.nav-link').not('#funProjectsLink').click(() => $('.navbar-collapse').collapse('hide'));
    },
    navbarAndLinkClickListener() {
        $('#about-nav').click(() => this.scrollTo('#about-section'));
        $('#portfolio-nav, #portfolio-link').click(() => this.scrollTo('#portfolio-section'));
        $('#links-nav, #links-link').click(() => this.scrollTo('#links-section'));
        $('#travels-nav, #travels-link').click(() => this.scrollTo('#travels-section'));
        $('#cv-link').click(() => this.scrollTo('#downloadCVtitle'));
        $('#contact-nav').click(() => this.scrollDownToBottom());
    },
    toTopListener() {
        $('#p-logo, #backToTop').click(() =>$('html, body').animate({ scrollTop: 0}, 1000));
        $(window).scroll(() => {
            let scroll = $(window).scrollTop();
            if (scroll >= 200) $('#backToTop').fadeIn(500);
            else $('#backToTop').fadeOut(500);
        });
    },
    enterKeyListener() {
        $('#linksInput').keypress((e) => {if (e.which == 13) $('#linksSubmit').click()}); 
        $('#passwordInput').keypress((e) => {if (e.which == 13) $('#CVSubmit').click()}); 
    },
    addStickyNavbar() {
        setTimeout(() => {$('#navbar-section').addClass('sticky-top');}, 1000);
        
    },
    scrollDownToBottom() {
        $('html, body').animate({ scrollTop: $(document).height()-$(window).height() }, 1000);
    },
    scrollDown(pixels) {
        $('html, body').animate({ scrollTop: `+=${pixels}` }, 1000);
    },
    scrollUp(pixels) {
        $('html, body').animate({ scrollTop: `-=${pixels}` }, 1000);
    },
    scrollTo(element) {
        let diff = $(window).width() > 500 ? 100 : 320;
        $('html, body').animate({ scrollTop: $(element).offset().top - diff }, 1000);
    },
    scrollSpy() {
        const sections = ['#about-section', '#portfolio-section', '#links-section', '#travels-section', '#contact-section'];
        const navs = ['#about-nav', '#portfolio-nav', '#links-nav', '#travels-nav', '#contact-nav'];
        let currentIndex;
        for (let i = 0; i < sections.length; i++) {
            // let diff = $(window).width() > 500 ? 120 : 340;
            let diff = 340;
            if ( $(sections[i]).offset().top - diff <= $(window).scrollTop() ||
                // if we are at the bottom, "force it" so #contact will also work
                $(document).height()-$(window).height() == $(window).scrollTop()) {
                    currentIndex = i;
            }
        }
        $('.nav-link').removeClass('active');
        $(`.navbar-nav ${navs[currentIndex]}`).addClass('active');
    },
    scrollListener() {
        $(window).scroll(() => this.scrollSpy());
    }
}