Template.aliados.helpers({
	aliados: function () {
		var aliados = orion.entities.aliados.collection.find().fetch();
		if (aliados.length > 0){
			return aliados;
		} else {
			return false;
		}
		//return aliados;
	}
});