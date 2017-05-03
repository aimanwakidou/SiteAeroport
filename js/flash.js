$('#zoneFlashAlert').submit(function(event) {
	event.preventDefault();

	var url = "https://5.196.225.5/Flash/sendFlash";
	console.log($("#num_vol_flash"));
	
	$.post(url,
	{
		num_vol:$("#num_vol_flash").val(),
		email:$("#email2").val(),
		tel:$("#tel2").val()
	},

	function(data,status){
		console.log(data);
	});

});
