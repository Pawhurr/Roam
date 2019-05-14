
var zone = {
    tz: $('#clock').attr('data-name')
};
console.log(zone);

$.ajax({
    url: '/clock',
    method: "POST",
    data: zone
}).then(function(res) {
    $('#clock').text(res.time);
});


var update = function() {
    $.ajax({
        url: '/clock',
        method: "POST",
        data: zone
    }).then(function(res) {
        $('#clock').text(res.time);
    })
};
setInterval(update, 60000);