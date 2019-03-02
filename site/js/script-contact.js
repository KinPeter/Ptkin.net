//==========================================================
//                 CONTACT and EMAIL FORM
//==========================================================

//Primary domain:
var domain = "http://p-kin.com"

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
            url: `${domain}/site/php/email.php`,
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