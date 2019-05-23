/****************************************************
*                   AUTOCOMPLETE
*/
//only load arrays to tags if user is on the certain page
if ($("body").hasClass("dictBody")) {
    var allDictTags = hun.concat(kor);
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