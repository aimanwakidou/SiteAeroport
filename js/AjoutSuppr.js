/*Création Cookie*/
$(document).ready(function () {
    Cookies.set('lastSelectedArray', []);
});

/*Enum Bind*/
var bindTypeEnum = {
    Default:0,
    AlertFlash: 1,
    FindResult:2
};

/*Ajout ou suppression de numero de vol*/
$("#first_vol .buttonAjoutSuppr .AjoutWrapper").click(function () {
    AjoutVol();
});

$("#first_vol .buttonAjoutSuppr .SupprWrapper").click(function () {
    SuppressionVolParClick();
});

/*Ajout ou suppression d'un bagages*/
$("#BagagesFirst .buttonAjoutSuppr .AjoutWrapper").click(function(){
   AjoutBagages(); 
});

$("#BagagesFirst .buttonAjoutSuppr .SupprWrapper").click(function(){
   SuppressionBagagesParClick(); 
});

/*Bind -> Alerte Flash <-> Num vol input*/
$(".bindAlert").each(function () {
    $(this).click(function () {
        var vols;
        if($(this).hasClass("EnvoiOkRechercheVol")){
            vols = $("#RechercheVol tr");  
        }
        else if ($(this).hasClass("EnvoiOkRechercheByAirline")) {
            vols = $("#FindResultBody tr"); 
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
function SuppressionBagagesParClick(){
    SuppressionVol($("#BagagesBoxInner .BagagesInput").last());
}

/*Fonction : Ajout d'un vol*/
function AjoutVol() {
    var buttonHtmlString = "<div class=\"search-box-inner form-group\">" +
        "<input class=\"flash_alert-num_vol-input form-control\" name=\"num_vol\" placeholder=\"Entrez un num&#233ro du vol\" type=\"text\"/>" +
        "<div class=\"buttonAjoutSuppr\" style=\"visibility:hidden;\">" +
        "<span class=\"AjoutWrapper\"><i class=\"fa fa-plus-circle Ajout\" aria-hidden=\"true\"></i></span>" +
        "<span class=\"SupprWrapper\"><i class=\"fa fa-minus-circle Suppr\" aria-hidden=\"true\"></i></span>" +
        "</div>";

    var buttonHtml = $.parseHTML(buttonHtmlString);
    $("#BoxFlashAlert").append(buttonHtml);
}

/*Fonction : Suppression d'un vol*/
function SuppressionVolParClick() {
    SuppressionVol($("#BoxFlashAlert .search-box-inner").last());
}

/*Fonction : GetArrayFromString*/
function GetArrayFromString(arrayString){
    return JSON.parse(arrayString);
}

/*Fonction : GetOptionSelected*/
function GetOptionUnselected(selectedArray,lastSelectedArray){
    var toReturn = null;
    if(lastSelectedArray.length !== 0){
        lastSelectedArray.forEach(function(item){
            if(!IsInArray(item,selectedArray)){
                toReturn = item;
                return;
            }
        });
    }
    return toReturn;
}

/*Fonction : IsInArray*/
function IsInArray(element,array){
    return array.indexOf(element) !== -1;
}

/*Fonction : Suppression d'un vol par num_vol*/
function SuppressionVolParNumVol(num_vol) {
    SuppressionVol($('#BoxFlashAlert .search-box-inner input[value="'+num_vol+'"]').parent());  
}

/*Fonction : SuppressionVol*/
function SuppressionVol(vol) {
    if (vol.attr('id') == 'first_vol' || vol.attr('id') == 'BagagesFirst') {  
        var volInput = vol.find('input');
        if(volInput.val() !== ''){
            volInput.val('');
            volInput.attr('value','');
        }
    }
    else
        vol.remove();
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
    var allowSelector = ['Arrivee','Depart','RechercheVol','RechercheByAirline'];
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

