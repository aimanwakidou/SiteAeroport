/*Ajout vol*/
function addVols(code,provenance,destination,heure,imgSrc,ArrDep){
	var classTr = (ArrDep == "Arrivée") ? "avionArrive" : "avionDepart";
	var classAlert = (ArrDep == "Arrivée") ? "AlertArrivee" : "AlertDepart";
	var trString = '<tr class="'+classTr+'">'+
		'<td class="logoCompany"><img src="'+imgSrc+'"/></td>'+
		'<td class="numVol">'+code+'</td>'+
		'<td>'+provenance+'</td>'+
		'<td>'+destination+'</td>'+
		'<td>'+heure+'</td>'+
		'<td></td>'+
		'<td><input type="checkbox" name="Alert" class="'+classAlert+'"/></td>'+
		'</tr>';
	
	var tr = $.parseHTML(trString);
	$((ArrDep == "Arrivée") ? "#ArriveeBody" : "#DepartBody").append(tr);	
}

var ArrDepTab = ["Arrivée","Départ"];
var url = "https://5.196.225.5/api/Vols/";

ArrDepTab.forEach(function(ArrDep){
	$.getJSON(url+ArrDep,{})
	
	.done(function(data){
		Object.keys(data).forEach(function(key){
			addVols(data[key].CodeVol,data[key].Provenance,data[key].Destination,data[key].Heure,data[key].Img,ArrDep);
		});
		/*Contrôle fenetre modal*/
		$(".AlertArrivee,.AlertDepart").each(function () {
			var hasClass = $(this).hasClass("AlertArrivee");
			var EnvoiOk = hasClass ? $(".EnvoiOkArrive") : $(".EnvoiOkDepart");
			$(this).change(function () {
				CheckButtonCheckBox(EnvoiOk, $(this));
				ControleCheckBox(EnvoiOk,hasClass);
			});
		});
	});
});
