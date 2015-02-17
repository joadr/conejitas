Meteor.methods({
	unlockConejita: function (id) {
		if(Meteor.userId()){
/*			Meteor.users.update(userId, { 
			  $set: {
			    isAdmin: false, 
			    permissions: permisos, 
			    registrationType: 'usuarios', 
			    profile: {
			      name: data.name
			    }
			  }
			});*/

			Meteor.users.update(Meteor.userId(), {
				$push:{
					visitedConejitas: id
				}
			})
		}
	}
});