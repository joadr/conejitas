Evaluations = new Mongo.Collection("evaluations");
var Schemas = {};
Schemas.Evaluations = new SimpleSchema({
	cleaning: {
		type: Number,
		label: "Limpieza",
	},
	cozy: {
		type: Number,
		label: "Acogedor",
	},
	clothing: {
		type: Number,
		label: "Vestimenta",
	},
	bust: {
		type: Number,
		label: "Busto",
	},
	rear: {
		type: Number,
		label: "Cola",
	},
	skin: {
		type: Number,
		label: "Piel",
	},
	kisses: {
		type: Number,
		label: "Besos",
	},
	oralSex: {
		type: Number,
		label: "Sexo Oral",
	},
	analSex: {
		type: Number,
		label: "Sexo Anal",
	},
	american: {
		type: Number,
		label: "Americana",
	},
	photosVsReality: {
		type: Number,
		label: "Fotos vs realidad",
	},
	conejita:{
		type: String,
		label: "Conejita",
	},
	ip:{
		type: String,
		label: "Conejita",
	}
});

Evaluations.attachSchema(Schemas.Evaluations);