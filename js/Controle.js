/*Controle formulaire*/
var emailRegex = /^([a-zA-Z0-9àäéèëêïîöôüûÿŷ\.\-_]+)@([a-zA-Z0-9àäéèëêïîöôüûÿŷ\.\-_]+)\.([a-zA-Z0-9àäéèëêïîöôüûÿŷ\.\-_]{2,})$/;
var checkNomPrenom = /^[a-zA-Zéèïëêâî ]+$/;

$('#email,#tel').on("change blur", function () {
    var regex = ($(this).attr("id") == "tel") ? /^[0-9]{10}$/ : emailRegex;
    Controle($(this), regex);
    ControleSubmit($("#first_vol input"));
});

$("#email,#tel").click(function(){
    ControleSubmit($("#first_vol input"));
    ClearWarning($(this));
});

/*Controle nom et prénom*/
$("#nom,#prénom").on("change blur", function () {
    Controle($(this), checkNomPrenom);
    if (!$(this).parent().hasClass("success") && $("#submit").hasClass("EnvoiOK")){
        $("#submit").removeClass("EnvoiOK");
    }
});

$("#nom,#prénom").click(function(){
    ClearWarning($(this));
});

$("#nom,#prénom,#email,#tel").blur(function(){
    var vol = ($(this).attr('id') == "nom" || $(this).attr('id') == "prénom") ? "#num_vol_suivi" : "#first_vol input";
    Warning($(vol)); 
});

/*Contrôle vol*/
$("#first_vol input,#num_vol_suivi").click(function () {
    if ($(this).hasClass("fail"))
        $(this).removeClass("fail");
    ControleSubmit($(this));
    Warning($(this));
});

$("#first_vol input,#num_vol_suivi").on("change blur",function(){
    ControleSubmit($(this));
    Warning($(this));
});

/*Ajout highlight sur clique sur la div*/
$(".flash-alert,.suiviBagages").click(function(){
    if($(this).hasClass("nonHighlight")){
        $(this).removeClass("nonHighlight");
        $(this).addClass("highlight");
    }

    var divToRemoveHighlight = ($(this).hasClass("flash-alert")) ? $(".suiviBagages") : $(".flash-alert");

    if(divToRemoveHighlight.hasClass("highlight")){
        divToRemoveHighlight.removeClass("highlight");
    }

    divToRemoveHighlight.addClass("nonHighlight");

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
        ControleButtonWithoutSubmit($(this),$(".RechercheVolSuivi"),$(this).hasClass("OK"));
    });
});

/*Controle Recherche Vol*/
$("#Provenance,#Destination,#provenance,#destination").on("change blur",function(){
	ControleValeurProvDest($(this));
});

/*Fonction de controle Recherche Vol*/
function ControleValeurProvDest(elementJQuery){
	var toCompare;
	var result;
	var id = elementJQuery.attr('id');
	
	if(id == "Provenance" || id == "Destination"){
		toCompare = (id == "Provenance") ? "#Destination" : "#Provenance";
	}
	else{
		toCompare = (id == "provenance") ? "#destination" : "#provenance";
	}
	
	if(elementJQuery.val().length){
		result = (elementJQuery.val() != $(toCompare).val());
		AjoutResult(elementJQuery,result,(id == "Provenance" || id == "Destination"));
		MessageErreurProvDest(id,result);
	}
	else
		MessageErreurProvDest(id,true);
}

/*Contrôle submit*/
function ControleSubmit(vol) {
	var submitButton = $("#submit");
    var infoRequired = (vol.attr('id') == "num_vol_flash") ? [$("#email"),$("#tel")] : [$("#nom"),$("#prénom")];
    var testValue = true;
    var testSuccess = true;

    for(var info of infoRequired){
        if(!info.val().length){
            testValue = false;
            break;
        }
    }

	if (testValue && vol.val().length) {
        for(info of infoRequired){
            if(!info.parent().hasClass('success')){
                testSuccess = false;
                break;
            }       
        }

        var classToAdd = (testSuccess) ? "EnvoiOK" : "EnvoiNonOK";
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
function ControleButtonWithoutSubmit(button,elemToShow,test){
    if(test){
        if (button.attr("id") == "non") {
			AfficheMessageGenerique(elemToShow,"displayGenerique");
        }

        if (button.attr("id") == "oui") {
			AfficheMessageGenerique(elemToShow,"noDisplayGenerique");
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
function ControleAeroport(elementJQuery,source){
    if (elementJQuery.val().length) {
        AjoutResult(elementJQuery, (source.indexOf(elementJQuery.val()) !== -1), true);
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
			elementJQuery.addClass((failType) ? 'fail2' : 'fail');	
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

/*Fonction pour les informations importantes*/
function Warning(vol){
    var infoWarning = (vol.attr('id') == 'num_vol_flash') ? $("#email,#tel") : $("#nom,#prénom");
    var message = infoWarning.parent().siblings(".WarningMessage"); 
    if(vol.val().length){
        if(!(infoWarning.parent().hasClass('success') || infoWarning.hasClass('fail'))){
            infoWarning.parent().addClass('Warning');
            infoWarning.attr('required',true);
			AfficheMessageGenerique(message,"displayGenerique");
        }
    }
    else
        ClearWarning(infoWarning);
}

/*Fonction pour nettoyer les warnings*/
function ClearWarning(infoWarning){
    var message = infoWarning.parent().siblings(".WarningMessage"); 
    if(infoWarning.parent().hasClass('Warning'))
        infoWarning.parent().removeClass('Warning');

    if(infoWarning.attr('required'))
        infoWarning.attr('required',false);

	AfficheMessageGenerique(message,"noDisplayGenerique");
}

/*Fonction pour afficher/retirer le message d'erreur*/
function MessageErreurProvDest(id,result){
	var message = (id == "Provenance" || id == "Destination") ? $("#msgErrDepArr") : $("#msgErrSuivi");
	AfficheMessageGenerique(message,(result) ? "noDisplayGenerique" : "displayGenerique");
}

function AfficheMessageGenerique(messageJQuery,classToAdd){
	var classToRemove = (classToAdd == "displayGenerique") ? "noDisplayGenerique" : "displayGenerique";
	if(messageJQuery.hasClass(classToRemove) && !messageJQuery.hasClass(classToAdd)){
		messageJQuery.removeClass(classToRemove);
		messageJQuery.addClass(classToAdd);
	}
}
