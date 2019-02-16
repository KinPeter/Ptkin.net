//==========================================================
//                   GENERAL BEHAVIORS
//==========================================================

//collapse the navbar after click
$(".nav-link").click(function(){
    $(".navbar-collapse").collapse("hide");
})
//function to scroll to the bottom
function scrollDown() {
    $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
}

//pointer cursors, scroll functions
$(".nav-link, #peters, #backToTop, #linksSearchToggle, #downloadCVtitle").hover(function() {
    $(this).css("cursor", "pointer");
})
$("#homePageContactNav").click(function() {
    scrollDown();
})
$("#homePageHomeNav, #peters, #backToTop").click(function() {
    $("html, body").animate({ scrollTop: 0});
})
$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 200) {
        $("#backToTop").fadeIn(500);
    } else {
        $("#backToTop").fadeOut(500);
    }
});

/****************************************************
*                   AUTOCOMPLETE
*/
//only load arrays to tags if user is on the certain page
if ($("body").hasClass("dictBody")) {
    var allDictTags = hun.concat(kor);
// } else if ($("body").hasClass("linksBody")) {
    // var allDictTags; 
    // getLinkNames().then((names) => {
    //     allDictTags = names;
    //     return allDictTags;
    // });
    //var allDictTags = linksListTags();
}
//initiate autocomplete on load if checkbox is checked
if ($("#autoCompleteCheck").attr("checked") && $("body").hasClass("dictBody")) {
    $("#dictInput").autocomplete({source: allDictTags});
} else if ($("#autoCompleteCheck").attr("checked") && $("body").hasClass("linksBody")) {
    //for links need to use the async function:
    getLinkNames().then((names) => {
        $("#linksInput").autocomplete({source: names});
    })
}
//toggle autocomplete with checkbox
$("#autoCompleteCheck").click(function() {
    if ($("#autoCompleteCheck").is(":checked")) {
        $("#dictInput, #linksInput").autocomplete("enable");    
    } else {
        $("#dictInput, #linksInput").autocomplete("disable"); 
    }     
});
//set max width of autocomplete field depending on input field
$(".ui-autocomplete").css("max-width", $("#dictInput, #linksInput").width() + 25);


//==========================================================
//                 CONTACT and EMAIL FORM
//==========================================================

//initially hide the email form
$("#emailform").hide();

//contact icons - on hover
$(".ctcIcons i").hover(function() {
    if ($(this).attr("id") == "email") { $(".ctcText").html("E-mail"); $("#emailBtn").css("cursor", "pointer");}
    else if ($(this).attr("id") == "fb") { $(".ctcText").html("Facebook"); }
    else if ($(this).attr("id") == "skype") { $(".ctcText").html("Skype"); }
    else if ($(this).attr("id") == "linkedin") { $(".ctcText").html("LinkedIn"); }
    else if ($(this).attr("id") == "github") { $(".ctcText").html("GitHub"); }
    else if ($(this).attr("id") == "flickr") { $(".ctcText").html("Flickr"); }
}, function() { //callback
    $(".ctcText").html("");
})

/****************************************************
*                    EMAIL SENDER
*/
//toggle the email form
$("#emailBtn").click(function(){ 
    if ($("#emailform").css("display") == "none") {
        $("#emailform").fadeIn(500);
        scrollDown();
    } else {
        $("#emailform").fadeOut(500);
        $("html, body").animate({ scrollTop: $(document).height()-$(window).height()-$("#emailform").height() });
    }  
})
//clicking Submit
$("#emailSubmit").click(function() {
    //client side validation
    var emailError = "";
    if ($("#inputSubject").val() == "") {
        emailError += "- The subject field is required.<br>";
    }
    if ($("#senderEmail").val() == "") {
        emailError += "- The e-mail field is required.<br>";
    }
    if ($("#inputMessage").val() == "") {
        emailError += "- The message field is required.<br>";
    }
    if (emailError != "") {
        $("#emailError").html('<div class="alert alert-danger text-left" role="alert"><p><strong>There were error(s) in your form:</strong><br>' + emailError + '</p></div>');
        scrollDown();
        return false;
    //if there is no error, send the email
    } else {
        //attempt to send an email
        $.ajax({
            type: 'POST',
            url: 'http://ptkin.net/site/email.php',
            // data to be added to query string:
            data: { 
                senderEmail: $("#senderEmail").val(),
                inputSubject: $("#inputSubject").val(),
                inputMessage: $("#inputMessage").val()
            },
            success: function(){
                $("#emailError").html('<div class="alert alert-success text-left" role="alert">Your e-mail was sent successfully!</div>');
                scrollDown();
            },
            async: "false",
            error: function(){
                $("#emailError").html('<div class="alert alert-danger text-left" role="alert">There was an error. Your e-mail could not be sent.</div>');
                scrollDown();
            }
        })
    }
});
/*               END OF email sender
****************************************************/


