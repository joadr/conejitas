orion.addEntity('conejitas', {
	userId: {
        type: String,
        label: "Id Usuario",
        optional: true
    },
	category: {
		type: String,
		label: "Categoría",
		autoform: {
	      type: "select",
	      options: function () {
	      	var categories = orion.entities.categories.collection.find().map(function(category, indice) {
				category.label = category.name;
				category.value = category.name;
      			return category;
    		})
    		return categories;
	        //return orion.entities.services.collection.find()
	      }
	    }
	},
	name: {
		type: String,
		label: "Nombre",
	},
	realName: {
		type: String,
		label: "Nombre real",
	},
	age: {
		type: Number,
		label: "Edad",
		min: 18
	},
	heigh: {
		type: String,
		label: "Altura"
	},
	weigh: {
		type: Number,
		label: "Peso"
	},
	measurements: {
		type: String,
		label: "Medidas"
	},
	message: orion.attribute('froala', {
        label: 'Mensaje',
        optional: true
    }),
	services: {
		type: [String],
		label: "Servicios",
		autoform: {
	      type: "select-checkbox",
	      options: function () {
	      	var servicios = orion.entities.services.collection.find().map(function(servicio, indice) {
				servicio.label = servicio.name;
				servicio.value = servicio._id;
      			return servicio;
    		})
    		return servicios;
	        //return orion.entities.services.collection.find()
	      }
	    }
	},
	schedule: {
		type: String,
		label: "Horario"
	},
	place: {
		type: String,
		label: "Lugar"
	},
	sector: {
		type: String,
		label: "Sector"
	},
	phone: {
		type: String,
		label: "Teléfono"
	},
	mainImage: orion.attribute('file', {
        label: 'Imagen'
    }),
    images: orion.arrayOfAttribute('file', {
        label: 'Imagen',
        optional: true
    }),
    video: orion.attribute('file', {
        label: 'Video',
        optional: true
    }),
	price:{
		type: Number,
		label: "Precio"
	},
	usdPrice:{
		type: Number,
		label: "USD-Precio"
	},
	carPark:{
		type: Boolean,
		label: "Estacionamiento",
		optional: true
	},
	conscierge:{
		type: Boolean,
		label: "Conserje",
		optional: true
	},
	piercing:{
		type: Boolean,
		label: "Piercing",
		optional: true
	},
	tatoo:{
		type: Boolean,
		label: "Tatuaje",
		optional: true
	},
	preservative:{
		type: Boolean,
		label: "Preservativo",
		optional: true
	},
	evaluationCode: {
		type: String,
		unique: true,
		autoValue: function () {
			return Math.random().toString(36).substring(7).toLowerCase();
		},
		autoform: {
			omit: true
		}
	},
	promedio: {
		type: Number,
		decimal: true,
		defaultValue: 0,
		autoform: {
			omit: true
		}
	},
	online: {
		type: Boolean,
		defaultValue: false,
		autoform: {
			omit: true
		}
	},
	CI: orion.attribute('file', {
        label: 'Foto CI/Pasaporte'
    }),
    plan: {
		type: String,
		label: "Plan",
		optional: true
	},
	opcion: {
		type: String,
		label: "opcion",
		optional: true
	},
	fechaInicioPlan: {
		type: Date,
		label: "Inicio Plan",
		optional: true
	},
	aproved: {
		type: Boolean,
		label: "aprobada",
		autoform: {
			omit: true
		}
	},
	email: {
		type: String,
		label: "email",
	},
	password: {
		type: String,
		label: "contraseña",
		autoform: {
			omit: true
		}
	}
}, {
	icon: 'bookmark',
    sidebarName: 'Conejitas',
    pluralName: 'Conejitas',
    singularName: 'Conejita',
    tableColumns: [
        { data:'name', title: 'Nombre' },
		{ data:'age', title: 'Edad' },
		{ data:'heigh', title: 'Estatura' },
		{ data:'weigh', title: 'Peso' },
		{ data:'measurements', title: 'Medidas' },
		{ data:'category', title: 'Categoría' },
		{ data:'aproved', title: 'Aprobado' },
        orion.attributeColumn('froala', 'message', 'Mensaje')
    ]
});