/*No Conflict Mode*/
/*var datepicker = $.fn.datepicker.noConflict();
$.fn.bootstrapDP = datepicker;*/

$(".DatePickerInput input,.JourInput input").datepicker({
    format: "dd/mm/yyyy",
    startDate: "new Date()",
    language: "fr"
});