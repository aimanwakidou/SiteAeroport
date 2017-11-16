/*Ajout vol*/
function addVols(code,provenance,destination,statut,heure,imgSrc,ArrDep){
	let classTr = (ArrDep == "Arrivée") ? "avionArrive" : "avionDepart";
	let classAlert = (ArrDep == "Arrivée") ? "AlertArrivee" : "AlertDepart";
    let trString = '<tr class="' + classTr + '"  data-codevol="' + code +'" data-typevols="jour">'+
		'<td class="logoCompany"><img src="'+imgSrc+'" style="height:50px;width:100px;"/></td>'+
		'<td class="numVol">'+code+'</td>'+
		'<td>'+provenance+'</td>'+
		'<td>'+destination+'</td>'+
		'<td>'+heure+'</td>'+
		'<td>'+statut+'</td>'+
		'<td class="ToggleTd"><input type="checkbox" data-toggle="toggle" name="Alert" class="'+classAlert+' toggleCheckBox" data-vols="day"/></td>'+
		'</tr>';
	
	let tr = $.parseHTML(trString);
	$((ArrDep == "Arrivée") ? "#ArriveeBody" : "#DepartBody").append(tr);	
}

var ArrDepTab = ["Arrivée","Départ"];

ArrDepTab.forEach(function(ArrDep){
	$.getJSON(urlApi+"/Vols/"+ArrDep,{})
	
	.done(function(data){
		Object.keys(data).forEach(function(key){
			addVols(data[key].CodeVol,data[key].Provenance,data[key].Destination,data[key].Statut,data[key].Heure,data[key].Img,ArrDep);
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

        /*Paramétrage Bootstrap Toggle Checkbox*/
        $('.toggleCheckBox[data-vols="day"]').bootstrapToggle({
            on: 'Suivi',
            off: 'Non Suivi',
            onstyle: "success",
            size:"small",
            height: 60,
            width:85
        });
	});
});
