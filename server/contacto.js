Meteor.methods({
	enviarContacto: function (email, mensaje, recaptchaResponse) {
        // Verificación de captcha
        var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(recaptchaResponse, this.connection.clientAddress);

        if (!verifyCaptchaResponse.success) {
            console.log('reCAPTCHA check failed!', verifyCaptchaResponse);
            throw new Meteor.Error(422, 'reCAPTCHA Failed: ' + verifyCaptchaResponse.error);
        } else {
            console.log('reCAPTCHA verification passed!');
            Meteor.call('sendEmail', "administrador@clubconejitas.cl", email, "Formulario de contacto", mensaje);
        }
	}
});