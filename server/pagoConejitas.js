// Funciones de servidor relacionadas con el pago de las conejitas
Meteor.methods({
	calcularPago: function (conejita_id) {
		var conejita = orion.entities.conejitas.collection.findOne({_id: conejita_id});
		var pago = 0;
		switch(conejita.plan) {
		    case "plan1":
		        switch(conejita.opcion){
		        	case "opcion1":
		        		pago = orion.dictionary.get('plan1opcion1', '50000');
		        		break;
		        	case "opcion2":
		        		pago = orion.dictionary.get('plan1opcion2', '75000');
		        		break;
		        	case "opcion3":
		        		pago = orion.dictionary.get('plan1opcion3', '200000');
		        		break;
		        	case "opcion4":
		        		pago = orion.dictionary.get('plan1opcion4', '350000');
		        		break;
		        	case "opcion5":
		        		pago = orion.dictionary.get('plan1opcion5', '650000');
		        		break;
		        }
		        break;
		    case "plan2":
		        switch(conejita.opcion){
		        	case "opcion1":
		        		pago = orion.dictionary.get('plan2opcion1', '100000');
		        		break;
		        	case "opcion2":
		        		pago = orion.dictionary.get('plan2opcion2', '250000');
		        		break;
		        	case "opcion3":
		        		pago = orion.dictionary.get('plan2opcion3', '450000');
		        		break;
		        	case "opcion4":
		        		pago = orion.dictionary.get('plan2opcion4', '800000');
		        		break;
		        }
		        break;
		    default:
		        pago = orion.dictionary.get('plan1opcion1', '50000');
		        break;
		}
		return pago;
	},
	generarPago: function(conejita_id){
		var conejita = orion.entities.conejitas.collection.findOne({_id: conejita_id});
		var transaction_id = Math.random().toString(36).substring(7).toLowerCase();
		var fecha = new Date();
		fecha = fecha.toJSON();

		var data = {
			conejita: conejita._id,
			transaction_id: transaction_id,
			monto: Meteor.call('calcularPago', conejita_id),
			pagado: false,
			fecha_generacion: fecha
		};
		pagos.insert(data);
		return transaction_id;
	},
	pagar: function(transaction_id, bank_id){
		var pago = pagos.findOne({transaction_id: transaction_id, pagado: false});
		var conejita = orion.entities.conejitas.collection.findOne({_id: pago.conejita});

		var retorno = Meteor.call('khipu_get_new_payment', conejita.email, bank_id, pago.monto, "Pago suscripción conejitas", "", transaction_id);
		//Session.set("payReady", true);
		//console.log(retorno[0]);
		return retorno;
	}
});