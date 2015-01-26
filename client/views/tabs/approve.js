// Apruebo la conejita
Template.approveConejita.events({
	'click #submit-btn-approve': function(event) {
		var conejita = orion.entities.conejitas.collection.findOne(Router.current().params._id);
		
		//Router.current().params._id
	},
	'click #submit-btn': function() {
		$("#updateEntityForm").submit();
	}
});

AutoForm.hooks({
	updateEntityForm: {
		onSuccess: function(operation, result, template) {
			//var name = Router.current().data().entity.name;
			Router.go('unapprovedConejitas');
		}
	}
});

Template.approveConejita.helpers({
	getEntity: function () {
		return Router.current().data().entity.name;
	}
});