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
    // const regex = new RegExp('\\b' + word + '\\b') // does not work with korean :(
    const regexOnOwn = new RegExp('(?:^|\\s|-|\'|~)' + word +  '(?:$|\\s|,|-|\'|~)')
    const regexInParentheses = new RegExp('(?:\\()' + word +  '(?:\\))')

    const preResults = {
        "exact" : [], 
        "onOwn" : [],
        "startsWith" : [], 
        "inParentheses" : [],
        "partial" : []  
    };

    for (let i = 0; i < hun.length; i++) {

        //check for exact match        
        if ( word == hun[i].toLowerCase() ) {
            preResults.exact.push([hun[i], kor[i]]);
        } else if ( word == kor[i].toLowerCase() ) {
            preResults.exact.push([kor[i], hun[i]]);
        }
    
        //check for word on it's own in the entry
        else if (regexOnOwn.test(hun[i].toLowerCase())) {
            preResults.onOwn.push([hun[i], kor[i]])
        } else if (regexOnOwn.test(kor[i])) {
            preResults.onOwn.push([kor[i], hun[i]])
        }

        //check for match starting with word
        else if ( hun[i].toLowerCase().startsWith(word) ) {
            preResults.startsWith.push([hun[i], kor[i]]);
        } else if ( kor[i].toLowerCase().startsWith(word) ) {
            preResults.startsWith.push([kor[i], hun[i]]);
        }  
    
        //check for word on it's own but in parentheses
        else if (regexInParentheses.test(hun[i].toLowerCase())) {
            preResults.inParentheses.push([hun[i], kor[i]])
        } else if (regexInParentheses.test(kor[i])) {
            preResults.inParentheses.push([kor[i], hun[i]])
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
    let results = [];
    results = results.concat(preResults.exact, preResults.onOwn, preResults.startsWith, preResults.inParentheses, preResults.partial)
    // showDictResults(results);
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

