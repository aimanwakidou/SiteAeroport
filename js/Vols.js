/*Ajout vol*/
function addVols(code,provenance,destination,heure,imgSrc,ArrDep){
	var classTr = (ArrDep == "Arrivée") ? "avionArrive" : "avionDepart";
	var classAlert = (ArrDep == "Arrivée") ? "AlertArrivee" : "AlertDepart";
	var trString = '<tr class="'+classTr+'">'+
		'<td class="logoCompany"><img src="'+imgSrc+'" style="height:50px;width:100px;"/></td>'+
		'<td class="numVol">'+code+'</td>'+
		'<td>'+provenance+'</td>'+
		'<td>'+destination+'</td>'+
		'<td>'+heure+'</td>'+
		'<td></td>'+
		'<td><div class="checkbox"><input type="checkbox" name="Alert" class="'+classAlert+'"/></div></td>'+
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
			var selector = $(this).hasClass("AlertArrivee") ? "Arrivee" : "Depart";
			var EnvoiOk = selector == "Arrivee" ? $(".EnvoiOkArrive") : $(".EnvoiOkDepart");
			$(this).change(function () {
				CheckButtonCheckBox(EnvoiOk, $(this));
				ControleCheckBox(EnvoiOk,selector);
			});
		});
	});
});
