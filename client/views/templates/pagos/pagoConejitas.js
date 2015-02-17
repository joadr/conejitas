Template.pagoConejitas.helpers({
	abono: function () {
		var abono = pagos.findOne({transaction_id: Router.current().params.transaction_id, pagado: false});
		
		return abono;
	},
	puedePagar: function(){
		var conejita = orion.entities.conejitas.collection.findOne({_id: Router.current().params._id});
		if(conejita.aproved === false){
			return false;
		}
		return true;
	},
	pagado: function(){
		var pago = pagos.find({transaction_id: Router.current().params.transaction_id}).fetch();
		if(pago.pagado){
			return true;
		}
		if(pago.conejita != Router.current().params._id){
			return true;
		}

		return false;
	}
});

Template.pagoConejitas.events({
	'click .pagar': function () {
		$('formulario').hide();
		UI.insert(UI.render(khipuButton), document.getElementsByClassName("khbutton")[0]);
	}
});