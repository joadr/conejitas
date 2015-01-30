if(Meteor.isServer){
	Meteor.methods({
		// Check if the receiver is ready.
		khipu_check_cobrador_state: function(){
			var data = {
				receiver_id : khipu.config.receiver_id
			}

			var response = Meteor.call('khipu_do_call_json', 'receiverStatus', data);
			return response;
		},

		// Get available banks list
		khipu_get_banks: function(){
			var data = {
				receiver_id : khipu.config.receiver_id
			}

			var response = Meteor.call('khipu_do_call_json', 'receiverBanks', data);
			return response;
		},

		// Tell khipu that they're going to receive a payment (with the needed data)
		khipu_get_new_payment: function(email, bankId, amount, transaction_id){

			transaction_id = typeof transaction_id !== 'undefined' ? transaction_id : Math.random().toString(36).substring(7).toLowerCase();

			// Defaults:
			var return_url = typeof khipu.config.return_url !== 'undefined' ? khipu.config.return_url : process.env.ROOT_URL+'khipu/return';
			var cancel_url = typeof khipu.config.cancel_url !== 'undefined' ? khipu.config.cancel_url : process.env.ROOT_URL+'khipu/cancel';

			var data = {
				receiver_id: khipu.config.receiver_id,
				subject: 'ejemplo de un pago khipu usando meteor',
				body: 'Este es un pago de pruebas para usar la biblioteca khipu meteor',
				amount: amount,
				payer_email: email,
				bank_id: 'Bawdf',
				expires_date: '',
				transaction_id: transaction_id,
				custom: email,
				notify_url: '',
				return_url: return_url,
				cancel_url: cancel_url,
				picture_url: '',
			}

			var response = Meteor.call('khipu_do_call_json', 'createPaymentURL', data);
			if(response && typeof response.error == "undefined"){
				response = JSON.parse(response);
				data.khipu_id = response.id;
				data.bill_id = response['bill-id'];
				data.url = response.url;
				data.manual_url = response['manual-url'];
				data.mobile_url = response['mobile-url'];
				data.ready_for_terminal = response['ready-for-terminal'];
				data.payed = 'false';

				var payment = khipu.payments.insert(data);

				var respuesta = {
					"id": data.khipu_id,
					"bill-id": data.bill_id,
					"url": data.url,
					"manual_url": response['manual-url'],
					"mobile_url": response['mobile-url'],
					//"ready-for-terminal": response['ready-for-terminal']
					"ready-for-terminal": true
				}
				return respuesta;
			} else {
				return false;
			}
		},

		// Receive the payment confirmation and check if it's correct (returns object)
		khipu_verify_payment_notification: function(data){
			var newData = {
				receiver_id: khipu.config.receiver_id,
				notification_token: data.notification_token
			};

			var response = Meteor.call('khipu_do_call_json', 'getPaymentNotification', newData);

			if(response.notification_token != newData.notification_token || response.receiver_id != newData.receiver_id){
				return false;
			}

			var transaction = khipu.payments.findOne({transaction_id: response.transaction_id});

			if(transaction.amount == response.amount){
				khipu.payments.update(transaction._id, { $set: {payed: true} });
				return transaction_id;
			} else {
				return false;
			}
		},

		update_payment_notification_url: function(url){

			url = typeof url !== 'undefined' ? url : process.env.ROOT_URL+'khipu/receive/';

			var data = {
				receiver_id: khipu.config.receiver_id,
				url: url,
				api_version: '1.3'
			};

			return Meteor.call('khipu_do_call_json', 'updatePaymentNotificationUrl', data);
		},

		// Send Khipu a HTTP Request
		khipu_do_call_json: function(url, data, doHash){
			// Hash requested by default
			doHash = typeof doHash !== 'undefined' ? doHash : true;

			// Data is serialized this way (receiver_id=1234&amount=1&...)
			var serialized = Meteor.call('serialize', data);

			// Hash is calculated with the serialized data and the secret key (only if requested)
			if(doHash){
				var hash = CryptoJS.HmacSHA256(serialized, khipu.config.secret).toString();
				// the hash is now sent with the data
				data.hash = hash;
			}


			this.unblock();
			// We call the ...
			try{
				var result = HTTP.call('POST', khipu.config.url+url, 
					{data: data});
				return result.content;
			} catch(e){
				return false;
			}
		},

		// Added function to serialize an object
		serialize: function(obj){
			var str = "";
			for (var key in obj) {
			    if (str != "") {
			        str += "&";
			    }
			    str += key + "=" + obj[key];
			}
			return str;
		}
	});
}

Meteor.publish('khipuPayments', function(){
	return khipu.payments.find();
});