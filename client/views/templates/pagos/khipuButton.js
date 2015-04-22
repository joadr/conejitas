Template.khipuButton.rendered = function () {
	$('#pay-button').hide();
	//Session.set("payReady", false);
	var bank = $('.banks').val();
	Meteor.call('pagar', Router.current().params.transaction_id, bank, function(error, response){
		if(!error){
			KhipuLib.onLoad({
				elementId: 'pay-button',
				data: response.data
			});
			$('#pay-button').show();
			/*Session.set("data", response);
			Session.set("payReady", true);*/
		}
	});
	
	/*Tracker.autorun(function () {
		if(Session.get("payReady") === true){
			$('#pay-button').show()
			//khipuLoad(Session.get('data'));
			KhipuLib.onLoad({
				elementId: 'pay-button',
				data: Session.get('data')
			});
		}
	});*/
};