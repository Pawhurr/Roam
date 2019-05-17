
$('.toggle').on('click', function() {
    $('.toggle').toggleClass('active');

    // $('.modal').toggle();
    
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
        }, 500)}, 900);
    }

    $('.modal').toggleClass('active');
});

