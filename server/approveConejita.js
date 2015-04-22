// función para aprobar conejitas
Meteor.methods({
  approveConejita: function (conejita) {
    transaction_id = Meteor.call('generarPago', conejita._id);
    Meteor.call('sendEmail',
            conejita.email,
            '',
            'Club Conejitas: '+conejita.name+', ¡has sido aceptada dentro del club conejitas!',
            'Has sido aceptada dentro del club conejitas, debes proceder al pago en el siguiente enlace: <a href="http://www.clubconejitas.cl/conejita/pagar/'+conejita._id+'/'+transaction_id+'">Aquí</a></p>');
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

/*Meteor.users.update('nbq4Cgvp6NRfR6Bwr', {$set: {registrationType: 'conejitas', tokens: 10000}});
Meteor.users.update('SSTfaXSxxo5q5Ldjx', {$set: {tokens: 10000}});*/
