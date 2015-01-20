Template.aliados.helpers({
	aliados: function () {
		var aliados = orion.entities.aliados.collection.find().fetch();
    	
		return aliados;
	}
});