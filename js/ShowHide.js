/*Fonction pour afficher le menu en mode mobile*/
$("#buttonMobile").click(function (){
	var rotateElem = $("#rotateElem");
	if(rotateElem.hasClass("clicked")){
		rotateElem.css('transform','rotate('+0+'deg)');
		rotateElem.removeClass("clicked");
	}
	else{
		rotateElem.css('transform','rotate('+90+'deg)');
		rotateElem.addClass("clicked");
	}
});

$(".hidebutton").click(function(){
	var menu_content = $("#hide");
	var classToAdd = null;
	var classToRemove = null;
	var rotateValue = 0;

	if(menu_content.hasClass("noDisplay")){
		classToAdd = "display";
		classToRemove = "noDisplay";
		rotateValue = 180;
	}
	else{
		classToAdd = "noDisplay";
		classToRemove = "display";
	}
        
    $(".rotate").css('transform', 'rotate(' + rotateValue + 'deg)');
    menu_content.removeClass(classToRemove);
    menu_content.addClass(classToAdd);
    
});