//==========================================================
//                     HOMEPAGE ONLY
//==========================================================

/****************************************************
*                    DOWNLOAD CV
*/
//opens a link in new tab with focus
function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

if ($("body").hasClass("homeBody")) {
    //initially hide the password div
    $(".downloadCVwrapper").hide();
    //set link in the about me text
    $("#CVtextLink").click(function(e) {
        e.preventDefault();
        scrollDown();
    });
    //toggle the password div
    $("#downloadCVtitle").click(function() {
        $(".downloadCVwrapper").slideToggle("500", scrollDown); 
    });
    //to use enter key same as click on input
    $("#passwordInput").keypress(function (e) {
        var key = e.which;
        if (key == 13) {$("#CVSubmit").click();}
    });  
    //sending password
    $("#CVSubmit").click(function() { 
        //AJAX post method to check the password
        $.post("http://ptkin.net/site/passvalid.php", {pass: $("#passwordInput").val()}, function(response){
            //clear password field
            $("#passwordInput").val("");
            //check the response from the php
            if (response == 1) {
                //an other post method to get the link
                $.post("http://ptkin.net/site/getlink.php", {response: response}, function(link) {
                    //give response message
                    $("#passwordResult").html('<p>Thank you! The download should have been started already, if not, please click <a href="' + link + '" target="_blank">here</a>.</p>');
                    //open link automatically in new tab
                    openInNewTab(link);
                });   
            } else {
                $("#passwordResult").html("<p>Sorry, the password is incorrect. Please try again!</p>");
            }
        });
    });   
}

//==========================================================
//                   DICTIONARY SCRIPTS
//==========================================================

//if the viewport is higher than the document, set the placeholder div height to push the footer to the bottom
function setPlaceHolderHeight() {
    if (window.innerHeight > ($(".headerContainer").height() + $(".navbar").height() + $("#dictWrapper").height() + $("#contact").height()) + 100) {
        $("#dictPlaceHolder").height(window.innerHeight -($(".headerContainer").height() + $(".navbar").height() + $("#dictWrapper").height() + $("#contact").height()) - 100);
    }
}
$(window).resize(setPlaceHolderHeight);
setPlaceHolderHeight();

//to use enter key same as click on input
$("#dictInput").keypress(function (e) {
    var key = e.which;
    if (key == 13) {$("#dictSubmit").click(); return false;}
});  

