Meteor.methods({
	enviarContacto: function (email, mensaje) {
		Meteor.call('sendEmail', "administrador@clubconejitas.cl", email, "Formulario de contacto", mensaje);
	}
});