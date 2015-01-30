Template.conejita.helpers({
	conejita: function () {
		var conejita = orion.entities.conejitas.collection.findOne({_id: Router.current().params._id, aproved:true});
    	conejita.name = conejita.name.toUpperCase();
    	for (index = 0; index < conejita.services.length; ++index) {
    		service = orion.entities.services.collection.findOne({'_id': conejita.services[index]});
    		conejita.services[index] = service.name;
    	}

		if(conejita.promedio){
			conejita.promedio = conejita.promedio.toFixed(1);
		}
		return conejita;
	},
	divide: function(promedio) {
		return promedio / 2;
	}
});