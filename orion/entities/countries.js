orion.addEntity('countries', {
	name: {
		type: String,
		label: "Nombre",
	},
	picture: orion.attribute('file', {
        label: 'Imagen',
        optional: true
    }),
    enabled: {
    	type: Boolean,
    	label: "Habilitado",
    	optional: true
    }
}, {
	icon: 'flag-checkered',
	sidebarName: 'Países',
	pluralName: 'Países',
	singularName: 'País',
	tableColumns: [
		{ data:'name', title: 'Nombre' },
		{ data:'enabled', title: 'Habilidado' }
    ]
});