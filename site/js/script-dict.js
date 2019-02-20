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
        if ( hun[i].toLowerCase().includes(word.toLowerCase()) && !exact.some(row => row.includes(hun[i])) ) {
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

