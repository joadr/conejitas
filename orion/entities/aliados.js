orion.addEntity('aliados', {
	name: {
		type: String,
		label: "Nombre",
	},
	picture: orion.attribute('file', {
        label: 'Imagen'
    }),
    link: {
		type: String,
		label: "Link",
		optional: true
	},
	/*
	DrillingCenter - Directorio.
	*/
}, {
	icon: 'star',
	sidebarName: 'Aliados',
	pluralName: 'Aliados',
	singularName: 'Aliado',
	tableColumns: [
		{ data:'name', title: 'Nombre' },
		{ data:'link', title: 'Link' },
    ]
});