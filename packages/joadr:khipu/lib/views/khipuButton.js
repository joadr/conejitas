Template.khipuButton.rendered = function () {
	console.log('called');
	Meteor.call('khipu_get_new_payment', 'joaquin.diaz@ies.cl', 'Bawdf', 12, function (error, result) {
		khipuLoad(result);
	});
};
khipuLoad = function(data){
  	KhipuLib.onLoad({
		elementId: 'pay-button',
		data: data
  	});
};