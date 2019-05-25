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