/****************************************************
*                  SEARCH FUNCTION
*/
function wordLookup(word) {
    var exact = [];
    var partial = [];
    var i = 0;
    //look for exact match
    while (i < hun.length) {
        if ( word.toLowerCase() == hun[i].toLowerCase() ) {
            exact.push([hun[i], kor[i]]);
        } else if ( word.toLowerCase() == kor[i].toLowerCase() ) {
            exact.push([kor[i], hun[i]]);
        }
        i++;
    }
    //look for partial match
    i = 0;
    while (i < hun.length) {
        if ( hun[i].includes(word.toLowerCase()) && !exact.some(row => row.includes(hun[i])) ) {
            partial.push([hun[i], kor[i]]);
        } else if ( kor[i].includes(word.toLowerCase()) && !exact.some(row => row.includes(kor[i])) ) {
            partial.push([kor[i], hun[i]]);
        }
        i++;               
    }
    return [exact, partial];
}
/****************************************************
*                  OUTPUT FUNCTION
*/ 
function resultOutput(exact, partial) {   
    var i = 0;
    var exactResult = '<div class="accordion" id="exactAccordion"> <div class="card rounded"> <div class="card-header btn text-left" id="headingOne" data-toggle="collapse" data-target="#exactCollapse">Exact matches</div> <div id="exactCollapse" class="collapse show" data-parent="#exactAccordion"><ul class="list-group">';
    var partialResult = '<div class="accordion" id="partialAccordion"> <div class="card rounded"> <div class="card-header btn text-left" id="headingTwo" data-toggle="collapse" data-target="#partialCollapse">Partial matches</div> <div id="partialCollapse" class="collapse show" data-parent="#partialAccordion"><ul class="list-group">';

    //IF there is no result at all
    if (exact.length < 1 && partial.length < 1) {
        exactResult += '<li class="list-group-item list-group-item-danger">Sorry, no matches.</li></ul></div></div></div>';
        partialResult += '<li class="list-group-item list-group-item-danger">Sorry, no matches.</li></ul></div></div></div>';
    } else {
    //IF there ARE results
        //if there is NO exact result
        if (exact.length < 1) {
            exactResult += '<li class="list-group-item list-group-item-danger">Sorry, no matches.</li></ul></div></div></div>';
        } else {
            //if there IS exact result
            while (i < exact.length) {
                exactResult += '<li class="list-group-item">' + exact[i][0] + ' = ' + exact[i][1] + '</li>';
                i++;
            }
            exactResult += '</ul></div></div></div>';
        }
        //if there is NO partial result
        if (partial.length < 1) {
            partialResult += '<li class="list-group-item list-group-item-danger">Sorry, no matches.</li></ul></div></div></div>';
        } else {
            //if there IS partial result
            i = 0;
            while (i < partial.length) {
                partialResult += '<li class="list-group-item">' + partial[i][0] + ' = ' + partial[i][1] + '</li>';
                i++;
            }
            partialResult += '</ul></div></div></div>';
        }
    }
    return [exactResult, partialResult];
}

/****************************************************
*                 INITIATE SEARCH
*/
$("#dictSubmit").click(function() {
    $("#exactMatches").html(resultOutput(wordLookup($("#dictInput").val())[0], wordLookup($("#dictInput").val())[1])[0]);
    $("#partialMatches").html(resultOutput(wordLookup($("#dictInput").val())[0], wordLookup($("#dictInput").val())[1])[1]);
    $("#dictInput").val("")
    $(document).focus();
    $("#dictInput").autocomplete( "close" );
})


//==========================================================
//                      LINKS SCRIPTS
//==========================================================

//if the viewport is higher than the document, set the placeholder div height to push the footer to the bottom
function setPlaceHolderHeightLinks() {
    if (window.innerHeight > ($(".headerContainer").height() + $(".navbar").height() + $("#linksListView").height() + $("#contact").height()) + 100) {
        $("#linksPlaceHolder").height(window.innerHeight -($(".headerContainer").height() + $(".navbar").height() + $("#linksListView").height() + $("#contact").height()) - 100);
    }
}
$(window).resize(setPlaceHolderHeightLinks);
setPlaceHolderHeightLinks();

//to use enter key same as click on input
$("#linksInput").keypress(function (e) {
    var key = e.which;
    if (key == 13) {$("#linksSubmit").click(); return false;}
});  

//fills the lists from the arrays
function fillList(list) {
    var output = '';
    for (var i = 0; i < list.length; i++) {
        output += '<li class="list-group-item"><a href="' + list[i][1] + '" target="_blank">' + list[i][0] + '</a></li>';
    }
    return output;
}

/**
 * TESTING TESTING * 
 */


