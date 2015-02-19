orion.addEntity('cities', {
	name: {
		type: String,
		label: "Nombre",
	},
	country: {
		type: String,
		label: "País",
		autoform: {
	      type: "select",
	      options: function () {
	      	var countries = orion.entities.countries.collection.find().map(function(country, indice) {
				country.label = country.name;
				country.value = country._id;
      			return country;
    		})
    		return countries;
	        //return orion.entities.services.collection.find()
	      }
	    }
	},
    enabled: {
    	type: Boolean,
    	label: "Habilitado",
    	optional: true
    }
}, {
	icon: 'flag-o',
	sidebarName: 'Ciudades',
	pluralName: 'Ciudades',
	singularName: 'Ciudad',
	tableColumns: [
		{ data:'name', title: 'Nombre' },
		{
			data: "country",
			title: "País",
			render: function (val, type, doc) {
				var country = orion.entities.countries.collection.findOne(val);
				return country.name;
			}
		},
		{ data:'enabled', title: 'Habilidado' }
    ]
});