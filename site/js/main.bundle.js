// /*
// * included file: ./pageloader.js
// */

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
    loadAllSections() {
        this.sections.forEach(element => {
            page.loadHtml(element.file, element.section);
        });
    },
    loadHtml(fileName, domElement) {
        $.get(`./site/html/${fileName}`).done(result => $(domElement).html(result));
    }
}


// /*
// * included file: ./home.js
// */

// //==========================================================
// //                     HOMEPAGE ONLY
// //==========================================================

// //Primary domain:
// var domain = "https://www.p-kin.com"

// /****************************************************
// *                    DOWNLOAD CV
// */
// //opens a link in new tab with focus
// function openInNewTab(url) {
//     var win = window.open(url, '_blank');
//     win.focus();
// }

// if ($("body").hasClass("homeBody")) {
//     //initially hide the password div
//     $(".downloadCVwrapper").hide();
//     //set link in the about me text
//     $("#CVtextLink").click(function(e) {
//         e.preventDefault();
//         scrollDown();
//     });
//     //toggle the password div
//     $("#downloadCVtitle").click(function() {
//         $(".downloadCVwrapper").slideToggle("500", scrollDown); 
//     });
//     //to use enter key same as click on input
//     $("#passwordInput").keypress(function (e) {
//         var key = e.which;
//         if (key == 13) {$("#CVSubmit").click();}
//     });  
//     //sending password
//     $("#CVSubmit").click(function() { 
//         //AJAX post method to check the password
//         $.post(`${domain}/site/php/passvalid.php`, {pass: $("#passwordInput").val()}, function(response){
//             //clear password field
//             $("#passwordInput").val("");
//             //check the response from the php
//             if (response == 1) {
//                 //an other post method to get the link
//                 $.post(`${domain}/site/php/getlink.php`, {response: response}, function(link) {
//                     //give response message
//                     $("#passwordResult").html('<p>Thank you! The download should have been started already, if not, please click <a href="' + link + '" target="_blank">here</a>.</p>');
//                     //open link automatically in new tab
//                     openInNewTab(link);
//                 });   
//             } else {
//                 $("#passwordResult").html("<p>Sorry, the password is incorrect. Please try again!</p>");
//             }
//         });
//     });   
// }
  


// /*
// * included file: ./general.js
// */

// //==========================================================
// //                   GENERAL BEHAVIORS
// //==========================================================

// //collapse the navbar after click
// $(".nav-link").not('#funProjectsLink').click(function(){
//     $(".navbar-collapse").collapse("hide");
// })
// //function to scroll to the bottom
// function scrollDown() {
//     $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
// }

// //pointer cursors, scroll functions
// $(".nav-link, #peters, #backToTop, #linksSearchToggle, #downloadCVtitle").hover(function() {
//     $(this).css("cursor", "pointer");
// })
// $("#homePageContactNav").click(function() {
//     scrollDown();
// })
// $("#homePageHomeNav, #peters, #backToTop").click(function() {
//     $("html, body").animate({ scrollTop: 0});
// })
// $(window).scroll(function() {
//     var scroll = $(window).scrollTop();
//     if (scroll >= 200) {
//         $("#backToTop").fadeIn(500);
//     } else {
//         $("#backToTop").fadeOut(500);
//     }
// });



// //$(".nav-item").click(function() {
// //    $("html").fadeOut(500, function() {
// //        window.location.reload();
// //    });
// //});





// /*
// * included file: ./portfolio.js
// */

// //==========================================================
// //                   PORTFOLIO SCRIPTS
// //==========================================================

// /****************************************************
// *                  HEADER FUNCTIONS
// */
// //function to move around objects following mouse movements
// function moveObject(target, divider) {
//     var origMarLeft = parseInt(target.css('margin-left').slice(0, -2));
//     var origMarTop = parseInt(target.css('margin-top').slice(0, -2));
//     $(window).on('mousemove', (e) => {
//         var curX = e.pageX;
//         var curY = e.pageY;
//         var wW = $(window).width();
//         var wH = $(window).height();
//         var newMarLeft, newMarTop;
//         if (curX < wW / 2) {
//             newMarLeft = origMarLeft + (wW/2-curX)/divider;
//             target.css('margin-left', newMarLeft + 'px');
//         } else {
//             newMarLeft = origMarLeft - (wW/2+curX)/divider + (wW)/divider;
//             target.css('margin-left', newMarLeft + 'px');
//         }
//         if (curY < wH / 2) {
//             newMarTop = origMarTop + (wH/2-curY)/divider;
//             target.css('margin-top', newMarTop + 'px');
//         } else {
//             newMarTop = origMarTop - (wH/2+curY)/divider + (wH)/divider;
//             target.css('margin-top', newMarTop + 'px');
//         }
//     });
// };
// //set up movements of the logos in the header depending on screen size
// if ($(window).width() > 1330) {
//     // $(".headerContainer").find('*').removeAttr("style");
//     moveObject($('.pf-logo-grp1'),100);
//     moveObject($('.pf-logo-grp2'),50);
//     moveObject($('.pf-logo-grp3'),600);
// } else {
//     // $(".headerContainer").find('*').removeAttr("style");
//     moveObject($('.pf-logos'),100);
// }


