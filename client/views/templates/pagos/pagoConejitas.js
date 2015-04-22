Template.pagoConejitas.helpers({
	abono: function () {
		var abono = pagos.findOne({transaction_id: Router.current().params.transaction_id, pagado: false});
		
		return abono.monto;
	},
	puedePagar: function(){
		var conejita = orion.entities.conejitas.collection.findOne({_id: Router.current().params._id});
		var abono = pagos.findOne({transaction_id: Router.current().params.transaction_id, pagado: false});
		if(!abono){
			return false;
		}
		/*if(conejita.aproved === true){
			return false;
		}*/
		return true;
	},
	pagado: function(){
		var pago = pagos.findOne({transaction_id: Router.current().params.transaction_id});
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
	'click .pagar': function (e) {
		e.preventDefault();
		$('.formulario').hide();
		Blaze.render(Template.khipuButton, document.getElementsByClassName("khbutton")[0]);
		//UI.insert(UI.render(Template.khipuButton), document.getElementsByClassName("khbutton")[0]);
		//UI.insert(UI.render(Template.khipuButton), document.getElementsByClassName("khbutton")[0]);
	}
});