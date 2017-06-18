/*Création des cookies*/
$(document).ready(function () {
    CreateCookies();
    $('input:not([type="submit"])').each(function () {
        $(this).val('');
    });
});


/*Ajout des vols dans la recherche*/
function addResultVols(compagnie,code,provenance,destination,imgSrc,date,heure,ArrDep,imgArrDep){    
    var trString = '<tr class="'+ArrDep+'" active="OK">'+
        '<td class="imgArrDep"><img src="'+imgArrDep+'"/></td>'+
        '<td class="logoCompagny"><img src="'+imgSrc+'"/></td>'+
        '<td class="numVol">'+code+'</td>'+
        '<td>'+provenance+'</td>'+
        '<td>'+destination+'</td>'+
        '<td>'+date+'</td>'+
        '<td>'+heure+'</td>'+
        '<td></td>'+
        '<td><div class="checkbox"><input type="checkbox" name="Alert" class="AlertRechercheVol"/></div></td>'+
        '</tr>';
        
    var tr = $.parseHTML(trString);
    $("#RechercheVol").append(tr);

}

/*Ajout message -> Aucun Vol*/
function addNoVol() {      
    var trString = '<tr class="NoResultVol">' +
        '<td>Aucun vol ne correspond à la provenance et à la destination soumise</td>' +
        '</tr>';

    var tr = $.parseHTML(trString);
    $("#RechercheVol").append(tr);
    
}

/*Création des cookies*/
function CreateCookies() {
    Cookies.set('provenance', '');
    Cookies.set('destination', '');
    Cookies.set('dateVol', '');
}

/*Vérifier si les cookies existent*/
function CookiesExists() {
    return Cookies.get('provenance') !== '' && Cookies.get('destination') !== '' && Cookies.get('dateVol') !== '';
}

/*Véfier si les cookies contiennent les données de la précédente recherche*/
function IsSetCookies(prov, dest, date) {
    return Cookies.get('provenance') == prov && Cookies.get('destination') == dest && Cookies.get('dateVol') == date;
}

/*Set Cookie*/
function SetCookies(prov, dest, date) {
    Cookies.set('provenance', prov);
    Cookies.set('destination', dest);
    Cookies.set('dateVol', date);
}

/*Nettoyage précédent résultat*/
function NettoyageResult() {
    $("#RechercheVol tr").remove();
}

/* Recherche des vols */
$("#zoneRecherche").submit(function (event) {
    event.preventDefault();
    var provenance = $("#Provenance");
    var destination = $("#Destination");
    var dateVol = $('input[name="dateVol"]').val();
    dateVol = dateVol.replace(/[/]/g, '-');

    if (provenance.parent().hasClass('success') && destination.parent().hasClass('success') && dateVol.length !== 0) {
        var url = "https://5.196.225.5/api/RechercheVols/" + provenance.val() + "/" + destination.val() + "/" + dateVol;

        /*Lancement de la recherche*/
        if (!CookiesExists() || !IsSetCookies(provenance.val(), destination.val(), dateVol)) {

            /*Enregistrement des valeurs de la recherche*/
            SetCookies(provenance.val(), destination.val(),dateVol);

            /*Nettoyage précédente recherche*/
            NettoyageResult();

            /*Appel API*/
            $.getJSON(url, {})

                .done(function (data) {
                    if (Object.keys(data).indexOf("message") == -1) {

                        Object.keys(data).forEach(function (key) {
                            var ArrDep = (Object.keys(data[key]).indexOf("Arr") !== -1) ? "Arrivée" : "Départ";
                            addResultVols(data[key].Compagnie,
                                data[key].CodeVol,
                                data[key].Provenance,
                                data[key].Destination,
                                data[key].Img,
                                data[key].Date,
                                (ArrDep == "Arrivée") ? data[key].Arr : data[key].Dep,
                                ArrDep,
                                data[key].imgArrDep);
                        });
                        /*Contrôle fenetre modal*/
                        $(".AlertRechercheVol").each(function () {
                            var EnvoiOk = $(".EnvoiOkRechercheVol");
                            $(this).change(function () {
                                CheckButtonCheckBox(EnvoiOk, $(this));
                                ControleCheckBox(EnvoiOk, hasClass);
                            });
                        });
                    }
                    else {
                        addNoVol();
                    }
                });
        }
    }

});
