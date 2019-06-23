//==========================================================
//                   PORTFOLIO SCRIPTS
//==========================================================
const portfolio = {
    items: [],
    init() {
        this.appendItemsToHtml();
        this.showDetailsToggleListener();
        this.closePortfolioListener();
    },
    closePortfolioListener() {
        $(window).scroll(() => {
            let scroll = $(window).scrollTop();
            if ($('#portfolio-items').hasClass('show')
                && scroll > $('#portfolio-section').offset().top
                && scroll < $('#links-section').offset().top - 500
                ) {
                $('#pf-close-collapse').fadeIn(500);
            }
            else $('#pf-close-collapse').fadeOut(500);
        });
        $('#pf-close-collapse').on('click', () => {
            nav.scrollTo('#portfolio-section');
            $('#portfolio-items').collapse('hide');
            $('#pf-close-collapse').fadeOut(500);
        });
    },
    showDetailsToggleListener() {
        $('.pf-row').click(function() {
            let collapse = $(this).find('.pf-details'); 
            let myDiv = $(this).children().first();
            let imageDiv = $(this).find('.pf-img-div');
            let image = imageDiv.find('img');

            if ($(window).width() > 768) {
                if (collapse.hasClass('expanded')) {
                    collapse.removeClass('expanded');
                    image.animate({width: '20%', opacity: .05}, 500, 'easeOutCubic', () => {
                        myDiv.removeClass('col-md-6').addClass('col-md-9');
                        imageDiv.removeClass('col-md-6').addClass('col-md-3');
                        image.animate({width: '100%', opacity: 1}, 500, 'easeInCubic');
                    });  
                } else {
                    collapse.addClass('expanded');
                    image.animate({width: '20%', opacity: .05}, 500, 'easeOutCubic', () => {
                        myDiv.removeClass('col-md-9').addClass('col-md-6');
                        imageDiv.removeClass('col-md-3').addClass('col-md-6');
                        image.animate({width: '100%', opacity: 1}, 500, 'easeInCubic');
                    });
                }
            }
            collapse.toggle('slow');
        });
    },
    appendItemsToHtml() {
        this.items.forEach(item => {
            let html = this.composeHtml(item);
            $('#portfolio-items').append(html);
        });
    },
    composeHtml(item) {
        let html = "";
        // add starting parts
        html = html.concat( this.addTitleRow(item.name) );
        // iterate through badges
        item.badges.forEach(badge => html = html.concat( this.addBadge(badge) ));
        // add part between badges and features
        html = html.concat( this.addDescription(item.descr) ); 
        // iterate through features
        item.features.forEach(feature => html = html.concat( this.addFeature(feature.title, feature.text) ));
        // add image and finish html
        html = html.concat( this.addImageAndEndings(item.image, item.imageid, item.name) );
        return html;
    },
    addTitleRow(name) {
        return `<div class="container slide-in-left"><div class="row pf-row"><div class="col-md-9 pf-div pf-text-div"><div class="pf-title-row"><h4 class="pf-name">${name}</h4><div class="pf-badges">`;
    },
    addBadge(badge) { 
        return `<span class="badge">${badge}</span>`;
    },
    addDescription(descr) {
        return `</div><p class="pf-desc">${descr}</p></div><div class="pf-details"><div class="pf-features">`;
    },
    addFeature(name, descr) {
        return `<div class="pf-feature"><i class="fas fa-thumbs-up"></i>${name}</div>
        <p>${descr}</p>`;
    },
    addImageAndEndings(path, id, alt) {
        return `</div></div></div><div class="col-md-3 pf-div pf-img-div text-right"><img src="${path}" alt="${alt}" class="rounded pf-img" id="${id}"></div></div></div>`;
    }
}
