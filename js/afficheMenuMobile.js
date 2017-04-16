/*Fonction pour afficher le menu en mode mobile*/
function AfficheMenuMobile(){
	var rotateElem = $("#rotateElem");
	if(rotateElem.hasClass("clicked")){
		rotateElem.css('transform','rotate('+0+'deg)');
		rotateElem.removeClass("clicked");
	}
	else{
		rotateElem.css('transform','rotate('+90+'deg)');
		rotateElem.addClass("clicked");
	}
}

