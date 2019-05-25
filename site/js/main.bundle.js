/*
* included file: ./pageloader.js
*/

//Primary domain:
const domain = 'https://cors-anywhere.herokuapp.com/https://www.p-kin.com';
// const domain = 'https://www.p-kin.com';

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
            console.log('All HTML loaded.');
            general.init();
            cv.init();
            portfolio.init();
            links.init();
            autocomplete.init();
            travels.init();
            contact.init();
            this.hideElements();
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
                console.log(domElement + 'loaded.');
                resolve();
            });
        });
    },
    hideElements() {
        //initially hide the password div
        $('.downloadCVwrapper').hide();
        $('#linksWrapper').hide();
        $('#linksMatches').hide();
        $("#emailform").hide();
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


/*
* included file: ./portfolio.js
*/

//==========================================================
//                   PORTFOLIO SCRIPTS
//==========================================================
const portfolio = {
    init() {
        this.animateArrows();
    },
    setArrow: (id) => $(id).css({'color':'white' , 'transform' : 'scale(1, 0.9)'}),
    resetArrow: (id) => $(id).css({'color':'orange' , 'transform' : 'scale(1, 0.7)'}),
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
* included file: ./autocomplete.js
*/

/****************************************************
*                   AUTOCOMPLETE
*/
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
        this.fillAllLists();
        this.searchToggleListener();
        this.searchButtonListener();
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
    fillAllLists() {
        this.fillListFromAPI('#topPicksList', 'toppicks');
        this.fillListFromAPI('#coursesList', 'courses');
        this.fillListFromAPI('#linuxList', 'linux');
        this.fillListFromAPI('#resourcesList', 'resources');
        this.fillListFromAPI('#docsList', 'docs');
        this.fillListFromAPI('#frameWorksList', 'frameworks');
    },
    fillListFromAPI(domElement, category) {
        $.getJSON(`${domain}/dbadmin/server/server.php?met=all&cat=${category}`, (data) => {
            if (!data) {
                return alert('No data was found :(');
            }
            //clear 'loading' text
            $(domElement).html('');
            //fill up the list
            data.forEach(link => {
                $(domElement).append(`<li class="list-group-item"><a href="${link.link}" target="_blank">${link.name}</a></li>`);
            });
        });
    },
    async getLinkNames() {
        //function to fill the list for autocomplete
        try {
            var result = await fetch(`${domain}/dbadmin/server/server.php?met=namelist`);
            var data = await result.json();
            var array = data.map((link) => link.name);
            return array;
        } catch (error) {
            alert('Sorry, autocomplete is out of order now. ->', error.message);
        }
    },
    searchFromAPI(domElement, name) {
        $('#linksMatches').show();
        $.getJSON(`${domain}/dbadmin/server/server.php?met=sr&name=${name}`, (data) => {
            //clear 'loading' text
            $(domElement).html('');
            //fill up the list
            data.forEach(link => {
                $(domElement).append(`<li class="list-group-item"><a href="${link.link}" target="_blank">${link.name}</a></li>`);
            });
        }).fail((xhr, status, message) => {
            $(domElement).html('');
            $(domElement).append('<li class="list-group-item">Unable to fetch data or link not found. :(</li>');
        });
    }
}



/*
* included file: travels.js
*/

//==========================================================
//                   TRAVELS SCRIPTS
//==========================================================
const travels = {
    // TODO
    init() {
        
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
                general.scrollDownToBottom();
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
            general.scrollDownToBottom();
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
                general.scrollDownToBottom();
            },
            async: 'false',
            error: function(){
                $('#emailError').html('<div class="alert alert-danger text-left" role="alert">There was an error. Your e-mail could not be sent.</div>');
                general.scrollDownToBottom();
            }
        });
    }
}


/*
* MAIN file:
*/

/*@include: ./pageloader.js, ./cv.js, ./general.js, ./portfolio.js, ./autocomplete.js, ./links.js, travels.js, ./contact.js @end*/

page.init();