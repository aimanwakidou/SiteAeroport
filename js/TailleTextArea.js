/*Fonction ResizeTextArea*/
function ResizeTextArea() {
    var textAera = $("#MessageContactUs textarea");
    var labelPersoTextArea = $("#MessageContactUs .labelPerso");
    var coordonneesFooter = $("#CoordonneesContactUs");

    /*Resize du textArea*/
    textAera.height(coordonneesFooter.height() - 2*labelPersoTextArea.height() - 11);
}


/*D�s qu'on clique*/
$('#ContactUs').on('shown.bs.modal', function () {
    if ($(window).width() > 550)
        ResizeTextArea();
});

/*D�s que la taille de la fen�tre change*/
$(window).resize(function () {
    if ($(window).width() > 550)
        ResizeTextArea();
});

