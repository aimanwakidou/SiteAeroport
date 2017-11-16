$(document).ready(function(){
	let aeroport = $.urlParam("aeroport");
	let hour = new Date().getHours();
	
	/*Mis à jour titre météo*/
    $("#DayOrNight").text((hour < 18 && hour > 6) ? "jour" : "soir");
	
	let urlMeteo = urlApi+"/Meteo/"+aeroport;
	
	$.getJSON(urlMeteo,{})
	
	.done(function(data){
		$("mark.temp_c").text(data.temperature+" °C");
		$(".météoContent img").attr("src",data.url_icone);
	});
});