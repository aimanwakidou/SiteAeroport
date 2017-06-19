/*Activation css pour le chargement de requete CSS*/
$(document).ajaxStart(function(){
	var loader = '<tr id="Spinner">'+
				 '<div style="display:flex;align-items:center;">'+
				 '<i class="fa fa-spinner fa-spin fa-4x" aria-hidden="true"></i></div>'+
				 '</tr>';
				 
	$("#ArriveeBody,#DepartBody,#RechercheVol").append($.parseHTML(loader));
});

$(document).ajaxComplete(function(){
	$("#ArriveeBody #Spinner,#DepartBody #Spinner,#RechercheVol #Spinner").remove();
});

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

/*Contrôle pour la recherche vol*/
$('select[name="resultatVol"]').change(function(){
	var selected = $('select[name="resultatVol"] option:selected');
	var selectedValue = selected.val();
	$("#ResultArrivéeOuDépart").text(selectedValue.length !== 0 ? selectedValue : selected.text());
	
	/*Affichage Arrivée Ou Départ*/
	if(selectedValue.length === 0){
		$("#RechercheVol tr").each(function(){
			$(this).attr('active','OK');
		});
	}
	else{
		var oppositeValue = selectedValue == "Arrivée" ? "Départ" : "Arrivée";
		$("#RechercheVol tr").each(function(){
			if($(this).attr('active') == 'KO' && $(this).hasClass(selectedValue)){
				$(this).attr('active','OK');
			}
			else{
				if($(this).attr('active') == 'OK' && $(this).hasClass(oppositeValue)){
					$(this).attr('active','KO');
				}
			}
		});
	}
});

/*Controle bouton suivi choix notification*/
$(".RadioButton button").each(function () {
    $(this).click(function () {
        ToggleButton($(this));
        ControleButton($(this),$(".SuiviBagages-EmailTel"),$(this).hasClass("OK"),true,$("#submit1"));
    });
});

/*Controle bouton suivi question*/
$(".RadioButtonSuivi button").each(function () {
    $(this).click(function () {
        var parentID = $(this).parent().attr('id');
        ToggleButton($(this));
        ControleButtonWithoutSubmit($(this),parentID == "flash" ? $("#Compagnies,#FindResult") : $(".RechercheVolSuivi"),$(this).hasClass("OK"));
    });
});

/*Controle Recherche Vol*/
$("#provenance,#destination").on("change blur",function(){
	ControleValeurProvDest($(this));
});

/*Controle Recherche Vol*/
$("#Provenance,#Destination").on("change blur",function(){
	var toCompare = ($(this).attr('id') == "Provenance") ? $("#Destination") : $("#Provenance");
	CompareProvDest($(this).val(),toCompare.val());
});

/*Fonction d'affiche message erreur : Recherche Vol*/
function MessageErreurRecherche(toCheckLength,message,messageText){
	if(toCheckLength.length === 0){
		var messageErreur = message.find('span[messageErreur="2"]');
		messageErreur.find('mark').text(messageText);
        AfficheMessageGenerique2(message.find('span[messageErreur="1"]'), 'noDisplayGenerique2');
        AfficheMessageGenerique2(message.find('span[messageErreur="3"]'), 'noDisplayGenerique2');
		AfficheMessageGenerique(message,"displayGenerique");
		AfficheMessageGenerique2(messageErreur,"displayGenerique2");
	}
	return toCheckLength.length !== 0;
}

/*Fonction de controle Recherche Vol*/
function CompareProvDest(provenance,destination){
	var message = $("#MessageErreurProvDest");
	
	if(provenance == destination){
		if($("#search-flight").hasClass("relativeBody"))
			$("#search-flight").addClass("relativeBody");
			
		AfficheMessageGenerique(message,"displayGenerique");
        AfficheMessageGenerique2(message.find('span[messageErreur="1"]'), "displayGenerique2");
        AfficheMessageGenerique2(message.find('span[messageErreur="2"]'), "noDisplayGenerique2");
        AfficheMessageGenerique2(message.find('span[messageErreur="3"]'), 'noDisplayGenerique2');
	}
	else{
		AfficheMessageGenerique(message,"noDisplayGenerique");
		AfficheMessageGenerique2(message.find('span[messageErreur="1"]'),"noDisplayGenerique2");
		
		if($("#search-flight").hasClass("relativeBody"))
			$("#search-flight").removeClass("relativeBody");
	}
	return (provenance != destination);
}

/*Fonction de controle Recherche Vol*/
function ControleValeurProvDest(elementJQuery){
	var id = elementJQuery.attr('id');
	var toCompare = (id == "provenance") ? "#destination" : "#provenance";
	var result;
	if(elementJQuery.val().length){
		result = (elementJQuery.val() != $(toCompare).val());
		AjoutResult(elementJQuery,result,false);
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
            if (!failType) {
                if (elementJQuery.hasClass('fail'))
                    elementJQuery.removeClass('fail');
            }
            else {
                if (elementJQuery.parent().hasClass('fail2'))
                    elementJQuery.parent().removeClass('fail2');
            }
		}
        else {
            var elemToAddFail = (failType) ? elementJQuery.parent() : elementJQuery;
			elemToAddFail.addClass((failType) ? 'fail2' : 'fail');	
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
	var message = $("#msgErrSuivi");
	AfficheMessageGenerique(message,(result) ? "noDisplayGenerique" : "displayGenerique");
}

function AfficheMessageGenerique(messageJQuery,classToAdd){
	var classToRemove = (classToAdd == "displayGenerique") ? "noDisplayGenerique" : "displayGenerique";
	if(messageJQuery.hasClass(classToRemove) && !messageJQuery.hasClass(classToAdd)){
		messageJQuery.removeClass(classToRemove);
		messageJQuery.addClass(classToAdd);
	}
}

function AfficheMessageGenerique2(messageJQuery,classToAdd){
	var classToRemove = (classToAdd == "displayGenerique2") ? "noDisplayGenerique2" : "displayGenerique2";
	if(messageJQuery.hasClass(classToRemove) && !messageJQuery.hasClass(classToAdd)){
		messageJQuery.removeClass(classToRemove);
		messageJQuery.addClass(classToAdd);
	}
}
