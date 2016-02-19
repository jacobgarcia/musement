var d = $('#somedialog');

$('.open').click(function (e) {
    if(!firstTime){
        d.removeClass('dialog-close');
        d.addClass('dialog-open');
        alert(totalTime);
    }
});

$('.close').click(function (e) {
    d.removeClass('dialog-open');
    d.addClass('dialog-close');
});