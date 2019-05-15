

$('#builder').on('click', function() {
    $('#city-div').css({
        display: 'block'
    });

    $('#city-editor-div').css({
        display: 'none'
    });

    $('#user-editor-div').css({
        display: 'none'
    });
});

$('#city-editor').on('click', function() {
    $('#city-div').css({
        display: 'none'
    });

    $('#city-editor-div').css({
        display: 'block'
    });

    $('#user-editor-div').css({
        display: 'none'
    });
});

$('#user-editor').on('click', function() {
    $('#city-div').css({
        display: 'none'
    });

    $('#city-editor-div').css({
        display: 'none'
    });

    $('#user-editor-div').css({
        display: 'block'
    });
});