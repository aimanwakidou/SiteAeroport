$(document).ready(function(){
	let aeroport = $.urlParam("aeroport");
	let hour = new Date().getHours();
	
	/*Mis à jour titre météo*/
    $("#DayOrNight").text((hour < 18 && hour > 6) ? "jour" : "soir");
	
	let url = "https://5.196.225.5/api/Meteo/"+aeroport;
	
	$.getJSON(url,{})
	
	.done(function(data){
		$("mark.temp_c").text(data.temperature+" °C");
		$(".météoContent img").attr("src",data.url_icone);
	});
});