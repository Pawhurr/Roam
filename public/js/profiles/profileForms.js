
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
    });
});