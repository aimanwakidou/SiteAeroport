/*Création des cookies*/
$(document).ready(function () {
    CreateCookiesFlash();
    $('#FindResult select[name="FindResult"]').selectpicker('refresh');
});

/*Cookies pour flash*/
function CreateCookiesFlash() {
    Cookies.set('compagnie', '');
    Cookies.set('dateVolFlash', '');
}

/*Cookies pour flash*/
function CookiesFlashExists() {
    return Cookies.get('compagnie') !== '' && Cookies.get('dateVolFlash');
}

/*Cookies pour flash*/
function SetCookieFlash(compagnie, date) {
    Cookies.set('compagnie', compagnie);
    Cookies.set('dateVolFlash', date);
}

/*Cookies pour flash*/
function IsSetCookiesFlash(compagnie,date) {
    return Cookies.get('compagnie') === compagnie && Cookies.get('dateVolFlash') === date;
}

/*Ajout select*/
function addResultVolsFlash(codeVol,compagnie, provenance, destination, heure, arrDep) {
    var arrDepAffiche = arrDep === "Arr" ? "Arrivée à " : "Départ à ";
    var optionString = '<option value="' + codeVol + '">' +
        '<div class="resultVolFlash">' +
        '<span>' + codeVol + '</span>' +
        '<span>Provenance : ' + provenance + ' => Destination : ' + destination + '</span>' +
        '<span>'+ arrDepAffiche + heure + '</span>' +
        '</div>' +
        '</option>';
        

    $('#FindResult select[name="FindResult"]').append($.parseHTML(optionString));
}

/*Aucun Vol*/
function AucunVol() {
    var optionString = '<option value="">Aucun vol n\'a été trouvée</option>';
    $('#FindResult select[name="FindResult"]').append($.parseHTML(optionString));
}

/*Purge des précédents résultats*/
function PurgeSelect() {
    $('#FindResult select[name="FindResult"] option').each(function () {
        $(this).remove();
    });
    $('#FindResult select[name="FindResult"]').selectpicker('refresh');
}


/*Recherche des vols*/
$("#validateAlert").click(function (event) {
    event.preventDefault();
    var compagnie = $('#CompagniesList select[name="compagnies"] option:selected');
    var date = $('input[name="dateVolFind"]');
    
    if (compagnie.length !== 0 && date.val().length !== 0) {
        if (!IsSetCookiesFlash(compagnie.val(), date.val())) {
            /*Enregistrement valeur recherche*/
            SetCookieFlash(compagnie.val(), date.val());

            /*Nettoyage précédent résultat*/
            PurgeSelect();

            /*Appel à l'api -> recherche*/
            var url = "https://5.196.225.5/api/RechercheVolsFlashAlert/" + compagnie.val() + "/" + date.val().replace(/[/]/g, '-');

            $.getJSON(url, {})

                .done(function (data) {
                    var findResult = $('#FindResult');
                    if (findResult.hasClass("noDisplayGenerique2")) {
                        findResult.show(200);
                        findResult.removeClass("noDisplayGenerique2");
                    }

                    if (Object.keys(data).indexOf('message') === -1) {
                        Object.keys(data).forEach(function (key) {
                            addResultVolsFlash(data[key].CodeVol, compagnie.val(),
                                data[key].Provenance, data[key].Destination,
                                data[key].Heure, data[key].ArrDep
                            );
                        });
                    }
                    else {
                        AucunVol();
                    }
                    $('#FindResult select[name="FindResult"]').selectpicker('refresh');
                });
        }
    }
});

