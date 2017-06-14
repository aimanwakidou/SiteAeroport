/*fonction Ajout Compagnies*/
function AjoutCompagnie(compagnie){
	var compagnieHtml = '<option value="'+compagnie+'">'+compagnie+'</option>';
	$("#Compagnies select").append($.parseHTML(compagnieHtml));
}

var url = "https://5.196.225.5/api/Compagnies";


$(document).ready(function(){
	$.getJSON(url,{})

	.done(function(data){
		data.Compagnies.forEach(function(compagnie){
			AjoutCompagnie(compagnie);
		});
	});
});	
