orion.addEntity('countries', {
	name: {
		type: String,
		label: "Nombre",
	},
	picture: orion.attribute('file', {
        label: 'Imagen'
    }),
    enabled: {
    	type: Boolean,
    	label: "Habilitado"
    }
}, {
	sidebarName: 'Aliados',
	pluralName: 'Aliados',
	singularName: 'Aliado',
	tableColumns: [
		{ data:'name', title: 'Nombre' },
		{ data:'enabled', title: 'Habilidado' }
    ]
});