
$('#password-confirm').on('submit', function(event) {
    event.preventDefault();

    $('#pass-confirm-err').text('');
        data = {
            password: $('#pass-confirm-input').val(),
        };    
    $.ajax({
        url: '/pass-confirm',
        method: 'POST',
        data: data
    }).then(function(res) {
        $('#pass-confirm-input').val('')
        console.log(res);
        if (res.err) {
            console.log('it works')
            $('#pass-confirm-err').text(res.err);
        } else if (res.valid) {
            console.log(res.valid);
            $('#password-confirm').css({
                display: 'none'
            });
            $('#password-change').css({
                display: 'block'
            });
        }
    });
});

$('#password-change').on('submit', function(event) {
    event.preventDefault();

    var data;

    $('#pass-confirm-err').text('');
    if ($('#pass-update-input').val() === $('#pass-update-confirm').val()) {
        $('#pass-update-err').text('');
        console.log('should log data')
        data = {
            password: $('#pass-update-input').val(),
        };    
    } else {
        $('#pass-update-err').text("The passwords you've entered do not match!");
    }

    console.log($('#pass-update-input').val());
    console.log(data.password);

    $.ajax({
        url: '/pass-update',
        method: 'POST',
        data: data
    }).then(function(res) {
        console.log(res);
        $('#pass-update-input').val('');
        $('#pass-update-confirm').val('');
        if (res.updated) {
            $('#settings-modal').css({
                display: 'block'
            });
            $('#modal-msg').text(res.updated);
            $('#password-change').css({
                display: 'none'
            });
            $('#password-confirm').css({
                display: 'block'
            });
        } else {
            $('#settings-modal').css({
                display: 'block'
            });
            $('#modal-msg').text(res.err);
            $('#password-change').css({
                display: 'none'
            });
            $('#password-confirm').css({
                display: 'block'
            });
        }
    });
});

$('#email-confirm').on('submit', function(event) {
    event.preventDefault();

    var data = {
        password: $('#email-confirm-input').val()
    };
    console.log(data.password);

    $.ajax({
        url: '/pass-confirm',
        method: 'POST',
        data: data
    }).then(function(res) {
        if (res.valid) {
            $('#email-confirm-input').val('');
            $('#email-confirm').css({
                display: 'none'
            });
            $('#email-change').css({
                display: 'block'
            });
        } else if (res.err) {
            $('#email-pass-confirm').text(res.err);
        }
        console.log(res);
    });
});

$('#email-change').on('submit', function(event) {
    event.preventDefault();

    var data = {
        email: $('#email-update-input').val()
    };
    console.log(data.email);

    $.ajax({
        url: '/email-update',
        method: 'POST',
        data: data
    }).then(function(res) {
        $('#email-update-input').val('');
        console.log(res);
        if (res.updated) {
            $('#settings-modal').css({
                display: 'block'
            });
            $('#modal-msg').text(res.updated);
            $('.close-btn').toggleClass('refresh-btn');
        } else {
            $('#settings-modal').css({
                display: 'block'
            });
            $('#modal-msg').text(res.err);
            $('#email-change').css({
                display: 'none'
            });
            $('#email-confirm').css({
                display: 'block'
            });
        }
    });
});

$('.close-btn').on('click', function() {
    if ($('.close-btn').hasClass('refresh-btn')) {
        location.reload();
    }
    $('#settings-modal').css({
        display: 'none'
    });
});

$('#user-info').on('click', function() {
    $('.user-info').css({
        display: 'block'
    });
    $('#email-confirm').css({
        display: 'none'
    });
    $('#password-confirm').css({
        display: 'none'
    });
});

$('#pass-option').on('click', function() {
    $('#email-confirm').css({
        display: 'none'
    });
    $('#password-confirm').css({
        display: 'block'
    });
    $('.user-info').css({
        display: 'none'
    });
});

$('#email-option').on('click', function() {
    $('#password-confirm').css({
        display: 'none'
    });
    $('#email-confirm').css({
        display: 'block'
    });
    $('.user-info').css({
        display: 'none'
    });
});
