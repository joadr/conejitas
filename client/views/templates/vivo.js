Template.vivo.helpers({
	conejitas: function () {
		var conejitas = orion.entities.conejitas.collection.find({online: true, approved: true}).fetch();
    	
		return conejitas;
	},
	divide: function(promedio) {
		return promedio / 2;
	}
});