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
                console.log(data);
                var messageAffiche = (data.message == "OK") ? ".messageSuccess" : ".messageFail";
                var messageNonAffiche = (messageAffiche == ".messageSuccess") ? ".messageFail" : ".messageSuccess";

                if($(messageNonAffiche).hasClass("displayMessage")){
                    $(messageNonAffiche).removeClass("displayMessage");
                    $(messageNonAffiche).addClass("noDisplayMessage");
                }

                $(messageAffiche).removeClass("noDisplayMessage");
                $(messageAffiche).addClass("displayMessage");

                /*Detail en cas d'erreur*/
                $(".messageFail .messageInner mark").text(data.detail);

            });
    }
    else {
        first_vol.addClass("fail");
        $("body,html").scrollTop($(".flash_alert-form").offset().top);
    }
});