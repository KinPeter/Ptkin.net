/*
* included file: ./pageloader.js
*/

//Primary domain:
// const domain = 'https://cors-anywhere.herokuapp.com/https://old.p-kin.com';
const domain = 'https://old.p-kin.com';

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
            this.loadPortfolioJson().then(() => {
                console.log('All HTML loaded.');
                nav.init();
                about.init();
                cv.init();
                portfolio.init();
                links.init();
                autocomplete.init();
                travels.init();
                contact.init();
                this.hideElements(); 
                this.startCarousel();
            });                       
        });
    },
    loadAllSections() {
        return new Promise(resolve => {
            // Looping through the sections and loading them with each is a promise.
            // Loop starts with p as an immediately self-resolving promise.
            for (let i = 0, p = Promise.resolve(); i < page.sections.length; i++) {
                let current = page.sections[i];
                // In each iteration p will be a new promise (loadHtml).
                // It can go into the next iteration only when the previous promise is resolved.
                p = p.then(() => page.loadHtml(current.section, current.file)
                .then(() => {
                    // when we reach the end of the list, resolve the 'parent promise'
                    if (i == page.sections.length-1) resolve();
                }));
            }            
        });
    },
    loadHtml(domElement, fileName) {
        return new Promise(resolve => {
            $.get(`./site/html/${fileName}`).done(result => {
                $(domElement).html(result);
                console.log(domElement + ' loaded.');
                resolve();
            });
        });
    },
    loadPortfolioJson() {
        return new Promise(resolve => {
            $.get(`./site/json/portfolio.json`).done(result => {
                portfolio.items = result;
                console.log('Portfolio items loaded.')
                resolve();
            });
        });
    },
    hideElements() {
        $('.downloadCVwrapper, #linksWrapper, #linksMatches, #tags-matches, #emailform').hide();
        $('#loading-screen').fadeOut(500);
        nav.addStickyNavbar();
    },
    startCarousel() {
        $('.carousel').carousel({
            interval: 3500,
            pause: false,
            ride: 'carousel'
        });
    }
}


/*
* included file: ./nav.js
*/

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


/*
* included file: ./about.js
*/

const about = {
    init() {
        this.animateInAboutDivsOnScroll();
    },
    animateInAboutDivsOnScroll() {
        $(window).on('scroll', (e) => {
            if (!$('.about-divs-row div:nth-child(1)').hasClass('aboutDivAnimateIn')
                && $(window).scrollTop() > 90) {
                let i = 1;
                const interval = setInterval(() => {
                    $(`.about-divs-row>div:nth-child(${i++})`).addClass('aboutDivAnimateIn');
                    if (i > 4) clearInterval(interval);
                }, 200);
            }
            if (!$('.skills-row div:nth-child(1)').hasClass('aboutDivAnimateIn')
                && $(window).scrollTop() > 500) {
                let i = 1;
                const interval = setInterval(() => {
                    $(`.skills-row>div:nth-child(${i++})`).addClass('aboutDivAnimateIn');
                    if (i > 2) clearInterval(interval);
                }, 200);
            }
        });
    }
}


/*
* included file: ./cv.js
*/

