Router.map(function () {

	// Ver conejitas sin aprobar
	this.route('unapprovedConejitas', {
		path: '/admin/conejitas/unapproved',
		layoutTemplate: 'adminLayout',
		loadingTemplate: 'adminLoading',
		waitOn: function () {
			return orion.admin.adminSubscriptions;
		}
	});

	// Aprobar conejita seleccionada
	this.route('approveConejita', {
		layoutTemplate: 'adminLayout',
		loadingTemplate: 'adminLoading',
		path: '/admin/conejitas/approve/:_id',
		/*onBeforeAction: function() {
			return orion.users.ensureRoutePermissions('entity.' + this.params.entity)(this);
		},*/
		waitOn: function () {
			return _.union(orion.subs.subscribe('entity', 'conejitas', { _id: this.params._id }), orion.admin.adminSubscriptions);
		},
		data: function() {
			var entity = orion.entities.conejitas;
			return {
				entity: entity,
				item: entity.collection.findOne(this.params._id)
			}
		}
	});
});
