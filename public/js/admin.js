
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

$('#login-submit').on('submit', function(event) {
    event.preventDefault();
    credentials = {
        username: $('#login-username').val(),
        password: $('#login-password').val()
    };
    $.ajax({
        url: '/login',
        method: 'POST',
        data: credentials
    }).then(function(res) {
        console.log(result);
    });
});