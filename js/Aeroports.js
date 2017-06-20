$(document).ready(function(){
    var url = "https://5.196.225.5/api/Aeroports";

    $.getJSON(url,{})

    .done(function(data){
        $("#Provenance,#Destination,#provenance,#destination").autocomplete({
            minLength:0,	   	
            source : data.Aeroports
        }).focus(function(){
	     $(this).autocomplete("search",$(this).val());
        }); 

        /*Contrôle Recherche vol*/
        $("#Provenance,#Destination,#provenance,#destination").blur(function () {
            ControleAeroport($(this),data.Aeroports);
        });
    });
});




