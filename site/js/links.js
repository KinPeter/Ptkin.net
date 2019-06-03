//==========================================================
//                      LINKS SCRIPTS
//==========================================================
const links = {
    init() {
        //show 'loading' while ajax call in progress
        $('.list-group').html('<li class="list-group-item">loading...</li>');
        this.searchToggleListener();
        this.searchButtonListener();
        this.tagButtonListener();
    },
    searchToggleListener() {
        $('#linksSearchToggle').click(() => $('#linksWrapper').toggle('slow')); 
    },
    searchButtonListener() {
        $('#linksSubmit').click(() => {
            this.searchFromAPI('#linksResults', $('#linksInput').val());
            $('#linksInput').val('');
            $(document).focus();
            $('#linksInput').autocomplete( 'close' );
        });
    },
    tagButtonListener() {
        $('.tag-buttons').on('click', 'button', function() {
            let tag = $(this).attr('data-tag');
            let tagName = $(this).html()
            console.log(tag);
            links.fillListByTag('#tags-results', tag, tagName);
        });
    },
    fillListByTag(domElement, tag, tagName) {
        $('#tags-matches').show();
        $(domElement).html('<li class="list-group-item">Loading...</li>');
        $('#tags-results-header').html(tagName);
        $.getJSON(`${domain}/dbadmin/server/linkserver.php?met=tag&tag=${tag}`, (data) => {
            if (!data) {
                return alert('No data was found :(');
            }
            //clear 'loading' text
            $(domElement).html('');
            //fill up the list
            data.forEach(link => {
                $(domElement).append(`<li class="list-group-item"><a href="${link.link_url}" target="_blank">${link.link_name}</a></li>`);
            });
        });
    },
    searchFromAPI(domElement, name) {
        $('#linksMatches').show();
        $.getJSON(`${domain}/dbadmin/server/linkserver.php?met=sr&name=${name}`, (data) => {
            //clear 'loading' text
            $(domElement).html('');
            //fill up the list
            data.forEach(link => {
                $(domElement).append(`<li class="list-group-item"><a href="${link.link_url}" target="_blank">${link.link_name}</a></li>`);
            });
        }).fail((xhr, status, message) => {
            $(domElement).html('');
            $(domElement).append('<li class="list-group-item">Unable to fetch data or link not found. :(</li>');
        });
    },
    async getLinkNames() {
        //function to fill the list for autocomplete
        try {
            let result = await fetch(`${domain}/dbadmin/server/linkserver.php?met=namelist`);
            let data = await result.json();
            let array = data.map((link) => link.link_name);
            return array;
        } catch (error) {
            alert('Sorry, autocomplete is out of order now. ->', error.message);
        }
    }
}
