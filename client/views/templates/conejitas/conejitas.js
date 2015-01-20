Template.conejitas.helpers({
	conejasOnline: function () {
		conejitas = orion.entities.conejitas.collection.find({online: true}, {limit:2});
		return conejitas;
	}
});