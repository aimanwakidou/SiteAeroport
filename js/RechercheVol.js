// JavaScript source code
function addResultVols(compagnie,code,provenance,destination,imgSrc,date,heure,ArrDep){
    var trString = '<tr class="'+ArrDep+'">'+
                   '<td></td>'+
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

$("#zoneRecherche").submit(function (event) {
    event.preventDefault();
    var provenance = $("#Provenance");
    var destination = $("#Destination");
    var dateVol = $('input[name="dateVol"]').val();
    dateVol = dateVol.replace(/[/]/g, '-');

    if (provenance.parent().hasClass('success') && destination.parent().hasClass('success') && dateVol.length !== 0) {
        var url = "https://5.196.225.5/api/RechercheVols/" + provenance.val() + "/" + destination.val() + "/" + dateVol;
        $.getJSON(url, {})

            .done(function (data) {
                Object.keys(data).forEach(function (key) {
                    var ArrDep = (Object.keys(data[key]).indexOf("Arr") !== -1) ? "Arrivée" : "Départ";
                    addResultVols(data[key].Compagnie,
                                  data[key].CodeVol,
                                  data[key].Provenance,
                                  data[key].Destination,
                                  data[key].Img,
                                  data[key].Date,
                                  (ArrDep == "Arrivée") ? data[key].Arr : data[key].Dep,
                                  ArrDep);
                });
                /*Contrôle fenetre modal*/
                $(".AlertRechercheVol").each(function () {
                    var EnvoiOk = $(".EnvoiOkRechercheVol");
                    $(this).change(function () {
                        CheckButtonCheckBox(EnvoiOk, $(this));
                        ControleCheckBox(EnvoiOk,hasClass);
                    });
                });   
            });
    }

});