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

/*Recherche des vols*/
$("#validateAlert").click(function (event) {
    event.preventDefault();
    var compagnie = $('#CompagniesList select[name="compagnies"] option:selected');
    var date = $('input[name="dateVolFind"]');
    
    if (compagnie.length !== 0 && date.val().length !== 0) {
        $("#FindResult").modal("show");
        if (!IsSetCookiesFlash(compagnie.val(), date.val())) {
            /*Enregistrement valeur recherche*/
            SetCookieFlash(compagnie.val(), date.val());

            /*Nettoyage précédente recherche*/
            NettoyageResult($("#FindResultBody tr"), $(".EnvoiOkRechercheByAirline"));
            DefaultSelect($("#heureVolByAirline"), $("#ResultatVolByAirline > thead > tr > .ResultArrivéeOuDépart"), 'searchByAirline');

            /*Appel à l'api -> recherche*/
            let urlRechercheFlash = urlApi+"/RechercheVolsFlashAlert/" + compagnie.val() + "/" + date.val().replace(/[/]/g, '-');

            $.getJSON(urlRechercheFlash, {})

                .done(function (data) {
                    if (Object.keys(data).indexOf('message') === -1) {
                        DefaultSelect($("#heureVolByAirline"), $("#ResultatVolByAirline > thead > tr > .ResultArrivéeOuDépart"), 'searchByAirline');
                        Object.keys(data).forEach(function (key) {
                            var ArrDep = data[key].ArrDep ==  "Arr" ? "Arrivée" : "Départ";
                            addResultVols(
                                $("#FindResultBody"),
                                compagnie.val(),
                                data[key].CodeVol,
                                data[key].Provenance,
                                data[key].Destination,
                                data[key].Img,
                                null,
                                data[key].Heure,
                                ArrDep,
                                data[key].imgArrDep,
                                "SearchByAirline",
                                'RechercheByAirline',
                                data[key].Statut
                            );
                        });

                        /*Contrôle fenetre modal*/
                        $(".AlertRechercheByAirline").each(function () {
                            var EnvoiOk = $(".EnvoiOkRechercheByAirline");
                            $(this).change(function () {
                                CheckButtonCheckBox(EnvoiOk, $(this));
                                ControleCheckBox(EnvoiOk, 'RechercheByAirline');
                            });
                        });

                        /*Paramétrage Bootstrap Toggle Checkbox*/
                        $('.toggleCheckBox[data-vols="SearchByAirline"]').bootstrapToggle({
                            on: 'Suivi',
                            off: 'Non Suivi',
                            onstyle: "success",
                            size: "small",
                            height: 60,
                            width: 85
                        });
                    }
                    else {
                        addNoVol($("#FindResultBody"));
                        return;
                    }
                });
        }
    }
});