// /****************************************************
// *                  BODY FUNCTIONS
// */
// //functions to animate the down arrows
// var setArrow = (id) => $(id).css({'color':'orange' , 'transform' : 'scale(1, 1)'});
// var resetArrow = (id) => $(id).css({'color':'black' , 'transform' : 'scale(1, 0.7)'});
// function downArrows() {
//     setArrow('#pf-arrow-1');
//     setTimeout(() => {
//         resetArrow('#pf-arrow-1');
//         setArrow('#pf-arrow-2');
//         setTimeout(() => {
//             resetArrow('#pf-arrow-2');
//             setArrow('#pf-arrow-3');
//             setTimeout(() => {
//                 resetArrow('#pf-arrow-3');
//             }, 50)
//         }, 50)
//     }, 50)
//     setTimeout(() => {
//         downArrows();
//     }, 1000)
// }
// downArrows();




// /*
// * included file: ./autocomplete.js
// */

// /****************************************************
// *                   AUTOCOMPLETE
// */
// //only load arrays to tags if user is on the certain page
// if ($("body").hasClass("dictBody")) {
//     var allDictTags = hun.concat(kor);
// }
// //initiate autocomplete on load if checkbox is checked
// if ($("#autoCompleteCheck").attr("checked") && $("body").hasClass("dictBody")) {
//     $("#dictInput").autocomplete({source: allDictTags});
// } else if ($("#autoCompleteCheck").attr("checked") && $("body").hasClass("linksBody")) {
//     //for links need to use the async function:
//     getLinkNames().then((names) => {
//         $("#linksInput").autocomplete({source: names});
//     })
// }
// //toggle autocomplete with checkbox
// $("#autoCompleteCheck").click(function() {
//     if ($("#autoCompleteCheck").is(":checked")) {
//         $("#dictInput, #linksInput").autocomplete("enable");    
//     } else {
//         $("#dictInput, #linksInput").autocomplete("disable"); 
//     }     
// });
// //set max width of autocomplete field depending on input field
// $(".ui-autocomplete").css("max-width", $("#dictInput, #linksInput").width() + 25);


// /*
// * included file: ./links.js
// */

// //==========================================================
// //                      LINKS SCRIPTS
// //==========================================================

// //Primary domain:
// var domain = "https://www.p-kin.com"

// //initiate page load
// if ($("body").hasClass("linksBody")) {
//     //hide and toggle search
//     $("#linksWrapper").hide();
//     $("#linksSearchToggle").click(function() {
//         $("#linksWrapper").toggle("slow");
//     }); 
//     $("#linksMatches").hide();
//     //show 'loading' while ajax call in progress
//     $('.list-group').html('<li class="list-group-item">loading...</li>');
//     //fill up the lists
//     fillListFromAPI('#topPicksList', 'toppicks');
//     fillListFromAPI('#coursesList', 'courses');
//     fillListFromAPI('#linuxList', 'linux');
//     fillListFromAPI('#resourcesList', 'resources');
//     fillListFromAPI('#docsList', 'docs');
//     fillListFromAPI('#frameWorksList', 'frameworks');
// }

// //if the viewport is higher than the document, set the placeholder div height to push the footer to the bottom
// function setPlaceHolderHeightLinks() {
//     if (window.innerHeight > ($(".headerContainer").height() + $(".navbar").height() + $("#linksListView").height() + $("#contact").height()) + 100) {
//         $("#linksPlaceHolder").height(window.innerHeight -($(".headerContainer").height() + $(".navbar").height() + $("#linksListView").height() + $("#contact").height()) - 100);
//     }
// }
// $(window).resize(setPlaceHolderHeightLinks);
// setPlaceHolderHeightLinks();

// //to use enter key same as click on input
// $("#linksInput").keypress(function (e) {
//     var key = e.which;
//     if (key == 13) {$("#linksSubmit").click(); return false;}
// });  

// //fills the lists from the node API
// function fillListFromAPI(domElement, category) {
//     $.getJSON(`${domain}/dbadmin/server/server.php?met=all&cat=${category}`, (data) => {
//         if (!data) {
//             return alert('No data was found :(');
//         }
//         //clear 'loading' text
//         $(domElement).html('');
//         //fill up the list
//         data.forEach(link => {
//             $(domElement).append(`<li class="list-group-item"><a href="${link.link}" target="_blank">${link.name}</a></li>`);
//         });
//     });
// }

