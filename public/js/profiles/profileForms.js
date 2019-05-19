
$('#password-confirm').on('submit', function(event) {
    event.preventDefault();
    data = {
        password: $('#pass-confirm-input').val(),
    };

    $.ajax({
        url: '/pass-confirm',
        method: 'POST',
        data: data
    }).then(function(res) {
        console.log(res);
        if (res.err) {
            console.log('it works')
            $('#pass-confirm-err').text(res.err);
        }
    });
});