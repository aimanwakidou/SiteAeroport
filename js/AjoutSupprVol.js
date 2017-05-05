/*Ajout ou suppression de numero de vol*/
$("#first_vol .buttonAjoutSuppr .AjoutWrapper").click(function () {
    Ajout();
});

$("#first_vol .buttonAjoutSuppr .SupprWrapper").click(function () {
    Suppression();
});

/*Contrôle fenetre modal*/
$(".AlertArrivee").each(function () {
    var EnvoiOk = $(".EnvoiOkArrive");
    $(this).change(function () {
        CheckButtonCheckBox(EnvoiOk, $(this));
        ControleCheckBox(EnvoiOk, true);
    });
});

$(".AlertDepart").each(function () {
    var EnvoiOk = $(".EnvoiOkDepart");
    $(this).change(function () {
        CheckButtonCheckBox(EnvoiOk, $(this));
        ControleCheckBox(EnvoiOk, false);
    });
});

/*Bind*/
$(".bindAlert").each(function () {
    $(this).click(function () {
        var Vols = ($(this).hasClass("EnvoiOkDepart")) ? $(".avionDepart") : $(".avionArrive");
        Vols.each(function () {
            if ($(this).find("td input").is(":checked"))
                BindModalAlert($(this));
        });
    });
});

/*Fonction : Ajout d'un bouton*/
function Ajout() {
    var buttonHtmlString = "<div class=\"search-box-inner form-group\">" +
        "<input class=\"flash_alert-num_vol-input form-control fisrt_vol\" id=\"num_vol\" name=\"num_vol\" placeholder=\"Entrez un num&#233ro du vol\" type=\"text\"/>" +
        "<div class=\"buttonAjoutSuppr\" style=\"visibility:hidden;\">" +
        "<span class=\"AjoutWrapper\"><i class=\"fa fa-plus-circle Ajout\" aria-hidden=\"true\"></i></span>" +
        "<span class=\"SupprWrapper\"><i class=\"fa fa-minus-circle Suppr\" aria-hidden=\"true\"></i></span>" +
        "</div>";

    var buttonHtml = $.parseHTML(buttonHtmlString);
    $("#BoxFlashAlert").append(buttonHtml);
}

/*Fonction : Suppression d'un bouton*/
function Suppression() {
    var lastButton = $("#BoxFlashAlert .search-box-inner").last();
    if (!(lastButton.attr('id') == "first_vol"))
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
            if (input.val().length == 0 && !flagFree) {
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
function ControleCheckBox(envoiButtonJQuery, ArriveDepart) {
    if (typeof ArriveDepart === "boolean") {
        var selector = (ArriveDepart) ? "Arrivee" : "Depart";
        var checkedInput = $(".Alert" + selector);
        var flag = true;

        checkedInput.each(function () {
            if ($(this).is(":checked"))
                flag = false;
        });

        if (envoiButtonJQuery.hasClass("displayButton") && flag) {
            envoiButtonJQuery.removeClass("displayButton");
            envoiButtonJQuery.addClass("noDisplayButton");
        }
    }
}

