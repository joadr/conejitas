Template.khipuButton.rendered = function () {
	$('#pay-button').hide()
	Session.set("payReady", false);
	var bank = $('.banks').val();
	var data = Meteor.call('pagar', Router.current().params.transaction_id, bank);
	
	Tracker.autorun(function () {
		if(Session.get("payReady") === true){
			$('#pay-button').show()
			khipuLoad(data);
		}
	});
};