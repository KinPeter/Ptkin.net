//==========================================================
//                      LINKS SCRIPTS
//==========================================================
const links = {
    init() {
        //show 'loading' while ajax call in progress
        $('.list-group').html('<li class="list-group-item">loading...</li>');
        // this.fillAllLists();
        this.searchToggleListener();
        this.searchButtonListener();
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
    fillAllLists() {
        this.fillListFromAPI('#topPicksList', 'toppicks');
        this.fillListFromAPI('#coursesList', 'courses');
        this.fillListFromAPI('#linuxList', 'linux');
        this.fillListFromAPI('#resourcesList', 'resources');
        this.fillListFromAPI('#docsList', 'docs');
        this.fillListFromAPI('#frameWorksList', 'frameworks');
    },
    fillListFromAPI(domElement, category) {
        $.getJSON(`${domain}/dbadmin/server/server.php?met=all&cat=${category}`, (data) => {
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
    },
    async getLinkNames() {
        //function to fill the list for autocomplete
        try {
            var result = await fetch(`${domain}/dbadmin/server/server.php?met=namelist`);
            var data = await result.json();
            var array = data.map((link) => link.name);
            return array;
        } catch (error) {
            alert('Sorry, autocomplete is out of order now. ->', error.message);
        }
    },
    searchFromAPI(domElement, name) {
        $('#linksMatches').show();
        $.getJSON(`${domain}/dbadmin/server/server.php?met=sr&name=${name}`, (data) => {
            //clear 'loading' text
            $(domElement).html('');
            //fill up the list
            data.forEach(link => {
                $(domElement).append(`<li class="list-group-item"><a href="${link.link}" target="_blank">${link.name}</a></li>`);
            });
        }).fail((xhr, status, message) => {
            $(domElement).html('');
            $(domElement).append('<li class="list-group-item">Unable to fetch data or link not found. :(</li>');
        });
    }
}
