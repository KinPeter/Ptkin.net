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
        $.post("http://ptkin.net/site/php/passvalid.php", {pass: $("#passwordInput").val()}, function(response){
            //clear password field
            $("#passwordInput").val("");
            //check the response from the php
            if (response == 1) {
                //an other post method to get the link
                $.post("http://ptkin.net/site/php/getlink.php", {response: response}, function(link) {
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
  