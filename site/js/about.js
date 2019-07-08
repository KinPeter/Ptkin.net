const about = {
    init() {
        this.animateInAboutDivsOnScroll();
    },
    animateInAboutDivsOnScroll() {
        $(window).on('scroll', (e) => {
            if (!$('.about-divs-row div:nth-child(1)').hasClass('aboutDivAnimateIn')
                && $(window).scrollTop() > 90) {
                let i = 1;
                const interval = setInterval(() => {
                    $(`.about-divs-row>div:nth-child(${i++})`).addClass('aboutDivAnimateIn');
                    if (i > 4) clearInterval(interval);
                }, 200);
            }
            if (!$('.skills-row div:nth-child(1)').hasClass('aboutDivAnimateIn')
                && $(window).scrollTop() > 500) {
                let i = 1;
                const interval = setInterval(() => {
                    $(`.skills-row>div:nth-child(${i++})`).addClass('aboutDivAnimateIn');
                    if (i > 2) clearInterval(interval);
                }, 200);
            }
        });
    }
}