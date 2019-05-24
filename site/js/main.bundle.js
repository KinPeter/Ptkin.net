/*
* included file: ./pageloader.js
*/

//Primary domain:
const domain = "https://www.p-kin.com"

const page = {
    sections: [
        {section: '#carousel-section', file: 'carousel.html'},
        {section: '#navbar-section', file: 'navbar.html'},
        {section: '#about-section', file: 'about.html'},
        {section: '#portfolio-section', file: 'portfolio.html'},
        {section: '#links-section', file: 'links.html'},
        {section: '#travels-section', file: 'travels.html'},
        {section: '#contact-section', file: 'contact.html'},
    ],
    init() {
        this.loadAllSections().then(() => {
            console.log('done');
            general.init();
            cv.init();
            this.hideElements();
        });
    },
    loadAllSections() {
        return new Promise(resolve => {
            for (let i = 0, p = Promise.resolve(); i < page.sections.length; i++) {
                let current = page.sections[i];
                p = p.then(() => page.loadHtml(current.section, current.file)
                .then(() => {
                    if (i == page.sections.length-1) resolve();
                }));
            }            
        });
    },
    loadHtml(domElement, fileName) {
        return new Promise(resolve => {
            $.get(`./site/html/${fileName}`).done(result => {
                $(domElement).html(result);
                console.log(domElement)
                resolve();
            });
        });
    },
    hideElements() {
        //initially hide the password div
        $(".downloadCVwrapper").hide();
        
    }
}


/*
* included file: ./cv.js
*/

//==========================================================
//                     HOMEPAGE ONLY
//==========================================================
const cv = {
    init() {
        this.togglePasswordListener();
        this.CVRequestListener();
        console.log('cv loaded')
    },
    togglePasswordListener() {
        $('#downloadCVtitle').click(() => {
            $('.downloadCVwrapper').slideToggle('500', general.scrollDown(300)); 
        });
    },
    CVRequestListener() {
        $('#CVSubmit').click(() => cv.sendCVRequest());  
    },
    sendCVRequest() {
        //AJAX post method to check the password
        $.post(`${domain}/site/php/passvalid.php`, {pass: $('#passwordInput').val()}, (response) => {
            //clear password field
            $('#passwordInput').val('');
            //check the response from the php
            if (response == 1) {
                //an other post method to get the link
                $.post(`${domain}/site/php/getlink.php`, {response: response}, (link) => {
                    //give response message
                    $('#passwordResult').html(`<p>Thank you! The download should have been started already, if not, please click <a href="${link}" target="_blank">here</a>.</p>`);
                    //open link automatically in new tab
                    cv.openInNewTab(link);
                });   
            } else {
                $('#passwordResult').html('<p>Sorry, the password is incorrect. Please try again!</p>');
            }
        });
    },
    openInNewTab(url) {
        //opens a link in new tab with focus
        let win = window.open(url, '_blank');
        win.focus();
    },
}


/*
* included file: ./general.js
*/

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




/*
* MAIN file:
*/

/*@include: ./pageloader.js, ./cv.js, ./general.js, ./portfolio.js, ./autocomplete.js, ./links.js, travels.js, ./contact.js @end*/

page.init();
