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
        '<td colspan="9" style="text-align:center;">Aucun vol ne correspond à la provenance et à la destination soumise ou à la date soumise </td>' +
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
    var envoiOk = $(".EnvoiOkRechercheVol");
    
    if(envoiOk.hasClass("displayButton"))
        envoiOk.removeClass("displayButton");
    
    if(!envoiOk.hasClass('noDisplayButton'))
        envoiOk.addClass('noDisplayButton');

    DefaultSelect();
}

/*Select -> set à défaut*/
function DefaultSelect(){
    var selected = $('select[name="resultatVol"] option:selected');
    if(selected.attr('id') != "default"){
        selected.removeAttr("selected");
        $('select[name="resultatVol"] #default').attr('selected','selected');
    }
    $("#ResultArrivéeOuDépart").text($('select[name="resultatVol"] #default').text());
}

/* Message Erreur Invalide */
function MessageErreurInvalide(message, checkValid, messageText) {
    if (!checkValid) {
        var messageErreur = message.find('span[itemprop="3"]');
        messageErreur.find('mark').text(messageText);
        AfficheMessageGenerique2(message.find('span[itemprop="1"]'), 'noDisplayGenerique2');
        AfficheMessageGenerique2(message.find('span[itemprop="2"]'), 'noDisplayGenerique2');
        AfficheMessageGenerique(message, "displayGenerique");
        AfficheMessageGenerique2(messageErreur, "displayGenerique2");
    }
}

/* Recherche des vols */
$("#zoneRecherche").submit(function (event) {
    event.preventDefault();
    var provenance = $("#ProvSearch option:selected");
    var destination = $("#DestSearch option:selected");
    var dateVol = $('input[name="dateVol"]').val();
    var message = $('#MessageErreurProvDest');
    var provSuccess = $("#ProvSearch").siblings('button').hasClass('success');
    var destSuccess = $("#DestSearch").siblings('button').hasClass('success');

    dateVol = dateVol.replace(/[/]/g, '-');

    if (!MessageErreurRecherche(provenance.val(), message, 'provenance') || !MessageErreurRecherche(destination.val(), message, 'destination') || !MessageErreurRecherche(dateVol, message, 'jour du vol'))
        return;

    AfficheMessageGenerique2(message, 'noDisplayGenerique2');

    if(!CompareProvDest(provenance.val(),destination.val()))
        return;

    AfficheMessageGenerique2(message, 'noDisplayGenerique2');
   
    if (provSuccess && destSuccess) {
        $("#ResultatVol").modal("show");
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
                        DefaultSelect();
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
                                ControleCheckBox(EnvoiOk, 'RechercheVol');
                            });
                        });
                    }
                    else {
                        addNoVol();
                        return;
                    }
                });
        }
    }
    else {
        MessageErreurInvalide(message, provSuccess, 'provenance invalide');
        MessageErreurInvalide(message, destSuccess, 'destination invalide');
        return;
    }

});
