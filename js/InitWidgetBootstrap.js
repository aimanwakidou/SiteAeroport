/*Paramètre DatePicker*/
$(".DatePickerInput input,.JourInput input").datepicker({
    format: "dd/mm/yyyy",
    startDate: "new Date()",
    language: "fr",
    disableTouchKeyboard: true,
    todayHighlight:true,
    autoclose:true
});


/*Paramètrage selectpicker*/
$(".selectpicker").selectpicker({
    noneSelectedText: 'Aucun élément sélectionné',
    dropdownAlignRight: 'auto'
});


/*Init On ready*/
$(document).ready(function () {
    $("#bootstrap-touch-slider").swiperight(function () {
        $(this).carousel('next');
    });
    $("#bootstrap-touch-slider").swipeleft(function () {
        $(this).carousel('prev');
    });

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('.selectpicker').selectpicker('mobile');
    }

    /*Paramétrage TimePicker*/
    $(".TimePickerInput").datetimepicker({
        pickDate: false,
        pickSeconds: false
    });
}); 


