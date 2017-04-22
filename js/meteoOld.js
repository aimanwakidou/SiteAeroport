$(document).ready(function () {
    var iles = ['Anjouan', 'Moroni', 'Mayotte', 'Moheli'];

    iles.forEach(function (ile) {
        var url = "";
        if (ile == 'Anjouan')
            url = "http://api.wunderground.com/api/5fe80449e735d30f/conditions/q/COMOROS/Moutsamoudou.json";
        else if (ile == 'Mayotte')
            url = "http://api.wunderground.com/api/5fe80449e735d30f/conditions/q/COMOROS/Mamoudzou.json";
        else
            url = "http://api.wunderground.com/api/5fe80449e735d30f/conditions/q/COMOROS/" + ile + ".json";

        console.log(url);

        $.getJSON(url, {
            tags: "mount rainier",
            tagmode: "any",
            format: "json"
        })

        .done(function (data) {
            var hour = new Date().getHours();
            $("#" + ile + " .météoContent img").attr("src", data.current_observation.icon_url);
            $("#" + ile + " .météoContent .temperature .temp_c").text(data.current_observation.temp_c+"°C");
            $("#" + ile + " .météoContent .temperature .DayOrNight").text((hour < 18) ? "Jour : " : "Nuit : ");
        });
    });
});

 
