Template.vivo.helpers({
	conejitas: function () {
		var conejitas = orion.entities.conejitas.collection.find({online: true, aproved: true, workCity: Session.get("city")}).fetch();
    	if (conejitas.length > 0){
			return conejitas;
		} else {
			return false;m
		}
	},
	divide: function(promedio) {
		return promedio / 2;
	}
});