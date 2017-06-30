var AfficheEnum = {
    Default:0,
    Show: 1,
    Hide:2
}

$(document).ready(function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('.selectpicker').selectpicker('mobile');
    }
});

function AfficheInput(elemjQuery,AfficheEnumType) {
    var classToAdd = AfficheEnumType == AfficheEnum.Hide ? "noDisplayGenerique2" : "displayGenerique2";
    var classToRemove = AfficheEnumType == AfficheEnum.Hide ? "displayGenerique2" : "noDisplayGenerique2";

    if (elemjQuery.hasClass(classToRemove)) {
        elemjQuery.removeClass(classToRemove);
    }

    elemjQuery.addClass(classToAdd);

}
