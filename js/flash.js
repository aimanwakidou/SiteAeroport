$('#zoneFlashAlert').submit(function (event) {
    event.preventDefault();
    var first_vol = $("#first_vol input");
    if (first_vol.val().length) {
        var url = "https://5.196.225.5/api/Flash/";
        var tabVols = [];

        $('#BoxFlashAlert .search-box-inner input').each(function () {
            tabVols.push($(this).val());
        });
        $.post(url,
            {
                vols: tabVols,
                email: $("#email2").val(),
                nom: $("#nomFlash").val(),
                prenom: $("#prénomFlash").val(),
                tel: $("#tel2").val()
            },

            function (data) {
                var message = (data.message == "OK") ? ".messageSuccess" : ".messageFail";
                $(message).removeClass("noDisplayMessage");
                $(message).addClass("displayMessage");
            });
    }
    else {
        first_vol.addClass("fail");
        $("body,html").scrollTop($(".flash_alert-form").offset().top);
    }
});