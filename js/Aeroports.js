/*Fonction Ajout ProvDest*/
function AjoutProvDest(provDest) {
    var compagnieHtml = '<option value="' + provDest + '">' + provDest + '</option>';
    $(".DepartsInput select,.ArrivésInput select,.ProvenanceInput select,.DestinationInput select").append($.parseHTML(compagnieHtml));
}

$(document).ready(function () {
    var url = "https://5.196.225.5/api/Aeroports";

    $.getJSON(url,{})

    .done(function(data){
        data.Aeroports.forEach(function (aeroport) {
            AjoutProvDest(aeroport);
        });

        $(".DepartsInput select,.ArrivésInput select,.ProvenanceInput select,.DestinationInput select").selectpicker('refresh');

        /*Contrôle Recherche vol*/
        $(".DepartsInput select,.ArrivésInput select,.ProvenanceInput select,.DestinationInput select").change(function () {
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
    });
});




