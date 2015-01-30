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

			var transaction_id = Meteor.call('khipu_verify_payment_notification', data);
			if(transaction_id){
				// Do something with the transaction
				this.response.end(transaction_id+"\n");
			} else {
				this.response.end("Transaction failed"+"\n");
			}
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