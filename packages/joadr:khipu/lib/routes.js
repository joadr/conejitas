Router.map(function(){
	this.route('/testing', function () {
		Meteor.call('checkCobradorState');
	});
});