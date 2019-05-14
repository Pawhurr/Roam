
$('#admin-submit').on('submit', function(event) {
    event.preventDefault();
    login = {
        username: $('#username').val(),
        email: $('#email').val(),
        password: $('#password').val()
    };
    $.ajax({
        url: '/signup',
        method: 'POST',
        data: login
    }).then(function(res) {
        console.log(result);
    });
});

