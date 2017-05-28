$(document).ready(function(){
    var url = "https://5.196.225.5/api/Aeroports";

    $.getJSON(url,{})

    .done(function(data){
        $("#Provenance,#Destination,#provenance,#destination").autocomplete({
            source : data.Aeroports
        }); 

        /*Contrôle Recherche vol*/
        $("#Provenance,#Destination").blur(function () {
            ControleAeroport($(this),data.Aeroports);
        });
    });
});

$( function() {
    $( "#datepicker" ).datepicker({
    	altField:"#datepicker",
    	closeText:'Fermer',
    	prevText:'Précédent',
    	nextText:'Suivant',
		minDate:0,
    	currentText:'Aujourd\'hui',
    	monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    	monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    	dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    	dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    	dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    	weekHeader:'Sem.',
    	dateFormat:'dd/mm/yy'
    });
});



