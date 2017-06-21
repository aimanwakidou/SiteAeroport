function addMeteo(imgSrc, ile, temp,hour) {

    var meteoString = '<span class="temperature">' + ((hour > 6 && hour < 18) ? 'Jour : ' : 'Nuit : ') + temp + '°C </span>'+   
        '<img src="' + imgSrc + '" alt="icone"/>';

    var meteo = $.parseHTML(meteoString);

    $("#" + ile + " .météoContent").append(meteo);
}

$(document).ready(function () {
    var iles = ['Anjouan', 'Moroni', 'Mayotte', 'Moheli'];
    var hour = new Date().getHours();

    /*Mis à jour titre météo*/
    $("#DayOrNightMeteo").text((hour < 18 && hour > 6) ? "jour" : "soir");

    iles.forEach(function (ile) {
        var url = "https://5.196.225.5/api/Meteo/"+ile;

        $.getJSON(url, {
        })

            .done(function (data) {
                addMeteo(data.url_icone, ile,data.temperature,hour);
            });

        
    });
});

 
