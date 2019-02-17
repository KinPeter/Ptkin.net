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

//fills the lists from the node API
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
//initiate page load
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
}

//function to fill the list for autocomplete
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
*              SEARCH + OUTPUT FUNCTION
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
    });
}

/****************************************************
*                 INITIATE SEARCH
*/
$("#linksSubmit").click(function() {
    searchFromAPI('#linksResults', $("#linksInput").val());
    $("#linksInput").val("");
    $(document).focus();
    $("#linksInput").autocomplete( "close" );
})

