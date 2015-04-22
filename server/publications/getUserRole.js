Meteor.publish("getUserRole", function () {
	if (this.userId) {
	return Meteor.users.find({_id: this.userId},
							 {fields: {'registrationType': 1, 'tokens': 1}});
	} else {
		this.ready();
	}
});