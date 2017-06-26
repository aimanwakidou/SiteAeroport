/*Création Cookie*/
$(document).ready(function () {
    Cookies.set('lastSelected', '');
});

/*Enum Bind*/
var bindTypeEnum = {
    Default:0,
    AlertFlash: 1,
    FindResult:2
}

/*Ajout ou suppression de numero de vol*/
$("#first_vol .buttonAjoutSuppr .AjoutWrapper").click(function () {
    AjoutVol();
});

$("#first_vol .buttonAjoutSuppr .SupprWrapper").click(function () {
    SuppressionVol();
});

/*Ajout ou suppression d'un bagages*/
$("#BagagesFirst .buttonAjoutSuppr .AjoutWrapper").click(function(){
   AjoutBagages(); 
});

$("#BagagesFirst .buttonAjoutSuppr .SupprWrapper").click(function(){
   SuppressionBagages(); 
});

/*Bind -> Alerte Flash <-> Num vol input*/
$(".bindAlert").each(function () {
    $(this).click(function () {
        var vols;
        if($(this).hasClass("EnvoiOkRechercheVol")){
            vols = $("#RechercheVol tr");  
        }
        else{
            vols = $(this).hasClass("EnvoiOkDepart") ? $(".avionDepart") : $(".avionArrive");
        }
        
        vols.each(function () {
            if ($(this).find("td div input").is(":checked"))
                BindAlert($(this),bindTypeEnum.AlertFlash);
        });
    });
});

/*Bind -> Resultat recherche vol <-> Num Vol input*/
$('select[name="FindResult"]').change(function () {
    var selectedArray = $(this).find('option:selected');
    if (selectedArray.length === 0) {
        $(this).siblings('button').attr('title', 'Aucun élément n\'a été séléctionné');
        return;
    }

    selectedArray.each(function () {
        if ($(this).val() != '') {
            BindAlert($(this), bindTypeEnum.FindResult);
        }
    });

    /*Check en cas de déselection*/
    var lastSelected = Cookies.get('lastSelected');
    if (lastSelected !== '') {
        if (IsInVolInputs(lastSelected) && !IsInSelectResult(lastSelected)) {
            console.log('supp');
            SuppressionVolParNumVol(lastSelected);
        }
    }

    /*Mis à jour Cookie*/
    console.log('Valeur LastSelected : '+Cookies.get('lastSelected'));
    Cookies.set('lastSelected', $(this).find('option:selected:last').val());
});

/*Fonction : Ajout d'un bagage*/
function AjoutBagages(){
    var bagagesHtmlString = '<div class="BagagesInput form-group">' +
        '<div class="BagagesWrapper"><input name="bagages" class="form-control" placeholder="Entrez le numéro de votre bagage" type="text"/></div>'+
        '<div class="buttonAjoutSuppr" style="visibility:hidden;">'+
        '<span class="AjoutWrapper"><i class="fa fa-plus-circle Ajout" aria-hidden="true"></i></span>'+
        '<span class="SupprWrapper"><i class="fa fa-minus-circle Suppr" aria-hidden="true"></i></span>'+
        '</div>';
    
    var bagagesHtml = $.parseHTML(bagagesHtmlString);
    $("#BagagesBoxInner").append(bagagesHtml);
}

/*Fonction : Suppression d'un bagages*/
function SuppressionBagages(){
    var lastBagages = $("#BagagesBoxInner .BagagesInput").last();
    if(lastBagages.attr('id') != "BagagesFirst")
        lastBagages.remove();
    else {
        var inputLastBagages = lastBagages.find('input');
        if (inputLastBagages.val() != '') {
            inputLastBagages.val('');
            inputLastBagages.attr('value', '');
        }
    }
}

