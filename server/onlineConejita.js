Meteor.methods({
	onlineConejita: function (conejita_id) {
		return orion.entities.conejitas.collection.update(conejita_id, {$set: {online: true}});
	},
	offlineConejita: function(conejita_id){
		return orion.entities.conejitas.collection.update(conejita_id, {$set: {online: false}});
	}
});