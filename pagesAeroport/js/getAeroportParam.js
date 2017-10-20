$.urlParam = function(name){
	let results = new RegExp("[\?&]" + name + "=([^&#]*)").exec(window.location.href);
	return (results === null) ? false : decodeURI(results[1]) || 0;
};

$(document).ready(function(){
	let aeroport = $.urlParam("aeroport");
	$("mark.aeroport").text(aeroport);
	$("input[name=\"aeroport\"]").val(aeroport);
	document.title += " " + aeroport;
});