Meteor.publish("evaluations", function () {
	return Evaluations.find();
});

Meteor.publish("myEvaluations", function(){
    var conejita = orion.entities.conejitas.collection.findOne({userId: this.userId});
    return Evaluations.find({conejita: conejita._id});
});