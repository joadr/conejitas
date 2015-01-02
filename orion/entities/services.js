orion.addEntity('services', {
	name: {
		type: String,
		label: "Nombre",
	}
}, {
	sidebarName: 'Servicios',
	pluralName: 'Servicios',
	singularName: 'Servicio',
	tableColumns: [
		{ data:'name', title: 'Nombre' },
		
    ]
	/*defaultIndexTableFields: [
		{key:'name', label: 'Nombre'},
	]*/
});