/*Controle formulaire*/
var emailRegex = /^([a-zA-Z0-9àäéèëêïîöôüûÿŷ\.\-_]+)@([a-zA-Z0-9àäéèëêïîöôüûÿŷ\.\-_]+)\.([a-zA-Z0-9àäéèëêïîöôüûÿŷ\.\-_]{2,})$/;
var checkNomPrenom = /^[a-zA-Zéèïëêâî ]+$/;

$('#email,#tel').on("change blur", function () {
    var regex = ($(this).attr("id") == "tel") ? /^[0-9]{10}$/ : emailRegex;
    Controle($(this), regex);
    ControleSubmit(2);
});

$("#email,#tel").click(ControleSubmit(2));

/*Controle nom et prénom*/
$("#nom,#prénom").on("change blur", function () {
    Controle($(this), checkNomPrenom);
    if (!$(this).parent().hasClass("success") && $("#submit").hasClass("EnvoiOK"))
        $("#submit").removeClass("EnvoiOK");
});

/*Contrôle vol*/
$("#first_vol input").click(function () {
    if ($(this).hasClass("fail"))
        $(this).removeClass("fail");
    ControleSubmit(2);
});

$("#first_vol input").on("change blur",function(){
    ControleSubmit(2);
});

/*Nettoyage en cas de clique et si il y'a rien dans l'input*/
$("input").each(function(){
	$(this).click(function(){
        Nettoyage($(this));
	});

	$(this).blur(function(){
		if(!($(this).val().length))
			Nettoyage($(this));
	});
});

/*Contrôle Recherche vol*/
$("#Provenance,#Destination").blur(function () {
    ControleAeroport($(this));
});

/*Contrôle pour la météo*/
$(".choixIles").change(function(){
	var selected = $(".choixIles option:selected");
	$(".météoWrapper div").each(function(){
		if(($(this).attr('id') == selected.val()) && (selected.val() != "Iles")){
			$(this).show(100);
			$(this).addClass('activeIle');
		}
		else{
			if($(this).hasClass('activeIle')){
				$(this).removeClass('activeIle');
				$(this).hide(0);
			}
		}
	});
});

/*Controle bouton suivi choix notification*/
$(".RadioButton button").each(function () {
    $(this).click(function () {
        ToggleButton($(this));
        ControleButton($(this),$(".SuiviBagages-EmailTel"),$(this).hasClass("OK"),true,$("#submit1"));
    });
});

/*Controle bouton suivi question*/
$(".RadioButtonSuivi button").each(function(){
    $(this).click(function(){
        ToggleButton($(this));
        ControleButtonWithoutSubmit($(this),$(".RechercheVolSuivi"),$(this).hasClass("OK"),false);
    });
});

/*Contrôle submit*/
function ControleSubmit(numero) {
    var email = $("#email");
    var tel = $("#tel");
	var num_vol = (numero == 1) ? $(".suiviBagages-num_vol-input") : $("#first_vol input");
    var submitButton = $("#submit");
 
	if (email.val() && tel.val() && num_vol.val()) {
        var classToAdd = (email.parent().hasClass("success") && tel.parent().hasClass("success")) ? "EnvoiOK" : "EnvoiNonOK";
        var classToRemove = (classToAdd == "EnvoiOK") ? "EnvoiNonOK" : "EnvoiOK";

        if (classToAdd == "EnvoiOK")
            submitButton.removeAttr("disabled");

        if (submitButton.hasClass(classToRemove))
            submitButton.removeClass(classToRemove);
			
        submitButton.addClass(classToAdd);
    }

    else {
		if(!submitButton.attr("disabled"))
			submitButton.attr("disabled", true);
        
		if (submitButton.hasClass("EnvoiOK"))
            submitButton.removeClass("EnvoiOK");

        if (submitButton.hasClass("EnvoiNonOK"))
            submitButton.removeClass("EnvoiNonOK");
    }
}

/*Fonction toggleButton*/
function ToggleButton(buttonJQuery){
    if (buttonJQuery.hasClass("KO")) {
        buttonJQuery.siblings().removeClass("OK");
        buttonJQuery.siblings().addClass("KO");
        buttonJQuery.addClass("OK");
        buttonJQuery.removeClass("KO");
    }    
}

