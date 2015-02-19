// Agrego el sidebar al orion
orion.admin.addSidebarTab({
    routeName: 'unapprovedConejitas',
    navbarTitle: 'Conejitas sin aprobar',
    icon: 'file-text',
    permission: 'conejitas.approve'
});

// Le mando la tabla a armar al tabular
Template.unapprovedConejitas.helpers({
	table: function() {
		return orion.entities.conejitas.table;
	},
	selector: function(){
		return { aproved: null };
	}
});

// Creo una acción al clickear a las conejitas.
Template.unapprovedConejitas.events({
	'click tr': function(event) {
		var dataTable = $(event.target).closest('table').DataTable();
		var rowData = dataTable.row(event.currentTarget).data();
		Router.go('approveConejita', {
			_id: rowData._id
		});
	}
});