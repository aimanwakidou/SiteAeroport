$(document).ready(function () {
    var iles = ['Anjouan', 'Moroni', 'Mayotte', 'Moheli'];
    var hour = new Date().getHours();

    /*Mis à jour titre météo*/
    $("#DayOrNightVol").text((hour < 18 && hour > 6) ? "jour" : "soir");
    $("#DayOrNightMeteo").text((hour < 18 && hour > 6) ? "jour" : "soir");

    iles.forEach(function (ile) {
        var url = "https://5.196.225.5/api/Meteo/"+ile;

        $.getJSON(url, {
        })

        .done(function (data) {
            $("#" + ile + " .météoContent img").attr("src", data.url_icone);
            $("#" + ile + " .météoContent .temperature .temp_c").text(data.temperature + "°C");
            $("#" + ile + " .météoContent .temperature .DayOrNight").text((hour < 18 && hour > 6) ? "Jour : " : "Nuit : ");
        });

        
    });
});

 
