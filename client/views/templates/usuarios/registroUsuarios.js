Template.registroUsuarios.events({
	'submit .formulario': function (e) {
		e.preventDefault();

		var data = {
			email: $("input[name=email]").val(),
			nick: $("input[name=nick]").val(),
			password: $("input[name=password]").val()
		};

		Meteor.call('registrarUsuario', data, function(error, result){
			if(error){
				$('.message').html(error.reason);
			} else {
				Router.go('loginUsuarios', {message: "Registro completado, proceda a iniciar sesión."});
			}
		});
	}
});