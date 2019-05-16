

$('#builder').on('click', function() {
    $('#country-builder-div').css({
        display: 'block'
    });

    $('#country-editor-div').css({
        display: 'none'
    });

    $('#user-editor-div').css({
        display: 'none'
    });
});

$('#country-editor').on('click', function() {
    $('#country-builder-div').css({
        display: 'none'
    });

    $('#country-editor-div').css({
        display: 'block'
    });

    $('#user-editor-div').css({
        display: 'none'
    });
});

$('#user-editor').on('click', function() {
    $('#country-builder-div').css({
        display: 'none'
    });

    $('#country-editor-div').css({
        display: 'none'
    });

    $('#user-editor-div').css({
        display: 'block'
    });
});

$('#country-selector').on('submit', function(event) {
    var data = {
        country: $('#editor-select').val()
    };
    event.preventDefault();
    var identifiers = ['bty', 'foods', 'religions', 'brief_history', 'facts', 'fun_fact'];

    $.ajax({
        url: '/country-select',
        method: 'POST',
        data: data
    }).then(function(res) {
        console.log(res[identifiers[0]]);
        console.log(identifiers[0])

        $('#country-editor-form').css({
            display: 'block'
        });
        for (var i in identifiers){
            $('#' + identifiers[i]).text(res[identifiers[i]]);
        }
    });
});

$('#country-editor-form').on('submit', function(event) {
    event.preventDefault();
    var identifiers = ['bty', 'foods', 'religions', 'brief_history', 'facts', 'fun_fact'];
    var data = [];

    for (var i in identifiers) {
        data[identifiers[i]] = ($('#' + identifiers[i]).val());
    }
    console.log(data);

    $.ajax({
        url: '/build-country',
        method: 'POST',
        data: data
    }).then(function(res) {
        console.log(res);
    });
});