/*Param�tre DatePicker*/
$(".DatePickerInput input,.JourInput input").datepicker({
    format: "dd/mm/yyyy",
    startDate: "new Date()",
    language: "fr",
    disableTouchKeyboard: true,
    todayHighlight:true
});

/*Param�trage TimePicker*/
$(".TimePickerInput input").timepicker({
    minuteStep: 1,
    template: false,
    showMeridian: false,
    icons: {
        up: 'glyphicon glyphicon-chevron-up',
        down: 'glyphicon glyphicon-chevron-down'
    }
});

/*Param�trage selectpicker*/
$(".selectpicker").selectpicker({
    noneSelectedText: 'Aucun �l�ment s�lectionn�'
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
}); 


