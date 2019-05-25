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