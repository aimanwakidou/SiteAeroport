/*Controle formulaire*/
function ControleEmail(){
	var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	Controle($("#email"),emailRegex);
}

function ControleTel(){
	Controle($("#tel"),/[0-9]{10}/);
}

/*Fonction de controle*/
function Controle(elementJQuery,regex){
	var result = elementJQuery.val().match(regex);
	if(elementJQuery.val().length){
		if(result == null){
			elementJQuery.addClass('fail');
			if(elementJQuery.parent().hasClass('success'))
				telJQuery.parent().removeClass('success');
			return false;
		}
		else{
			elementJQuery.parent().addClass('success');
			if(elementJQuery.hasClass('fail'))
				elementJQuery.removeClass('fail');
			return true;
		}
	}
	else{
		if(elementJQuery.hasClass('fail') || elementJQuery.parent().hasClass('success'))
			elementJQuery.removeClass('fail');
		else
			elementJQuery.parent().removeClass('success');

		return true;
	}
}

/*Fonction de nettoyage*/
function Nettoyage(elementJQuery){
	if(elementJQuery.hasClass('fail'))
		elementJQuery.removeClass('fail');

	if(elementJQuery.parent().hasClass('success'))
		elementJQuery.parent().removeClass('success');
}

/*Nettoyage en cas de clique*/
$("#tel").click(function(){
	Nettoyage($(this));
});

$("#email").click(function(){
	Nettoyage($(this));
});