recalculateEvaluation = function(conejitaId) {
	var promedio;
	var suma = {};
	var cuenta = 0;
	suma.cleaning = 0;
	suma.cozy = 0;
	suma.clothing = 0;
	suma.bust = 0;
	suma.rear = 0;
	suma.skin = 0;
	suma.kisses = 0;
	suma.oralSex = 0;
	suma.analSex = 0;
	suma.american = 0;
	suma.photosVsReality = 0;
	evaluaciones = Evaluations.find({conejita: conejitaId}).fetch();
	for(var i = 0; i<evaluaciones.length; i++){
		cuenta++;
		suma.cleaning = suma.cleaning + evaluaciones[i].cleaning;
		suma.cozy = suma.cozy + evaluaciones[i].cozy;
		suma.clothing = suma.clothing + evaluaciones[i].clothing;
		suma.bust = suma.bust + evaluaciones[i].bust;
		suma.rear = suma.rear + evaluaciones[i].rear;
		suma.skin = suma.skin + evaluaciones[i].skin;
		suma.kisses = suma.kisses + evaluaciones[i].kisses;
		suma.oralSex = suma.oralSex + evaluaciones[i].oralSex;
		suma.analSex = suma.analSex + evaluaciones[i].analSex;
		suma.american = suma.american + evaluaciones[i].american;
		suma.photosVsReality = suma.photosVsReality + evaluaciones[i].photosVsReality;
	}

	promedio = suma.cleaning / cuenta;
	return promedio;
};