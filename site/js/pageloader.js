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
    loadAllSections() {
        this.sections.forEach(element => page.loadHtml(element.section, element.file));
    },
    loadHtml(domElement, fileName) {
        $.get(`./site/html/${fileName}`).done(result => $(domElement).html(result));
    }
}