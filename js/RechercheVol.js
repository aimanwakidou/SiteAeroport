// JavaScript source code
$("#zoneRecherche").submit(function (event) {
    event.preventDefault();
    var provenance = $("#Provenance");
    var destination = $("#Destination");
    var dateVol = $('input[name="dateVol"]').val();
    dateVol = dateVol.replace(/[/]/g, '-');

    if (provenance.parent().hasClass('success') && destination.parent().hasClass('success') && dateVol.length != 0) {
        var url = "https://5.196.225.5/api/RechercheVols/" + provenance.val() + "/" + destination.val() + "/" + dateVol;
        $.getJSON(url, {})

            .done(function (data) {
                Object.keys(data).forEach(function (key) {
                    console.log(data[key]);
                });
            });
    }

});