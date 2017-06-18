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

/*Bind*/
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
                BindModalAlert($(this));
        });
    });
});

/*Fonction : Ajout d'un bagage*/
function AjoutBagages(){
    var bagagesHtmlString = '<div class="BagagesInput form-group">' +
        '<div class="BagagesWrapper"><input name="bagages" class="form-control" placeholder="Entrez le numéro de votre bagage" type="text"/></div>'+
        '<div class="buttonAjoutSuppr" style="visibility:hidden">'+
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
}

/*Fonction : Ajout d'un bouton*/
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

/*Fonction : Suppression d'un bouton*/
function SuppressionVol() {
    var lastButton = $("#BoxFlashAlert .search-box-inner").last();
    if (lastButton.attr('id') != "first_vol")
        lastButton.remove();
}

/*Fonction de liaison Modal --> Alerte Flash*/
function BindModalAlert(caseTable) {
    var num_vol = caseTable.find(".numVol").html();
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
                flagFree = true;
                return;
            }
        }
    });

    if (flagFree || flagFind)
        return;

    Ajout();
    var inputsNumVolLast = $("#BoxFlashAlert .search-box-inner").last().find("input");
    inputsNumVolLast.val(num_vol);
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

