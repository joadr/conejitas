// función para aprobar conejitas
Meteor.methods({
  approveConejita: function (conejita) {
    Meteor.call('sendEmail',
            'joaquin.diaz@ies.cl',
            'joaquin.diaz@ies.cl',
            'Club Conejitas: '+conejita.name+', ¡has sido aceptada dentro del club conejitas!',
            'Has sido aceptada dentro del club conejitas, debes proceder al pago en el siguiente enlace: <a href="http://www.clubconejitas.cl/admin/e/conejitas/'+idConejita+'">Aquí</a></p>');
  },
  primerPago: function(conejita){
    var userId = Accounts.createUser({
      email: conejita.email,
      password: conejita.password
    });

    var permisos = [];

    Meteor.users.update(userId, { 
      $set: {
        isAdmin: false, 
        permissions: permisos, 
        registrationType: 'conejita', 
        profile: {
          name: conejita.name
        }
      }
    });

    orion.entities.conejitas.collection.update(conejita._id, { $set: { approved: true, userId: userId, password: null }});
  }
});
