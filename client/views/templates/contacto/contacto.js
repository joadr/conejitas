Template.contacto.events({
	'click .contactoEnviar': function () {
		var name = $('[name=name]').val();
		var email = $('[name=email]').val();
		//var subject = $('[name=subject]').val();
		var message = $('[name=message]').val();
		var foto = $('[name=fotoPro]').prop('checked');
    	var video = $('[name=videoPro]').prop('checked');

		if(name == "" || email == "" || message == ""){
			return;
		}

		$("input[type=submit]").val("Cargando...");

    	if(foto == true){
    		foto = "Si";
    	} else {
    		foto = "No";
    	}

    	if(video == true){
    		video = "Si";
    	} else {
    		video = "No";
    	}

        var recaptchaResponse = grecaptcha.getResponse();

    	var mensaje = "Administrador una persona se está tratando de poner en contacto con usted, los datos son los siguientes:<br>";
    	mensaje += "Email: "+email+"</br>Nombre: "+name+"<br>Asunto: "+subject+"<br>Fotos: "+foto+"<br>Video: "+video+"<br>Mensaje: <pre>"+message+"</pre>";

    	Meteor.call('enviarContacto', email, mensaje, recaptchaResponse, function(err, msg){
    		$("input[type=text]").val("");
			$("input[type=email]").val("");
			$("input[type=submit]").val("Enviar");
			$(".enviado").show();
    		$("textarea").val("");
    		$('.message').html("Su mensaje ha sido enviado correctamente.");
    	});
	}
});