Template.contactoMobile.events({
    'click #btnEnviar': function () {
        var name = $('[name=name]').val();
        var email = $('[name=email]').val();
        var message = $('[name=comentarios]').val();

        var mensaje = "Administrador una persona se está tratando de poner en contacto con usted, los datos son los siguientes:<br>";
        mensaje += "Email: "+email+"</br>Nombre: "+name+"<br>Mensaje: <pre>"+message+"</pre>";

        Meteor.call('enviarContacto', email, mensaje, function(err, msg){
            $("input").val("");
            $("textarea").val("");
            $('.message').html("Su mensaje ha sido enviado correctamente.");
        });
    }
});