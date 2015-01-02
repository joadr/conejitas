Meteor.publish("evaluations", function () {
	return Evaluations.find();
});