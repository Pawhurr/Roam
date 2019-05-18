
var cursorY;

$(document).on('mousemove', function(e) {
    cursorY = e.clientY -10;
    $('.cursor').css({
        top: e.pageY - 10 + 'px',
        left: e.pageX - 10 + 'px' 
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

$('#home-option').on('pointerover', function() {
    $('.homeSpan').toggleClass('navTrigger');
})

$('#home-option').on('pointerout', function() {
    $('.homeSpan').toggleClass('navTrigger');
})

$('#about-us').on('pointerover', function() {
    $('.aboutSpan').toggleClass('navTrigger');
})

$('#about-us').on('pointerout', function() {
    $('.aboutSpan').toggleClass('navTrigger');
})

$('#portfolio').on('pointerover', function() {
    $('.portSpan').toggleClass('navTrigger');
})

$('#portfolio').on('pointerout', function() {
    $('.portSpan').toggleClass('navTrigger');
})

// $('button .cursor-clone').on('pointerover', function(e) {
//     console.log(e);
//     var currentRect = e.currentTarget.getBoundingClientRect();
//     // var targetRect = e.currentTarget.children[0].getBoundingClientRect();
//     if ($('.cursor-clone').hasClass('active')) {
//         // $('.cursor-clone').toggleClass('.active');
//     } else {
//         $('.cursor-clone').css({
//             display: 'block',
//             top: currentRect.top + window.scrollY - (currentRect.height/2) + 8 ,
//             left: currentRect.left + (currentRect.width/2)
//         });
//         $('.cursor-clone').toggleClass('active');
//     }
    
// });


// $('button').on('pointerleave', function(e) {
//     console.log('EXIT')
//     var flag = true;
//     // if ($('.cursor-clone').on('pointerover')) {
//     //     flag = false;
//     //     console.log('TRIP')
//     // }


//     if (flag) {
//         $('.cursor-clone').toggleClass('active');
//         $('.cursor-clone').css({
//             display: 'none',
//             top: 0,
//             left: 0
//         })
//     } else {
//         console.log('NOPE')
//         flag = true;
//     }
// });

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

