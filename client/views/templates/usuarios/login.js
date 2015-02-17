Template.loginUsuarios.events({
	'submit .loginUsuarios': function (e) {
		e.preventDefault();

		var trimInput = function(val) {
			return val.replace(/^\s*|\s*$/g, "");
		};

		var email = trimInput($('input[name=email]').val());
		var password = $('input[name=password]').val();

		Meteor.loginWithPassword({ email: email }, password, function(e){
			if(e){
				$('.message').html("Usuario y/o contraseña incorrectos");
				return false;
			} else {
				Router.go('album');
			}
		});
		return false;
	}
});