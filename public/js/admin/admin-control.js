

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

$('#country-builder').on('submit', function(event) {
    event.preventDefault();
   
    var identifiers = ['continent', 'country', 'bty', 'foods', 'religions', 'brief_history', 'facts', 'fun_fact'];
    var data = {};

    for (var i in identifiers) {
        data[identifiers[i]] = $('#country-builder').children('#' + identifiers[i]).val();
    }

    $.ajax({
        url: '/country-builder',
        method: 'POST',
        data: data
    }).then(function(res) {
    })


})

$('#country-selector').on('submit', function(event) {
    event.preventDefault();

    var data = {
        country: $('#editor-select').val()
    };
    var identifiers = ['bty', 'foods', 'religions', 'brief_history', 'facts', 'fun_fact'];

    $.ajax({
        url: '/country-select',
        method: 'POST',
        data: data
    }).then(function(res) {
        $('#country-editor-form').css({
            display: 'block'
        });
        for (var i in identifiers){
            $('#country-editor-form').children('#' + identifiers[i]).text(res[identifiers[i]]);
        }
    });
});

$('#country-editor-form').on('submit', function(event) {
    event.preventDefault();
    var identifiers = ['bty', 'foods', 'religions', 'brief_history', 'facts', 'fun_fact'];
    var data = {};

    for (var i in identifiers) {
        data[identifiers[i]] = ($('#' + identifiers[i]).val());
    }
    data.country = $('#editor-select').val()

    $.ajax({
        url: '/edit-country',
        method: 'POST',
        data: data
    }).then(function(res) {
    });
});