// //function to fill the list for autocomplete
// async function getLinkNames() {
//     try {
//         var result = await fetch(`${domain}/dbadmin/server/server.php?met=namelist`);
//         var data = await result.json();
//         var array = data.map((link) => link.name);
//         return array;
//     } catch (error) {
//         alert('Sorry, autocomplete is out of order now. ->', error.message);
//     }
// }


// /****************************************************
// *              SEARCH + OUTPUT FUNCTION
// */
// function searchFromAPI(domElement, name) {
//     $('#linksMatches').show();
//     $.getJSON(`${domain}/dbadmin/server/server.php?met=sr&name=${name}`, (data) => {
//         //clear 'loading' text
//         $(domElement).html('');
//         //fill up the list
//         data.forEach(link => {
//             $(domElement).append(`<li class="list-group-item"><a href="${link.link}" target="_blank">${link.name}</a></li>`);
//         });
//     }).fail((xhr, status, message) => {
//         $(domElement).html('');
//         $(domElement).append('<li class="list-group-item">Unable to fetch data or link not found. :(</li>');
//     });
// }

// /****************************************************
// *                 INITIATE SEARCH
// */
// $("#linksSubmit").click(function() {
//     searchFromAPI('#linksResults', $("#linksInput").val());
//     $("#linksInput").val("");
//     $(document).focus();
//     $("#linksInput").autocomplete( "close" );
// })




// /*
// * included file: travels.js
// */

// //==========================================================
// //                   TRAVELS SCRIPTS
// //==========================================================


// /*
// * included file: ./contact.js
// */

// //==========================================================
// //                 CONTACT and EMAIL FORM
// //==========================================================

// //Primary domain:
// var domain = "https://www.p-kin.com"

// //initially hide the email form
// $("#emailform").hide();

// //contact icons - on hover
// $(".ctcIcons i").hover(function() {
//     if ($(this).attr("id") == "email") { $(".ctcText").html("E-mail"); $("#emailBtn").css("cursor", "pointer");}
//     else if ($(this).attr("id") == "fb") { $(".ctcText").html("Facebook"); }
//     else if ($(this).attr("id") == "skype") { $(".ctcText").html("Skype"); }
//     else if ($(this).attr("id") == "linkedin") { $(".ctcText").html("LinkedIn"); }
//     else if ($(this).attr("id") == "github") { $(".ctcText").html("GitHub"); }
//     else if ($(this).attr("id") == "flickr") { $(".ctcText").html("Flickr"); }
// }, function() { //callback
//     $(".ctcText").html("");
// })

// /****************************************************
// *                    EMAIL SENDER
// */
// //toggle the email form
// $("#emailBtn").click(function(){ 
//     if ($("#emailform").css("display") == "none") {
//         $("#emailform").fadeIn(500);
//         scrollDown();
//     } else {
//         $("#emailform").fadeOut(500);
//         $("html, body").animate({ scrollTop: $(document).height()-$(window).height()-$("#emailform").height() });
//     }  
// })
// //clicking Submit
// $("#emailSubmit").click(function() {
//     //client side validation
//     var emailError = "";
//     if ($("#inputSubject").val() == "") {
//         emailError += "- The subject field is required.<br>";
//     }
//     if ($("#senderEmail").val() == "") {
//         emailError += "- The e-mail field is required.<br>";
//     }
//     if ($("#inputMessage").val() == "") {
//         emailError += "- The message field is required.<br>";
//     }
//     if (emailError != "") {
//         $("#emailError").html('<div class="alert alert-danger text-left" role="alert"><p><strong>There were error(s) in your form:</strong><br>' + emailError + '</p></div>');
//         scrollDown();
//         return false;
//     //if there is no error, send the email
//     } else {
//         //attempt to send an email
//         $.ajax({
//             type: 'POST',
//             url: `${domain}/site/php/email.php`,
//             // data to be added to query string:
//             data: { 
//                 senderEmail: $("#senderEmail").val(),
//                 inputSubject: $("#inputSubject").val(),
//                 inputMessage: $("#inputMessage").val()
//             },
//             success: function(){
//                 $("#emailError").html('<div class="alert alert-success text-left" role="alert">Your e-mail was sent successfully!</div>');
//                 scrollDown();
//             },
//             async: "false",
//             error: function(){
//                 $("#emailError").html('<div class="alert alert-danger text-left" role="alert">There was an error. Your e-mail could not be sent.</div>');
//                 scrollDown();
//             }
//         })
//     }
// });
/*               END OF email sender
****************************************************/


/*
* MAIN file:
*/

/*@include: ./pageloader.js, ./home.js, ./general.js, ./portfolio.js, ./autocomplete.js, ./links.js, travels.js, ./contact.js @end*/

page.loadAllSections();