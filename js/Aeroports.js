/*Fonction Ajout ProvDest*/
function AjoutProvDest(provDest) {
    var compagnieHtml = '<option value="' + provDest + '">' + provDest + '</option>';
    $(".aeroport select").append($.parseHTML(compagnieHtml));
}

$(document).ready(function () {
 
    $.getJSON(urlApi+"/Aeroports",{})

    .done(function(data){
        data.Aeroports.forEach(function (aeroport) {
            AjoutProvDest(aeroport);
        });

        /*Mise à jour données select*/
        $(".aeroport select").selectpicker('refresh');

        /*Contrôle Recherche vol*/
        $(".aeroport select").change(function () {
            ControleAeroport($(this), data.Aeroports);
            var toCompare;
            if ($(this).attr('name') == 'ProvSearch' || $(this).attr('name') == 'DestSearch') {
                toCompare = ($(this).attr('name') == 'ProvSearch') ? $('select[name="DestSearch"] option:selected').val() : $('select[name="ProvSearch"] option:selected').val();
                CompareProvDest($(this).find('option:selected').val(), toCompare);
            }
            else {
                toCompare = ($(this).attr('name') == 'ProvSuivi') ? $('select[name="DestSuivi"] option:selected').val() : $('select[name="ProvSuivi"] option:selected').val();
                CompareProvDestSuiviBagages($(this).find('option:selected').val(), toCompare);
            }
        });
        
        $(".aeroport button").blur(function(){
            ControleAeroport($(this).siblings("select"),data.Aeroports);
        });
    });
});




