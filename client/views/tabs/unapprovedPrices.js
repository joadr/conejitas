// Agrego el sidebar al orion
orion.admin.addSidebarTab({
    routeName: 'unapprovedPrices',
    navbarTitle: 'Ofertas sin aprobar',
    icon: 'file-text',
    permission: 'conejitas.approve'
});

// Le mando la tabla a armar al tabular
Template.unapprovedPrices.helpers({
    table: function() {
        return orion.entities.conejitas.table;
    },
    selector: function(){
        return { approvedPrice: false };
    }
});

// Creo una acción al clickear a las conejitas.
Template.unapprovedPrices.events({
    'click tr': function(event) {
        var dataTable = $(event.target).closest('table').DataTable();
        var rowData = dataTable.row(event.currentTarget).data();
        Router.go('approvePrice', {
            _id: rowData._id
        });
    }
});