
var cursorY;

$(document).on('mousemove', function(e) {
    cursorY = e.clientY -10;
    $('.cursor').css({
        top: e.pageY - 15 + 'px',
        left: e.pageX - 15 + 'px' 
    });
});


$(document).on('scroll', function(e) {
    $('.cursor').css({
        top: cursorY + e.currentTarget.scrollingElement.scrollTop
    });
});

$(document).on('click', function() {
    $('.cursor').toggleClass('expand');

    setTimeout(function() {
        $('.cursor').toggleClass('expand');
    }, 500);
});
