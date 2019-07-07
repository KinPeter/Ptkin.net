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