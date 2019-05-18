


$(document).on('mousemove', function(e) {
    
    $('.cursor').css({
        top: e.pageY - 10 + 'px',
        left: e.pageX - 10 + 'px' 
    });
});

$(document).on('click', function() {
    $('.cursor').toggleClass('expand');

    setTimeout(function() {
        $('.cursor').toggleClass('expand');
    }, 500);
});

$('.toggle').on('click', function() {
    $('.toggle').toggleClass('active');
    
    if($('.modal').hasClass('active')) {
       
        $('.country-imgs').animate({
            opacity: '0'
        }, 00);

        $('.modal').animate({
            left: '-200%'
        },500, function() {});


    } else {
        $('.modal').animate({
            left: '0%'
        },1000, function() {});
        setTimeout(function(){$('.country-imgs').animate({
            opacity: '1'
        }, 500)}, 800);
    }

    $('.modal').toggleClass('active');
});

