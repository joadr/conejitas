Router.map(function(){
	this.route('khipuButton', {
		path: '/testing',
		//where: 'server',
	});

	// Get khipu response
	this.route('serverFile', {
		path: '/khipu/receive/',
		where: 'server',

		action: function () {
			var data = {
				notification_token: this.request.body.notification_token
			};

			Meteor.call('khipu_verify_payment_notification', data, function(error, response){
				if(!error && response != false){
					var pago = pagos.findOne({ transaction_id: response });
					pagos.update(pago._id, {$set: {pagado: true}});
					if(pago.conejita){
						var pagosConejita = pagos.find({conejita: pago.conejita}).fetch();
						if(pagosConejita.length > 1){
							orion.entities.conejitas.collection.update(pago.conejita, {$set: {aproved: true}});
						} else {
							Meteor.call('primerPago', pago.conejita);
						}
					} else {
						Meteor.call('agregarTokens', response);
					}

				}
			});
			/*if(transaction_id){
				// Do something with the transaction
				this.response.end(transaction_id+"\n");
			} else {
				this.response.end("Transaction failed"+"\n");
			}*/
		}
	});

	// Testing prupouse only
	/*this.route('khipuButton', {
    	path: '/khipu/tester'
    });*/

	// The place where you return when the transaction is made. WARNING: Doesn't mean that the person payed, there must be a check before asuming that
    this.route('khipuReturn', {
    	path: '/khipu/return'
    });

    // The place where people gets when they cancel the operation.
    this.route('khipuCancel', {
    	path: '/khipu/cancel'
    });

    this.route('payments', {
    	path: '/khipu/payments',
    	waitOn: function () {
    		return Meteor.subscribe('khipuPayments');
    	}
    });
});