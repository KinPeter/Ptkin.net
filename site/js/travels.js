//==========================================================
//                   TRAVELS SCRIPTS
//==========================================================
const travels = {
    init() {
        this.collapseToggleListener();
    },
    collapseToggleListener() {
        $('.travels-collapse-toggle').click(function() {
            let image = $(this).children().closest('div').find('img').attr('id');
            let collapse = $(this).next('.collapse');
            if (collapse.hasClass('show')) {
                travels.scaleImage(image, 'enlarge', 2);
            } else {
                travels.scaleImage(image, 'shrink', 2);
            }
        });
    },
    scaleImage(image, method, factor) {
        const newSize = method == 'shrink' ? $(`#${image}`).width() / factor : $(`#${image}`).width() * factor;
        $(`#${image}`).animate({ width: newSize });
    }
}