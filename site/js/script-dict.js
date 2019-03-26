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

    word = word.trim().toLowerCase();

    const preResults = {
        "exact" : [], 
        "startsWith" : [], 
        "partial" : []  
    };

    for (let i = 0; i < hun.length; i++) {

        //check for exact match        
        if ( word == hun[i].toLowerCase() ) {
            preResults.exact.push([hun[i], kor[i]]);
        } else if ( word == kor[i].toLowerCase() ) {
            preResults.exact.push([kor[i], hun[i]]);
        }

        //check for match starting with word
        else if ( hun[i].toLowerCase().startsWith(word) ) {
            preResults.startsWith.push([hun[i], kor[i]]);
        } else if ( kor[i].toLowerCase().startsWith(word) ) {
            preResults.startsWith.push([kor[i], hun[i]]);
        }  
    
        //check for match including word anywhere
        else if ( hun[i].toLowerCase().includes(word) ) {
            preResults.partial.push([hun[i], kor[i]]);
        } else if ( kor[i].toLowerCase().includes(word) ) {
            preResults.partial.push([kor[i], hun[i]]);
        }  
    }

    // combineResults(preResults);
    return preResults;
}

function combineResults(preResults) {
    // finalize results array
    const results = [];

    preResults.exact.forEach((pair) => {
        results.push(pair);
    });
    preResults.startsWith.forEach((pair) => {
        results.push(pair);
    });
    preResults.partial.forEach((pair) => {
        results.push(pair);
    });

    // resultOutput(results);
    return results;
}
/****************************************************
*                  OUTPUT FUNCTION
*/ 
function resultOutput(result) {   
    let resultHtml = `
    <div class="accordion" id="exactAccordion"> 
        <div class="card rounded"> 
            <div class="card-header btn text-left" id="headingOne" data-toggle="collapse" data-target="#exactCollapse">Search results</div> 
            <div id="exactCollapse" class="collapse show" data-parent="#exactAccordion">
                <ul class="list-group">`;
    
    //IF there is no result
    if (result.length < 1) {
        resultHtml += '<li class="list-group-item text-warning">Sorry, no matches.</li>';
    //IF there are too many results
    } else if (result.length > 50) {
        resultHtml += '<li class="list-group-item text-danger">Too many results, please narrow your search.</li>';    
    //IF there are normal results
    } else {
        result.forEach(pair => {
            resultHtml += '<li class="list-group-item">' + pair[0] + ' = ' + pair[1] + '</li>';
        });
    }
    resultHtml += '</ul></div></div></div>';

    return resultHtml;
}

/****************************************************
*                 INITIATE SEARCH
*/
$("#dictSubmit").click(function() {
    const results = resultOutput( combineResults( wordLookup( $("#dictInput").val() ) ) );
    $("#searchResults").html(results);
    $("#dictInput").val("")
    $(document).focus();
    $("#dictInput").autocomplete( "close" );
})

