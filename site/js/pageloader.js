//Primary domain:
const domain = "https://www.p-kin.com"

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
            console.log('done');
            general.init();
            cv.init();
            this.hideElements();
        });
    },
    loadAllSections() {
        return new Promise(resolve => {
            for (let i = 0, p = Promise.resolve(); i < page.sections.length; i++) {
                let current = page.sections[i];
                p = p.then(() => page.loadHtml(current.section, current.file)
                .then(() => {
                    if (i == page.sections.length-1) resolve();
                }));
            }            
        });
    },
    loadHtml(domElement, fileName) {
        return new Promise(resolve => {
            $.get(`./site/html/${fileName}`).done(result => {
                $(domElement).html(result);
                console.log(domElement)
                resolve();
            });
        });
    },
    hideElements() {
        //initially hide the password div
        $(".downloadCVwrapper").hide();

    }
}