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

    $("#bootstrap-touch-slider").swiperight(function () {
        $(this).carousel('prev');
    });

    $("#bootstrap-touch-slider").swipeleft(function () {
        $(this).carousel('next');
    });
});


