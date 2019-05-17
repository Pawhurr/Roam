$(document).ready(function(){
    $('.hidden').removeClass('hidden');

    $('.show1').show();
    $('.show2').hide();
    $('.show3').hide();

    $('.btn1').on('click', function() {
        $('.show1').show(1000);
        $('.show2').hide(1000);
        $('.show3').hide(1000);
    });

    $('.btn2').on('click', function() {
        $('.show1').hide(1000);
        $('.show2').show(1000);
        $('.show3').hide(1000);
    });

    $('.btn3').on('click', function() {
        $('.show1').hide(1000);
        $('.show2').hide(1000);
        $('.show3').show(1000);
    });

});