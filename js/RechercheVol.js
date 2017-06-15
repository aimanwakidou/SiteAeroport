// JavaScript source code
$("#zoneRecherche").submit(function (event) {
    event.preventDefault();
    var provenance = $("#Provenance").val();
    var destination = $("#Destination").val();
    var dateVol = $('input[name="dateVol"]').val();

    console.log("Date du vol : "+dateVol);
});