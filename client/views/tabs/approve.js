// Apruebo la conejita
Template.approveConejita.events({
	'click .approve': function(event) {
		var conejita = orion.entities.conejitas.collection.findOne(Router.current().params._id);
		
		//Router.current().params._id
	},
	'click .save': function(event) {
		$("#updateEntityForm2").submit();
	}
});

AutoForm.hooks({
	updateEntityForm2: {
		onSuccess: function(operation, result, template) {
			//var name = Router.current().data().entity.name;
			Router.go('unapprovedConejitas');
		}
	}
});

Template.approveConejita.helpers({
	getEntity: function () {
		return 'conejitas';
	}
});