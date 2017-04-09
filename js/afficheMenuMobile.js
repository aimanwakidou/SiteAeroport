/*Fonction pour afficher le menu en mode mobile*/
function AfficheMenuMobile(){
	var rotateElem = $("#rotateElem");
	if(rotateElem.attr('class') === "fa fa-plane clicked"){
		rotateElem.css({WebkitTransform:'rotate('+0+'deg)'});
		rotateElem.css({'-moz-transform':'rotate('+0+'deg)'});
		rotateElem.css('transform','rotate('+0+'deg)');
		rotateElem.removeClass("clicked");
	}
	else{
		rotateElem.css({WebkitTransform:'rotate('+90+'deg)'});
		rotateElem.css({'-moz-transform':'rotate('+90+'deg)'});
		rotateElem.css('transform','rotate('+90+'deg)');
		rotateElem.addClass("clicked");
	}
}

