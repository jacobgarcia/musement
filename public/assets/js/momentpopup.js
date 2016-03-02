var d = $('#somedialog');

$('.open').click(function (e) {
    if(!firstTime){
        d.removeClass('dialog-close');
        d.addClass('dialog-open');
    }
});

$('.close').click(function (e) {
    d.removeClass('dialog-open');
});
