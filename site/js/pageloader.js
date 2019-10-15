//Primary domain:
// const domain = 'https://cors-anywhere.herokuapp.com/https://old.p-kin.com';
const domain = 'https://old.p-kin.com';

const page = {
    sections: [
        {section: '#carousel-section', file: 'carousel.html'},
        {section: '#navbar-section', file: 'navbar.html'},
        {section: '#about-section', file: 'about.html'},
        {section: '#portfolio-section', file: 'portfolio.html'},
        {section: '#links-section', file: 'links.html'},
        {section: '#travels-section', file: 'travels.html'},
        {section: '#contact-section', file: 'contact.html'},
    ],
    init() {
        this.loadAllSections().then(() => {
            this.loadPortfolioJson().then(() => {
                console.log('All HTML loaded.');
                nav.init();
                about.init();
                cv.init();
                portfolio.init();
                links.init();
                autocomplete.init();
                travels.init();
                contact.init();
                this.hideElements(); 
                this.startCarousel();
            });                       
        });
    },
    loadAllSections() {
        return new Promise(resolve => {
            // Looping through the sections and loading them with each is a promise.
            // Loop starts with p as an immediately self-resolving promise.
            for (let i = 0, p = Promise.resolve(); i < page.sections.length; i++) {
                let current = page.sections[i];
                // In each iteration p will be a new promise (loadHtml).
                // It can go into the next iteration only when the previous promise is resolved.
                p = p.then(() => page.loadHtml(current.section, current.file)
                .then(() => {
                    // when we reach the end of the list, resolve the 'parent promise'
                    if (i == page.sections.length-1) resolve();
                }));
            }            
        });
    },
    loadHtml(domElement, fileName) {
        return new Promise(resolve => {
            $.get(`./site/html/${fileName}`).done(result => {
                $(domElement).html(result);
                console.log(domElement + ' loaded.');
                resolve();
            });
        });
    },
    loadPortfolioJson() {
        return new Promise(resolve => {
            $.get(`./site/json/portfolio.json`).done(result => {
                portfolio.items = result;
                console.log('Portfolio items loaded.')
                resolve();
            });
        });
    },
    hideElements() {
        $('.downloadCVwrapper, #linksWrapper, #linksMatches, #tags-matches, #emailform').hide();
        $('#loading-screen').fadeOut(500);
        nav.addStickyNavbar();
    },
    startCarousel() {
        $('.carousel').carousel({
            interval: 3500,
            pause: false,
            ride: 'carousel'
        });
    }
}