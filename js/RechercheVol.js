/*CrÈation des cookies*/
$(document).ready(function () {
    CreateCookies();
    $('input:not([type="submit"])').each(function () {
        $(this).val('');
    });
});


/*Ajout des vols dans la recherche*/
function addResultVols(compagnie,code,provenance,destination,imgSrc,date,heure,ArrDep){
    var trString = '<tr class="'+ArrDep+'">'+
                   '<td>'+ArrDep+'</td>'+
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

    var headerTable = $(".ResultatSearchVol thead");

    if (headerTable.hasClass("noDisplayGenerique"))
        headerTable.removeClass("noDisplayGenerique");

    if (!headerTable.hasClass("displayGenerique"))
        headerTable.addClass("displayGenerique");
}

/*Ajout message -> Aucun Vol*/
function addNoVol() {
    var trString = '<tr class="NoResultVol">' +
        'Aucun vol ne correspond √† la provenance et √† la destination soumise' +
        '</tr>';

    var tr = $.parseHTML(trString);
    $("#RechercheVol").append(tr);

    var headerTable = $(".ResultatSearchVol thead");

    if (headerTable.hasClass("displayGenerique"))
        headerTable.removeClass("displayGenerique");

    if (!headerTable.hasClass("noDisplayGenerique"))
        headerTable.addClass("noDisplayGenerique");
   
}

/*CrÈation des cookies*/
function CreateCookies() {
    Cookies.set('provenance', '');
    Cookies.set('destination', '');
    Cookies.set('dateVol', '');
}

/*VÈrifier si les cookies existent*/
function CookiesExists() {
    return Cookies.get('provenance') != '' && Cookies.get('destination') != '' && Cookies.get('dateVol') != '';
}

/*VÈfier si les cookies contiennent les donn√©es de la prÈcÈdente recherche*/
function IsSetCookies(prov, dest, date) {
    return Cookies.get('provenance') == prov && Cookies.get('destination') == dest && Cookies.get('dateVol') == date;
}

/*Set Cookie*/
function SetCookies(prov, dest, date) {
    Cookies.set('provenance', prov);
    Cookies.set('destination', dest);
    Cookies.set('dateVol', date);
}

/*Nettoyage pr√©c√©dent r√©sultat*/
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

            /*Nettoyage prÈcÈdente recherche*/
            NettoyageResult();

            /*Appel API*/
            $.getJSON(url, {})

                .done(function (data) {
                    if (Object.keys(data).indexOf("message") == -1) {

                        Object.keys(data).forEach(function (key) {
                            var ArrDep = (Object.keys(data[key]).indexOf("Arr") !== -1) ? "Arriv√©e" : "D√©part";
                            addResultVols(data[key].Compagnie,
                                data[key].CodeVol,
                                data[key].Provenance,
                                data[key].Destination,
                                data[key].Img,
                                data[key].Date,
                                (ArrDep == "Arriv√©e") ? data[key].Arr : data[key].Dep,
                                ArrDep);
                        });
                        /*Contr√¥le fenetre modal*/
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
