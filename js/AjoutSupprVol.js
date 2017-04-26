/*Ajout ou suppression de numero de vol*/
$("#first_vol .buttonAjoutSuppr .AjoutWrapper").click(function () {
    Ajout();
});

$("#first_vol .buttonAjoutSuppr .SupprWrapper").click(function () {
    Suppression();
});


/*Fonction : Ajout d'un bouton*/
function Ajout() {
    var buttonHtmlString = "<div class=\"search-box-inner form-group\">" +
        "<input class=\"flash_alert-num_vol-input form-control fisrt_vol\" id=\"num_vol\" placeholder=\"Entrez un num&#233ro du vol\" type=\"text\"/>" +
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