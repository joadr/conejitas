Template.khipuButton.rendered = function () {
	
};
khipuLoad = function(data){
  	KhipuLib.onLoad({
		elementId: 'pay-button',
		data: data
  	});
};

khipu_get_new_payment = function( email, bank_id, amount, subject, body, transaction_id ){
	var result = Meteor.call('khipu_get_new_payment', email, bank_id, amount, transaction_id, subject, body);
	khipuLoad(result[0]);
	return result[1];
};

//'Bawdf'