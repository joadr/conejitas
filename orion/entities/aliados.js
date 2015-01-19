orion.addEntity('aliados', {
	name: {
		type: String,
		label: "Nombre",
	},
	picture: orion.attribute('file', {
        label: 'Imagen'
    })
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