function fillListFromAPI(domElement, category) {
    $.getJSON(`https://cors-anywhere.herokuapp.com/https://ptkin-link-api.herokuapp.com/cat/${category}`, (data) => {
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
}


if ($("body").hasClass("linksBody")) {
    //hide and toggle search
    $("#linksWrapper").hide();
    $("#linksSearchToggle").click(function() {
        $("#linksWrapper").toggle("slow");
    }); 
    $("#linksMatches").hide();
    //show 'loading' while ajax call in progress
    $('.list-group').html('<li class="list-group-item">loading...</li>');
    //Check connection to API and database:  
    $.get(`https://cors-anywhere.herokuapp.com/https://ptkin-link-api.herokuapp.com/check`, () => {
        //if OK, fill up the lists
        fillListFromAPI('#topPicksList', 'toppicks');
        fillListFromAPI('#coursesList', 'courses');
        fillListFromAPI('#linuxList', 'linux');
        fillListFromAPI('#resourcesList', 'resources');
        fillListFromAPI('#docsList', 'docs');
        fillListFromAPI('#frameWorksList', 'frameworks');
    }).fail((xhr, status, message) => {
        //if not, alert:
        alert('Unable to connect to the API on Heroku :( \n' + status + ': ' + message);
    });
    

    //$("#topPicksList").html(fillList(topPicks));
    //$("#coursesList").html(fillList(courses));
    // $("#linuxList").html(fillList(linux));
    // $("#resourcesList").html(fillList(resources));
    // $("#docsList").html(fillList(docs));
    // $("#frameWorksList").html(fillList(frameWorks));
}

//function to fill the list for autocomplete
// function linksListTags () {
//     var result = [];
//     var lists = [topPicks, courses, linux, resources, docs, frameWorks]; 
//     var z = 0;
//     while (z < lists.length) {
//         var i = 0;
//         while (i < lists[z].length) {
//             result.push(lists[z][i][0]);
//             i++;
//         }
//         z++;
//     }
//     return result;
// }

async function getLinkNames() {
    try {
        var result = await fetch('https://cors-anywhere.herokuapp.com/https://ptkin-link-api.herokuapp.com/allnames');
        var data = await result.json();
        var array = data.map((link) => link.name);
        return array;
    } catch (error) {
        alert(error.message);
    }
}


/****************************************************
*                  SEARCH FUNCTION
*/

function searchFromAPI(domElement, name) {
    $('#linksMatches').show();
    $.getJSON(`https://cors-anywhere.herokuapp.com/https://ptkin-link-api.herokuapp.com/search/${name}`, (data) => {
        //clear 'loading' text
        $(domElement).html('');
        //fill up the list
        data.forEach(link => {
            $(domElement).append(`<li class="list-group-item"><a href="${link.link}" target="_blank">${link.name}</a></li>`);
        });
    }).fail((xhr, status, message) => {
        $(domElement).html('');
        $(domElement).append('<li class="list-group-item">Unable to fetch data the API on Heroku :( Reason: ' + status + ': ' + message + '</li>');
    });;
}
// function linkLookup(word) {
//     var result = [];
//     var z = 0;
//     var lists = [topPicks, courses, linux, resources, docs, frameWorks];  
//     while (z < lists.length) {
//         var i = 0;
//         while (i < lists[z].length) {
//             if ( (lists[z][i][0].toLowerCase()).includes(word.toLowerCase()) ) {
//                 result.push([lists[z][i][0], lists[z][i][1]] );
//             } 
//             i++;               
//         }
//         z++;
//     }
//     return result;
// }
/****************************************************
*                  OUTPUT FUNCTION
*/  
// function linksOutput(result) {   
//     var i = 0;
//     var linksResult = '<div class="card-header btn text-left" id="headingOne" data-toggle="collapse" data-target="#linksCollapse">Search results</div> <div id="linksCollapse" class="collapse show" data-parent="#linksAccordion"><ul class="list-group">';
//     //IF there is no result 
//     if (result.length < 1) {
//         linksResult += '<li class="list-group-item list-group-item-danger">Sorry, no matches.</li></ul></div>';    
//     } else {
//     //IF there ARE results
//         while (i < result.length) {
//             linksResult += '<li class="list-group-item"><a href="' + result[i][1] + '" target="_blank">' + result[i][0] + '</a></li>';
//             i++;
//         }
//         linksResult += '</ul></div>';
//     }  
//     return linksResult;
// }
/****************************************************
*                 INITIATE SEARCH
*/
$("#linksSubmit").click(function() {
    searchFromAPI('#linksResults', $("#linksInput").val())
    $("#linksInput").val("")
    // console.log(linkLookup($("#linksInput").val()));
    // $("#linksResults").html(linksOutput(linkLookup($("#linksInput").val())));
    $(document).focus();
    $("#linksInput").autocomplete( "close" );
})

//$(".nav-item").click(function() {
//    $("html").fadeOut(500, function() {
//        window.location.reload();
//    });
//});