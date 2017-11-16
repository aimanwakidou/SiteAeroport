$('#zoneAlerteSuivi').submit(function (event) {
    event.preventDefault();
    var first_vol = $("#first_vol input");
    if (first_vol.val().length) {
        let urlFlash = urlApi+"/Flash/";
        let tabVols = [];

        $('#BoxFlashAlert .search-box-inner input').each(function () {
            tabVols.push($(this).val());
        });

        $.post(urlFlash,
            {
                vols: tabVols,
                email: $("#email").val(),
                nom: $("#nom").val(),
                prenom: $("#prénom").val(),
                tel: $("#tel").val()
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