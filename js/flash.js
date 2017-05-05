$('#zoneFlashAlert').submit(function(event) {
	event.preventDefault();

	var url = "https://5.196.225.5/Flash/sendFlash";
	var tabVols = [];
	 $('#zoneFlashAlert #BoxFlashAlert input:visible[type=text]').each(function () {
        tabVols.push( $(this).val());
        
        });

	 
	 
 	$.post(url,
	{
		vols:tabVols,
		num_vol:$("#num_vol_flash").val(),
		email:$("#email2").val(),
		nom:$("#nomFlash").val(),
		prenom:$("#prénomFlash").val(),
		tel:$("#tel2").val()
	},

	function(data,status){
		console.log(status);
	});
	 
	

});
