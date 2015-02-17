Template.vivo.helpers({
	conejitas: function () {
		var conejitas = orion.entities.conejitas.collection.find({online: true, aproved: true}).fetch();
    	
		return conejitas;
	},
	divide: function(promedio) {
		return promedio / 2;
	}
});