/*Activation css pour le chargement de requete CSS*/
$(document).ajaxStart(function(){
    var loader = "<tr id=\"Spinner\">" +
        "<div style=\"display:flex;align-items:center;\">" +
        "<i class=\"fa fa-spinner fa-spin fa-4x\" aria-hidden=\"true\"></i></div>" +
        "</tr>";
    
	$("#ArriveeBody,#DepartBody,#RechercheVol").append($.parseHTML(loader));
});

$(document).ajaxComplete(function(){
	$("#ArriveeBody #Spinner,#DepartBody #Spinner,#RechercheVol #Spinner").remove();
});

/*Controle formulaire*/
var emailRegex = /^([a-zA-Z0-9àäéèëêïîöôüûÿŷ\.\-_]+)@([a-zA-Z0-9àäéèëêïîöôüûÿŷ\.\-_]+)\.([a-zA-Z0-9àäéèëêïîöôüûÿŷ\.\-_]{2,})$/;
var checkNomPrenom = /^[a-zA-Zéèïëêâî ]+$/;

$("input[name=\"email\"],input[name=\"tel\"]").on("change blur", function () {
    var regex = $(this).attr("name") === "tel" ? /^[0-9]{10}$/ : emailRegex;
    Controle($(this), regex);

    if($(this).attr("id") === "email" || $(this).attr("id") === "tel")
        ControleSubmit($("#first_vol input"));

    //if(!$(this).val.length && $(this).hasClass("required"))
});

$("input[name=\"email\"],input[name=\"tel\"]").click(function () {
    if ($(this).attr("id") === "email" || $(this).attr("id") === "tel")
        ControleSubmit($("#first_vol input"));
    ClearWarning($(this));
});

/*Controle nom et prénom*/
$("input[name=\"nom\"],input[name=\"prénom\"]").on("change blur", function () {
    Controle($(this), checkNomPrenom);
    if (!$(this).parent().hasClass("success") && $("#submit").hasClass("EnvoiOK")){
        $("#submit").removeClass("EnvoiOK");
    }
});

$("input[name=\"nom\"],input[name=\"prénom\"]").click(function(){
    ClearWarning($(this));
});

$("#nom,#prénom,#email,#tel").blur(function(){
    var vol = $(this).attr('id') === "nom" || $(this).attr('id') === "prénom" ? "#num_vol_suivi" : "#first_vol input";
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

    var divToRemoveHighlight = $(this).hasClass("flash-alert") ? $(".suiviBagages") : $(".flash-alert");

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
		if(!$(this).val().length)
			Nettoyage($(this));
	});
});

/*Nettoyage en cas de clique --> bootstrap select*/
$(".bootstrap-select button").click(function () {
    if ($(this).hasClass("success"))
        $(this).removeClass("success");
});