//==========================================================
//                   CV DOWNLOAD SCRIPTS
//==========================================================
const cv = {
    init() {
        this.togglePasswordListener();
        this.CVRequestListener();
    },
    togglePasswordListener() {
        let open = false;
        $('#downloadCVtitle a').click((e) => {
            e.preventDefault();
            $('.downloadCVwrapper').slideToggle('500', () => {
                if (!open) {
                    open = true;
                    nav.scrollDown(200);   
                } else {
                    open = false;
                    nav.scrollUp(200);
                }
            }); 
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
* included file: ./portfolio.js
*/

//==========================================================
//                   PORTFOLIO SCRIPTS
//==========================================================
const portfolio = {
    items: [],
    init() {
        this.appendItemsToHtml();
        this.showDetailsToggleListener();
        this.closePortfolioListener();
    },
    closePortfolioListener() {
        $(window).scroll(() => {
            let scroll = $(window).scrollTop();
            if ($('#portfolio-items').hasClass('show')
                && scroll > $('#portfolio-section').offset().top
                && scroll < $('#links-section').offset().top - 500
                ) {
                $('#pf-close-collapse').fadeIn(500);
            }
            else $('#pf-close-collapse').fadeOut(500);
        });
        $('#pf-close-collapse').on('click', () => {
            nav.scrollTo('#portfolio-section');
            $('#portfolio-items').collapse('hide');
            $('#pf-close-collapse').fadeOut(500);
        });
    },
    showDetailsToggleListener() {
        $('.pf-row').click(function() {
            let collapse = $(this).find('.pf-details'); 
            let myDiv = $(this).children().first();
            let imageDiv = $(this).find('.pf-img-div');
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
    appendItemsToHtml() {
        this.items.forEach(item => {
            let html = this.composeHtml(item);
            $('#portfolio-items').append(html);
        });
    },
    composeHtml(item) {
        let html = "";
        // add starting parts
        html = html.concat( this.addTitleRow(item.name) );
        // iterate through badges
        item.badges.forEach(badge => html = html.concat( this.addBadge(badge) ));
        // add part between badges and features
        html = html.concat( this.addDescription(item.descr) ); 
        // iterate through features
        item.features.forEach(feature => html = html.concat( this.addFeature(feature.title, feature.text) ));
        // add image and finish html
        html = html.concat( this.addImageAndEndings(item.image, item.imageid, item.name) );
        return html;
    },
    addTitleRow(name) {
        return `<div class="container slide-in-left"><div class="row pf-row"><div class="col-md-9 pf-div pf-text-div"><div class="pf-title-row"><h4 class="pf-name">${name}</h4><div class="pf-badges">`;
    },
    addBadge(badge) { 
        return `<span class="badge">${badge}</span>`;
    },
    addDescription(descr) {
        return `</div><p class="pf-desc">${descr}</p></div><div class="pf-details"><div class="pf-features">`;
    },
    addFeature(name, descr) {
        return `<div class="pf-feature"><i class="fas fa-thumbs-up"></i>${name}</div>
        <p>${descr}</p>`;
    },
    addImageAndEndings(path, id, alt) {
        return `</div></div></div><div class="col-md-3 pf-div pf-img-div text-right"><img src="${path}" alt="${alt}" class="rounded pf-img" id="${id}"></div></div></div>`;
    }
}



/*
* included file: ./autocomplete.js
*/

//==========================================================
//                  AUTOCOMPLETE
//==========================================================
const autocomplete = {
    init() {
        this.preLoad();
        this.toggleListener();
        //set max width of autocomplete field depending on input field
        $('.ui-autocomplete').css('max-width', $('#linksInput').width() + 25);
    },
    preLoad() {
        //initiate autocomplete on load if checkbox is checked
        if ($('#autoCompleteCheck').attr('checked')) {
            //for links need to use the async function:
            links.getLinkNames().then((names) => {
                $('#linksInput').autocomplete({source: names});
            })
        }
    },
    toggleListener() {
        //toggle autocomplete with checkbox
        $('#autoCompleteCheck').click(function() {
            if ($('#autoCompleteCheck').is(':checked')) {
                $('#linksInput').autocomplete('enable');    
            } else {
                $('#linksInput').autocomplete('disable'); 
            }     
        });
    }
}


/*
* included file: ./links.js
*/

//==========================================================
//                      LINKS SCRIPTS
//==========================================================
const links = {
    init() {
        //show 'loading' while ajax call in progress
        $('.list-group').html('<li class="list-group-item">loading...</li>');
        this.searchToggleListener();
        this.searchButtonListener();
        this.tagButtonListener();
    },
    searchToggleListener() {
        $('#linksSearchToggle').click(() => $('#linksWrapper').toggle('slow')); 
    },
    searchButtonListener() {
        $('#linksSubmit').click(() => {
            this.searchFromAPI('#linksResults', $('#linksInput').val());
            $('#linksInput').val('');
            $(document).focus();
            $('#linksInput').autocomplete( 'close' );
        });
    },
    tagButtonListener() {
        $('.tag-buttons').on('click', 'button', function() {
            let tag = $(this).attr('data-tag');
            let tagName = $(this).html()
            console.log(tag);
            links.fillListByTag('#tags-results', tag, tagName);
        });
    },
    fillListByTag(domElement, tag, tagName) {
        $('#tags-matches').show();
        $(domElement).html('<li class="list-group-item">Loading...</li>');
        $('#tags-results-header').html(tagName);
        $.getJSON(`${domain}/dbadmin/server/linkserver.php?met=tag&tag=${tag}`, (data) => {
            if (!data) {
                return alert('No data was found :(');
            }
            //clear 'loading' text
            $(domElement).html('');
            //fill up the list
            data.forEach(link => {
                $(domElement).append(`<li class="list-group-item"><a href="${link.link_url}" target="_blank">${link.link_name}</a></li>`);
            });
        });
    },
    searchFromAPI(domElement, name) {
        $('#linksMatches').show();
        $.getJSON(`${domain}/dbadmin/server/linkserver.php?met=sr&name=${name}`, (data) => {
            //clear 'loading' text
            $(domElement).html('');
            //fill up the list
            data.forEach(link => {
                $(domElement).append(`<li class="list-group-item"><a href="${link.link_url}" target="_blank">${link.link_name}</a></li>`);
            });
        }).fail((xhr, status, message) => {
            $(domElement).html('');
            $(domElement).append('<li class="list-group-item">Unable to fetch data or link not found. :(</li>');
        });
    },
    async getLinkNames() {
        //function to fill the list for autocomplete
        try {
            let result = await fetch(`${domain}/dbadmin/server/linkserver.php?met=namelist`);
            let data = await result.json();
            let array = data.map((link) => link.link_name);
            return array;
        } catch (error) {
            alert('Sorry, autocomplete is out of order now. ->', error.message);
        }
    }
}



/*
* included file: travels.js
*/

//==========================================================
//                   TRAVELS SCRIPTS
//==========================================================
const travels = {
    init() {
        this.collapseToggleListener();
    },
    collapseToggleListener() {
        $('.travels-collapse-toggle').click(function() {
            let image = $(this).children().closest('div').find('img').attr('id');
            let collapse = $(this).next('.collapse');
            if (collapse.hasClass('show')) {
                travels.scaleImage(image, 'enlarge', 2);
            } else {
                travels.scaleImage(image, 'shrink', 2);
            }
        });
    },
    scaleImage(image, method, factor) {
        const newSize = method == 'shrink' ? $(`#${image}`).width() / factor : $(`#${image}`).width() * factor;
        $(`#${image}`).animate({ width: newSize });
    }
}


/*
* included file: ./contact.js
*/

//==========================================================
//                 CONTACT and EMAIL FORM
//==========================================================
const contact = {
    init() {
        this.iconHoverListener();
        this.emailFormToggleListener();
        this.emailSubmitListener();
    },
    iconHoverListener() {
        $('.ctcIcons i').hover(function() {
            if ($(this).attr('id') == 'email') { $('.ctcText').html('E-mail'); $('#emailBtn').css('cursor', 'pointer');}
            else if ($(this).attr('id') == 'fb') { $('.ctcText').html('Facebook'); }
            else if ($(this).attr('id') == 'skype') { $('.ctcText').html('Skype'); }
            else if ($(this).attr('id') == 'linkedin') { $('.ctcText').html('LinkedIn'); }
            else if ($(this).attr('id') == 'github') { $('.ctcText').html('GitHub'); }
            else if ($(this).attr('id') == 'flickr') { $('.ctcText').html('Flickr'); }
        }, function() { //callback
            $('.ctcText').html('');
        });
    },
    emailFormToggleListener() {
        $('#emailBtn').click(() => { 
            if ($('#emailform').css('display') == 'none') {
                $('#emailform').fadeIn(500);
                nav.scrollDownToBottom();
            } else {
                $('#emailform').fadeOut(500);
                $('html, body').animate({ scrollTop: $(document).height()-$(window).height()-$('#emailform').height() });
            }  
        });
    },
    emailSubmitListener() {
        $('#emailSubmit').click(() => this.validateInputs());
    },
    validateInputs() {
        //client side validation
        let emailError = '';
        if ($('#inputSubject').val() == '') {
            emailError += '- The subject field is required.<br>';
        }
        if ($('#senderEmail').val() == '') {
            emailError += '- The e-mail field is required.<br>';
        }
        if ($('#inputMessage').val() == '') {
            emailError += '- The message field is required.<br>';
        }
        if (emailError != '') {
            $('#emailError').html(`<div class="alert alert-danger text-left" role="alert"><p><strong>There were error(s) in your form:</strong><br>${emailError}</p></div>`);
            nav.scrollDownToBottom();
            return false;
        } else {
            //if there is no error, attempt to send the email
            this.sendEmail();
        }
    },
    sendEmail() {
        $.ajax({
            type: 'POST',
            url: `${domain}/site/php/email.php`,
            // data to be added to query string:
            data: { 
                senderEmail: $('#senderEmail').val(),
                inputSubject: $('#inputSubject').val(),
                inputMessage: $('#inputMessage').val()
            },
            success: function(){
                $('#emailError').html('<div class="alert alert-success text-left" role="alert">Your e-mail was sent successfully!</div>');
                nav.scrollDownToBottom();
            },
            async: 'false',
            error: function(){
                $('#emailError').html('<div class="alert alert-danger text-left" role="alert">There was an error. Your e-mail could not be sent.</div>');
                nav.scrollDownToBottom();
            }
        });
    }
}


/*
* MAIN file:
*/

/*@include: ./pageloader.js, ./nav.js, ./about.js, ./cv.js, ./portfolio.js, ./autocomplete.js, ./links.js, travels.js, ./contact.js @end*/

$(document).ready(() => {
    page.init();
})