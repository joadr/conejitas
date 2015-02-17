Meteor.publish("visitedConejitas", function () {
	if (this.userId) {
	return Meteor.users.find({_id: this.userId},
							 {fields: {'visitedConejitas': 1}});
	} else {
		this.ready();
	}
});