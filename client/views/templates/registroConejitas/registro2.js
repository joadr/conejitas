Meteor.methods({
	submitCreateConejita: function(document, modifier) {
		// Obtengo los datos anteriores de las conejitas.
		var datos = Session.get("datos");

		var conejita = document;
		conejita.phone = datos.telefono;
		conejita.plan = datos.plan;
		conejita.opcion = datos.opcion;
		conejita.name = datos.nombre;
		conejita.email = datos.email;
		conejita.password = datos.password;
		conejita.aproved = false;

		// Creamos la conejita.
		check(conejita, orion.entities.conejitas.schema);
		var idConejita = orion.entities.conejitas.collection.insert(conejita);

		// Enviamos el email.
		Meteor.call('sendEmail',
            'joaquin.diaz@ies.cl',
            'joaquin.diaz@ies.cl',
            'Nueva inscripción conejita: '+conejita.name+'!',
            'Se ha registrado una conejita.<br><p>Para visualizarla en el sistema haga click <a href="http://www.clubconejitas.cl/admin/e/conejitas/'+idConejita+'">Aquí</a></p>');
		// Email.send();
		//return Meteor.users.find({}, { limit: 1 }).count() == 0
	}
});