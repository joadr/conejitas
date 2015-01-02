Template.conejita.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentConejitaId = this._id;

    var evaluation = {
      cleaning: $(e.target).find('[name=cleaning]').val(),
      cozy: $(e.target).find('[name=cozy]').val(),
      clothing: $(e.target).find('[name=clothing]').val(),
      bust: $(e.target).find('[name=bust]').val(),
      rear: $(e.target).find('[name=rear]').val(),
      skin: $(e.target).find('[name=skin]').val(),
      kisses: $(e.target).find('[name=kisses]').val(),
      oralSex: $(e.target).find('[name=oralSex]').val(),
      analSex: $(e.target).find('[name=analSex]').val(),
      american: $(e.target).find('[name=american]').val(),
      photosVsReality: $(e.target).find('[name=photosVsReality]').val(),
      conejita: currentConejitaId,
      ip: headers.getClientIP()
    }

    var error = false;
    $.each(evaluation, function(key, value){
      if(value > 10 || value <1){
        error = true;
        return false;
      }
    });
    if(error){
      return alert("Por favor ingrese un número entre 1 y 10.");
    }
    
    var coneja = orion.entities.conejitas.collection.findOne({_id: this._id});
    if($(e.target).find('[name=code]').val() != coneja.evaluationCode){
      return alert("El código de evaluación no es válido o no corresponde a esta conejita.");
    }

    var hay = Evaluations.find({ip: headers.getClientIP(), conejita: currentConejitaId}).fetch();
    if(hay.length > 0){
      return alert("No puedes hacer más de una valoración de la misma conejita.");
    }
    Evaluations.insert(evaluation);

    orion.entities.conejitas.collection.update(this._id, {$set: {promedio: recalculateEvaluation(this._id)}});

    $(e.target).find('input[type=text]').val("");

    alert("Evaluación agregada con éxito.");
    //Router.go('/');
  }
});
