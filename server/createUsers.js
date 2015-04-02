Meteor.methods({
    registrarUsuario: function (data, recaptchaResponse) {
        // Captcha Validation
        var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(recaptchaResponse, this.connection.clientAddress);

        if (!verifyCaptchaResponse.success) {
            console.log('reCAPTCHA check failed!', verifyCaptchaResponse);
            throw new Meteor.Error(422, 'reCAPTCHA Failed: ' + verifyCaptchaResponse.error);
            return false;
        }
        console.log('reCAPTCHA verification passed!');

        // User creation
        try {
			var userId = Accounts.createUser({
			  email: data.email,
			  username: data.nick,
			  password: data.password
			});

			var permisos = ['users.chat', 'users.laminas'];

			Meteor.users.update(userId, { 
			  $set: {
			    isAdmin: false, 
			    permissions: permisos, 
			    registrationType: 'usuarios', 
			    profile: {
			      name: data.name
			    }
			  }
			});
			return true;
		} catch(e){
			return e;
		}
	}
});