/*Contrôle pour la météo*/
$(".choixIles").change(function(){
	var selected = $(".choixIles option:selected");
	$(".météoWrapper div").each(function(){
		if($(this).attr('id') === selected.val() && selected.val() !== "Iles"){
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
$('select[name="resultatVol"],select[name="searchByAirline"]').change(function () {
    var selectName = $(this).attr('name');
    var selected = $(this).find('option:selected');
    var selectedValue = selected.val();
    var resultText = selectName == "resultatVol" ? $("#ResultatSearchVol > thead > tr > .ResultArrivéeOuDépart") : $("#ResultatVolByAirline > thead > tr > .ResultArrivéeOuDépart");
    var heureVol = selectName == "resultatVol" ? $("#heureVol") : $("#heureVolByAirline");
    var trs = selectName == "resultatVol" ? $("#RechercheVol tr") : $("#FindResultBody tr");

    resultText.text(selectedValue.length !== 0 ? selectedValue : selected.text());
	if(selectedValue.length !== 0){
		var text = selectedValue === "Arrivée" ? "Heure d'arrivée" : "Heure de départ";
		heureVol.text(text);
	}
	else
		heureVol.text("Heure");

	/*Affichage Arrivée Ou Départ*/
    if (selectedValue.length === 0) {
		trs.each(function(){
			$(this).attr('active','OK');
		});
	}
	else{
		var oppositeValue = selectedValue === "Arrivée" ? "Départ" : "Arrivée";
		trs.each(function(){
			if($(this).attr('active') === 'KO' && $(this).hasClass(selectedValue)){
                $(this).attr('active', 'OK');
                $(this).addClass("activeTr");
			}
			else{
				if($(this).attr('active') === 'OK' && $(this).hasClass(oppositeValue)){
                    $(this).attr('active', 'KO');
                    if($(this).hasClass("activeTr"))
                        $(this).removeClass("activeTr");
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
        ToggleButton($(this));
        ControleButtonWithoutSubmit($(this), $(this).parent().attr('id') === "flash" ? $("#Compagnies,#FindResult") : $(".RechercheVolSuivi"),$(this).hasClass("OK"));
    });
});

/*Toggle provenance/destination en cas de clique*/
$("#switchArrivéeDépart span").click(function () {
    ToggleProvDestSearch();
});

/*Fonction ToggleProvDestSearch*/
function ToggleProvDestSearch() {
    var provSelect = $("select[name=\"ProvSearch\"]");
    var destSelect = $("select[name=\"DestSearch\"]");
    var provenance = $("select[name=\"ProvSearch\"] option:selected");
    var destination = $("select[name=\"DestSearch\"] option:selected");

    if (provenance.val().length !== 0 && destination.val().length !== 0) {
        /*Echange*/
        provSelect.selectpicker('val', destination.val());
        destSelect.selectpicker('val', provenance.val());
    }
}

/*Fonction de contrôle Trouver le numéro de vol -> suivi Bagages*/
function CompareProvDestSuiviBagages(provenance, destination) {
    MessageErreurProvDestSuiviBagages(provenance !== destination);
}

/*Fonction d'affiche message erreur : Recherche Vol*/
function MessageErreurRecherche(toCheckLength,message,messageText){
	if(toCheckLength.length === 0){
		var messageErreur = message.find('span[itemprop="2"]');
		messageErreur.find('mark').text(messageText);
        AfficheMessageGenerique2(message.find('span[itemprop="1"]'), 'noDisplayGenerique2');
        AfficheMessageGenerique2(message.find('span[itemprop="3"]'), 'noDisplayGenerique2');
		AfficheMessageGenerique(message,"displayGenerique");
		AfficheMessageGenerique2(messageErreur,"displayGenerique2");
	}
	return toCheckLength.length !== 0;
}

/*Fonction de controle Recherche Vol*/
function CompareProvDest(provenance,destination){
	var message = $("#MessageErreurProvDest");
	
	if(provenance.length === 0 && destination.length === 0)
		return false;
	
	if(provenance === destination){
		if($("#search-flight").hasClass("relativeBody"))
			$("#search-flight").addClass("relativeBody");
			
		AfficheMessageGenerique(message,"displayGenerique");
        AfficheMessageGenerique2(message.find('span[itemprop="1"]'), "displayGenerique2");
        AfficheMessageGenerique2(message.find('span[itemprop="2"]'), "noDisplayGenerique2");
        AfficheMessageGenerique2(message.find('span[itemprop="3"]'), 'noDisplayGenerique2');
	}
	else{
		AfficheMessageGenerique(message,"noDisplayGenerique");
		AfficheMessageGenerique2(message.find('span[itemprop="1"]'),"noDisplayGenerique2");
		
		if($("#search-flight").hasClass("relativeBody"))
			$("#search-flight").removeClass("relativeBody");
	}
	
	return provenance !== destination;
}

/*Fonction de controle Recherche Vol*/
function ControleValeurProvDest(elementJQuery){
	var id = elementJQuery.attr('id');
	var toCompare = id === "provenance" ? "#destination" : "#provenance";
	var result;
	if(elementJQuery.val().length){
		result = elementJQuery.val() !== $(toCompare).val();
		AjoutResult(elementJQuery,result,false);
		MessageErreurProvDest(id,result);
	}
	else
		MessageErreurProvDest(id,true);
}

/*Contrôle submit*/
function ControleSubmit(vol) {
	var submitButton = $("#submit");
    var infoRequired = vol.attr('id') === "num_vol_flash" ? $("#email,#tel") : $("#nom,#prénom");
    var testValue = true;
    var testSuccess = true;

    infoRequired.each(function () {
        if (!$(this).val().length) {
            testValue = false;
            return;
        }
    });

	if (testValue && vol.val().length) {
        infoRequired.each(function () {
            if (!$(this).parent().hasClass("success")) {
                testSuccess = false;
                return;
            }
        });

        var classToAdd = testSuccess ? "EnvoiOK" : "EnvoiNonOK";
        var classToRemove = classToAdd === "EnvoiOK" ? "EnvoiNonOK" : "EnvoiOK";

        if (classToAdd === "EnvoiOK")
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
        AfficheMessageGenerique(elemToShow, button.text().toLowerCase() === "non" ? "displayGenerique" : "noDisplayGenerique");
    }
}

/*Fonction de contrôle des boutons Oui/Non avec submit*/
function ControleButton(button,elemToShow,test,onShow,submitButton){
    var testOnShow = onShow ? "oui" : "non";

    if(test){
        if (button.text().toLowerCase() === testOnShow) {
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

        else{
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
		AjoutResult(elementJQuery,result !== null,false);
	else
		ToggleClassControle(elementJQuery);
}

/*Fonction de controle --> Non regex*/
function ControleAeroport(elementjQuery, source) {
    var toCheckElement = elementjQuery.find("option:selected");
    if (toCheckElement.val().length) {
        AjoutResultBootstrapSelect(elementjQuery.parent(), source.indexOf(toCheckElement.val()) !== -1, true);
    }
    else
        ToggleClassBootstrapControle(elementjQuery.siblings('button'), true);
}

/*Fonction d'ajout du résultat de contrôle --> bootstrap-select*/
function AjoutResultBootstrapSelect(elemParent, result, failType) {
    if (result) {
        AjoutSucces(elemParent.find('button'), elemParent.find('button'), failType);
    } 
    else {
        AjoutFail(elemParent.find('button'),elemParent.find('button'), failType);
    }
}

/*Fonction ToggleClassBootstrapSelectControle*/
function ToggleClassBootstrapControle(elementjQuery, failType) {
    var classFail = failType ? 'fail2' : 'fail';
    if (elementjQuery.hasClass(classFail))
        elementjQuery.removeClass(classFail);

    if (elementjQuery.hasClass('success'))
        elementjQuery.removeClass('success');
}

/*Fontion d'ajout du résultat de contrôle*/
function AjoutResult(elementJQuery,result,failType){
    if (result) {
        AjoutSucces(elementJQuery.parent(), elementJQuery, failType);      
	}
    else {
        AjoutFail(elementJQuery.parent(),elementJQuery, failType);
	}
}

/*Fonction Ajout Succes*/
function AjoutSucces(elemParent, elemFils, failType) {
    elemParent.addClass('success');
    if (!failType) {
        if (elemFils.hasClass('fail'))
            elemFils.removeClass('fail');
    }
    else {
        if (elemParent.hasClass('fail2'))
            elemParent.removeClass('fail2');
    }
}

/*Fonction Ajout Fail*/
function AjoutFail(elemParent,elemFils, failType) {
    var elemToAddFail = failType ? elemParent : elemFils;
    elemToAddFail.addClass(failType ? 'fail2' : 'fail');
    if (elemParent.hasClass('success'))
        elemParent.removeClass('success');
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
    var infoWarning = vol.attr('id') === 'num_vol_flash' ? $("#email,#tel") : $("#nom,#prénom");
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

/*Fonction pour afficher/retirer le message d'erreur pour le suivi bagages*/
function MessageErreurProvDestSuiviBagages(result){
	var message = $("#msgErrSuivi");
	AfficheMessageGenerique(message,result ? "noDisplayGenerique" : "displayGenerique");
}

/*Fonction pour afficher/retirer le message d'erreur*/
function AfficheMessageGenerique(messageJQuery,classToAdd){
	var classToRemove = classToAdd === "displayGenerique" ? "noDisplayGenerique" : "displayGenerique";
	if(messageJQuery.hasClass(classToRemove) && !messageJQuery.hasClass(classToAdd)){
		messageJQuery.removeClass(classToRemove);
		messageJQuery.addClass(classToAdd);
	}
}

/*Fonction pour afficher/retirer le message d'erreur*/
function AfficheMessageGenerique2(messageJQuery,classToAdd){
	var classToRemove = classToAdd === "displayGenerique2" ? "noDisplayGenerique2" : "displayGenerique2";
	if(messageJQuery.hasClass(classToRemove) && !messageJQuery.hasClass(classToAdd)){
		messageJQuery.removeClass(classToRemove);
		messageJQuery.addClass(classToAdd);
	}
}
