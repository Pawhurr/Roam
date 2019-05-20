
$('.toggle').on('click', function() {
    $('.toggle').toggleClass('active');
    
    if($('#nav-options-col').hasClass('active')) {

        $('#nav-options-col').animate({
            left: '-100%'
        }, function() {});
    } else {
        $('#nav-options-col').animate({
            left: '0%'
        }, function() {});
    }

    $('#nav-options-col').toggleClass('active');
});


$('#home-option').on('pointerover', function() {
    $('.homeSpan').toggleClass('navTrigger');
})

$('#home-option').on('pointerout', function() {
    $('.homeSpan').toggleClass('navTrigger');
})

$('#about-option').on('pointerover', function() {
    $('.aboutSpan').toggleClass('navTrigger');
})

$('#about-option').on('pointerout', function() {
    $('.aboutSpan').toggleClass('navTrigger');
})

$('#portfolio').on('pointerover', function() {
    $('.portSpan').toggleClass('navTrigger');
})

$('#portfolio').on('pointerout', function() {
    $('.portSpan').toggleClass('navTrigger');
})

