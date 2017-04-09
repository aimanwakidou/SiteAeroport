/*Pour cacher le menu*/
function CacherMenu(){
	var menu_content = $("#hide");
	var rotateElem = $(".rotateButton");
	if((menu_content.attr('class') === "news_container")){
		rotateElem.css({WebkitTransform:'rotate('+180+'deg)'});
		rotateElem.css({'-moz-transform':'rotate('+180+'deg)'});
		rotateElem.css('transform','rotate('+180+'deg)');
		menu_content.addClass("responsive");
		menu_content.show(250);
	}
	else{
		rotateElem.css({WebkitTransform:'rotate('+0+'deg)'});
		rotateElem.css({'-moz-transform':'rotate('+0+'deg)'});
		rotateElem.css('transform','rotate('+0+'deg)');
		menu_content.removeClass("responsive");
		menu_content.hide(250);
	}
}