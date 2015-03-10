Meteor.methods({
	crearConejita: function (conejita) {
		var idConejita = orion.entities.conejitas.collection.insert(conejita);

		// Enviamos el email.
		Meteor.call('sendEmail',
            'joaquin.diaz@ies.cl',
            'joaquin.diaz@ies.cl',
            'Nueva inscripción conejita: '+conejita.name+'!',
            'Se ha registrado una conejita.<br><p>Para visualizarla en el sistema haga click <a href="http://www.clubconejitas.cl/admin/e/conejitas/'+idConejita+'">Aquí</a></p>');

		return idConejita;
	}
});