/*Fonction : Ajout d'un vol*/
function AjoutVol() {
    var buttonHtmlString = "<div class=\"search-box-inner form-group\">" +
        "<input class=\"flash_alert-num_vol-input form-control\" id=\"num_vol\" name=\"num_vol\" placeholder=\"Entrez un num&#233ro du vol\" type=\"text\"/>" +
        "<div class=\"buttonAjoutSuppr\" style=\"visibility:hidden;\">" +
        "<span class=\"AjoutWrapper\"><i class=\"fa fa-plus-circle Ajout\" aria-hidden=\"true\"></i></span>" +
        "<span class=\"SupprWrapper\"><i class=\"fa fa-minus-circle Suppr\" aria-hidden=\"true\"></i></span>" +
        "</div>";

    var buttonHtml = $.parseHTML(buttonHtmlString);
    $("#BoxFlashAlert").append(buttonHtml);
}

/*Fonction : Suppression d'un vol*/
function SuppressionVol() {
    var lastButton = $("#BoxFlashAlert .search-box-inner").last();
    if (lastButton.attr('id') != "first_vol")
        lastButton.remove();
    else {
        var inputLastButton = lastButton.find('input');
        if (inputLastButton.val() != '') {
            inputLastButton.val('');
            inputLastButton.attr('value', '');
        }
    }
}

/*Fonction : isInVolsInputs */
function IsInVolInputs(num_vol) {
    return $('#BoxFlashAlert .search-box-inner input[value="' + num_vol + '"]').length !== 0;
}

/*Fonction : checkSelectResult*/
function IsInSelectResult(num_vol) {
    return $('select[name="FindResult"] option[value="' + num_vol + '"]:selected').length !== 0 ;
}

/*Fonction : Suppression d'un vol par num_vol*/
function SuppressionVolParNumVol(num_vol) {
    $('#BoxFlashAlert .search-box-inner input[value="'+num_vol+'"]').parent().remove();
}

/*Fonction de liaison Modal --> Alerte Flash*/
function BindAlert(caseTable,bindType) {
    var num_vol;
    if (bindType == bindTypeEnum.Default)
        return;
    else
        num_vol = (bindType == bindTypeEnum.AlertFlash) ? caseTable.find(".numVol").html() : caseTable.val();

    var inputsNumVol = $("#BoxFlashAlert .search-box-inner");
    var flagFree = false;
    var flagFind = false;

    inputsNumVol.each(function () {
        var input = $(this).find("input");
        if (input.val() == num_vol) {
            flagFind = true;
            return;
        }
        else{
            if (input.val().length === 0 && !flagFree) {
                input.val(num_vol);
                input.attr('value', num_vol);
                flagFree = true;
                return;
            }
        }
    });

    if (flagFree || flagFind)
        return;

    AjoutVol();
    var inputsNumVolLast = $("#BoxFlashAlert .search-box-inner").last().find("input");
    inputsNumVolLast.val(num_vol);
    inputsNumVolLast.attr('value', num_vol);
 
}

/*Fonction de controle --> checkBok = ok*/
function CheckButtonCheckBox(envoiButtonJQuery, checkButtonJQuery) {
    if (checkButtonJQuery.is(':checked') && envoiButtonJQuery.hasClass("noDisplayButton")) {
        envoiButtonJQuery.removeClass("noDisplayButton");
        envoiButtonJQuery.addClass("displayButton");
    }
}

/*Fonction de controle --> Si aucun bouton n'est checké*/
function ControleCheckBox(envoiButtonJQuery, selector) {
    var allowSelector = ['Arrivee','Depart','RechercheVol'];
    if (allowSelector.indexOf(selector) !== -1){
        var checkedInput = $(".Alert" + selector);
        var flag = true;

        checkedInput.each(function () {
            if ($(this).is(":checked")){
                flag = false;
                return;
            }
        });

        if (envoiButtonJQuery.hasClass("displayButton") && flag) {
            envoiButtonJQuery.removeClass("displayButton");
            envoiButtonJQuery.addClass("noDisplayButton");
        }
    }
}

