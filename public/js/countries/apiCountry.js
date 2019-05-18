
$(".country").on("click", function (event) {
    event.preventDefault();
    let data = { country: this.id }
    $.ajax({
        type: "POST",
        url: '/apiCountry',
        data: data
    }).then(function (res) {
        console.log(res);
    });

});