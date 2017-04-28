/*Pour cacher le menu*/
function CacherMenu(){
	var menu_content = $("#hide");
	if(menu_content.hasClass("noDisplay")){
        $(".rotate").css('transform', 'rotate(' + 180 + 'deg)');
        menu_content.removeClass("noDisplay");
        menu_content.addClass("display");
	}
	else{
        $(".rotate").css('transform', 'rotate(' + 0 + 'deg)');
        menu_content.addClass("noDisplay");
        menu_content.removeClass("display");
	}
}