/*Fonction de contrôle des boutons Oui/Non sans submit*/
function ControleButtonWithoutSubmit(button,elemToShow,test,onShow,onShow){
    var testOnShow = onShow ? "oui" : "non";
    var notToShow = (testOnShow == "oui") ? "non" : "oui";

    if(test){
        if (button.attr("id") == "non") {
            if (elemToShow.hasClass("noDisplayGenerique")){
                elemToShow.removeClass("noDisplayGenerique");
                elemToShow.addClass("displayGenerique");
            }
        }

        if (button.attr("id") == "oui") {
            if (elemToShow.hasClass("displayGenerique")) {
                elemToShow.removeClass("displayGenerique");
                elemToShow.addClass("noDisplayGenerique");
            }
        }
    }
}

/*Fonction de contrôle des boutons Oui/Non avec submit*/
function ControleButton(button,elemToShow,test,onShow,submitButton){
    var testOnShow = onShow ? "oui" : "non";
    var notToShow = (testOnShow == "oui") ? "non" : "oui";

    if(test){
        if (button.attr("id") == testOnShow) {
            if (elemToShow.hasClass("noDisplayGenerique")){
                elemToShow.removeClass("noDisplayGenerique");
                elemToShow.addClass("displayGenerique");
                if (!submitButton.attr("disabled")) {
                    submitButton.attr("disabled", true);
                    if (submitButton.hasClass("EnvoiNonOK"))
                        submitButton.removeClass("EnvoiNonOK");
                }
            }
        }

        if (button.attr("id") == notToShow) {
            if (elemToShow.hasClass("displayGenerique")) {
                elemToShow.removeClass("displayGenerique");
                elemToShow.addClass("noDisplayGenerique");
                if ($("#nom").parent().hasClass("success") && $("#prénom").parent().hasClass("success")) {
                    if (submitButton.hasClass("EnvoiNonOK"))
                        submitButton.removeClass("EnvoiNonOK");
                    submitButton.addClass("EnvoiOK");
                }
                else {
                    if (submitButton.hasClass("EnvoiOK"))
                        submitButton.removeClass("EnvoiOK");
                }
            }
        }
    }
}

/*Fonction de controle --> regex*/
function Controle(elementJQuery,regex){
	var result = elementJQuery.val().match(regex);
	if(elementJQuery.val().length)
		AjoutResult(elementJQuery,(result !== null),false);
	else
		ToggleClassControle(elementJQuery);
}

/*Fonction de controle --> Non regex*/
function ControleAeroport(elementJQuery){
	var aeroports = ['anjouan','mohéli','moroni','mayotte'];
    if (elementJQuery.val().length) {
        var value = elementJQuery.val().toLowerCase();
        AjoutResult(elementJQuery, (aeroports.indexOf(value) !== -1), true);
    }
	else
		ToggleClassControle(elementJQuery);
}

/*Fontion d'ajout du résultat de contrôle*/
function AjoutResult(elementJQuery,result,failType){
	if(typeof(result) == "boolean"){
		if(result){
			elementJQuery.parent().addClass('success');
			if(elementJQuery.hasClass('fail'))
				elementJQuery.removeClass('fail');
		}
		else{
			if(!failType){
				elementJQuery.addClass('fail');
			}
			else{
				elementJQuery.parent().addClass('fail2');	
			}

			if(elementJQuery.hasClass('success'))
				elementJQuery.removeClass('success');
		}
	}
	else{
		console.log("Erreur script");
	}
}

/*Fonction ToggleClassControle*/
function ToggleClassControle(elementJQuery){
	if(elementJQuery.hasClass('fail') || elementJQuery.parent().hasClass('success'))
		elementJQuery.removeClass('fail');
	else
		elementJQuery.parent().removeClass('success');
}

/*Fonction de nettoyage*/
function Nettoyage(elementJQuery){
	if(elementJQuery.hasClass('fail'))
		elementJQuery.removeClass('fail');

	if(elementJQuery.parent().hasClass('fail2'))
		elementJQuery.parent().removeClass('fail2');

	if(elementJQuery.parent().hasClass('success'))
		elementJQuery.parent().removeClass('success');
}








