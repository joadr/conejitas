orion.addEntity('services', {
	name: {
		type: String,
		label: "Nombre",
	}
}, {
	icon: 'gear',
	sidebarName: 'Servicios',
	pluralName: 'Servicios',
	singularName: 'Servicio',
	tableColumns: [
		{ data:'name', title: 'Nombre' },	
    ]
});