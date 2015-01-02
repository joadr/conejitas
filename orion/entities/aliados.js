orion.addEntity('aliados', {
	name: {
		type: String,
		label: "Nombre",
	}
	/*
	DrillingCenter - Directorio.
	*/
}, {
	sidebarName: 'Aliados',
	pluralName: 'Aliados',
	singularName: 'Aliado',
	tableColumns: [
		{ data:'name', title: 'Nombre' },
    ]
});