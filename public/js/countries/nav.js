
$('.toggle').on('click', function() {
    $('.toggle').toggleClass('active');

    // $('.modal').toggle();
    
    if($('.modal').hasClass('active')) {
       
        $('.country-imgs').animate({
            opacity: '0'
        }, 300);

        $('.modal').animate({
            left: '-200%'
        },1000, function() {});


    } else {
        $('.modal').animate({
            left: '0%'
        },1000, function() {});
        setTimeout(function(){$('.country-imgs').animate({
            opacity: '1'
        }, 1500)}, 980);
    }

    $('.modal').toggleClass('active');
});

