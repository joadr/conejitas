Meteor.methods({
	registrarUsuario: function (data) {
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