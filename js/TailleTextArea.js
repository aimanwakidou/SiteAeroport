/*Fonction ResizeTextArea*/
function ResizeTextArea() {
    var textAera = $("#MessageContactUs textarea");
    var labelPersoTextArea = $("#MessageContactUs .labelPerso");
    var coordonneesFooter = $("#CoordonneesContactUs");

    /*Resize du textArea*/
    textAera.height(coordonneesFooter.height() - 2*labelPersoTextArea.height() - 11);
}


/*Dès qu'on clique*/
$('#ContactUs').on('shown.bs.modal', function () {
    if ($(window).width() > 550)
        ResizeTextArea();
});

/*Dès que la taille de la fenêtre change*/
$(window).resize(function () {
    if ($(window).width() > 550)
        ResizeTextArea();
});

