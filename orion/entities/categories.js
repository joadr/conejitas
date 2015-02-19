orion.addEntity('categories', {
	image: orion.attribute('file', {
        label: 'Imagen',
        optional: true
    }),
	name: {
		type: String,
		label: "Nombre",
	},
	searchable: {
		type: String,
		autoValue: function () {
			if(this.field("name").isSet){
				return reemplazartildes(this.field("name").value.toLowerCase());
			}
		},
		autoform: {
			omit: true
		}
	}
}, {
	icon: 'folder',
	sidebarName: 'Categorías',
	pluralName: 'Categorías',
	singularName: 'Categoría',
	tableColumns: [
		{ data:'name', title: 'Nombre' },
    ]
	/*defaultIndexTableFields: [
		{key:'name', label: 'Nombre'},
	]*/
});