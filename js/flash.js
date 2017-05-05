$('#zoneFlashAlert').submit(function (event) {
    event.preventDefault();
    var first_vol = $("#first_vol input");
    if (first_vol.val().length) {
        var url = "https://5.196.225.5/Flash/sendFlash";
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

            function (data, status) {
                console.log(data);
            });
    }
    else {
        first_vol.addClass("fail");
        $("body,html").scrollTop($(".flash_alert-form").offset().top);
    }
});