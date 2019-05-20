
$('#login-form').on('submit', function(event) {
    event.preventDefault();

    var formIdentifiers = ['signup-username', 'signup-email', 'signup-password'];
    var dataIdentifiers = ['username', 'email', 'password'];

    var data = {}
    for (var i in formIdentifiers) {
        data[dataIdentifiers[i]] = $('#login-form').children('#' + formIdentifiers[i]).val();
    }
    console.log(data);

    $.ajax({
        url: '/signup',
        method: 'POST',
        data: data,
    }).then(function(res) {
        if(res.err) {
            $('#modal-msg').text(res.err);
            $('#signup-modal').css({
                display: 'block'
            });
            $('.close-btn').toggleClass('refresh-btn');
        } else if (res.signup) {
            $('#modal-msg').text(res.signup);
            $('#signup-modal').css({
                display: 'block'
            });
            $('.close-btn').toggleClass('login-btn');
        }
        console.log(res);
    });
});

$('.close-btn').on('click', function() {
    if ($('.close-btn').hasClass('refresh-btn')) {
        location.reload();
    } else if ($('.close-btn').hasClass('login-btn')) {
        window.location.replace('/login');
    }
    $('#admin-msg-modal').css({
        display: 'none'
    });
});