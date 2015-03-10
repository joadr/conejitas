/**
* SubmitCreateConejita method in server's folder
**/
Template.registro2.events({
	'click .submit': function(e) {
		e.preventDefault();
		// Obtengo los datos anteriores de las conejitas.
		var datos = Session.get("datos");

		/*var conejita = document;
		$('input').each()*/
		var conejita = AutoForm.getFormValues("createConejitaForm").insertDoc;
		conejita.phone = datos.telefono;
		conejita.plan = datos.plan;
		conejita.opcion = datos.opcion;
		conejita.name = datos.nombre;
		conejita.email = datos.email;
		conejita.password = datos.password;
		conejita.aproved = false;
		conejita.createdBy = "guest";

		// Creamos la conejita.
		//check(conejita, orion.entities.conejitas.schema);

		// Aquí se manda el mail y se crea el documento.
		Meteor.call('crearConejita', conejita, function (error, result) {
			alert('Solicitud enviada a procesamiento.');
			Router.go('conejitas');
			console.log(result);
		});

		
		// Email.send();
		//return Meteor.users.find({}, { limit: 1 }).count() == 0
	}
});

Template.registro2.helpers({
	video: function () {
		var datos = Session.get("datos");
		if(datos.plan == "plan2"){
			return true;
		}
		return false;
	}
});