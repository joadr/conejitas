if(Meteor.isServer){
	Meteor.methods({

		// Check if the receiver is ready.
		khipu_check_Cobrador_State: function(){
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
		khipu_get_new_payment: function(email, bankId, amount){
			var data = {
				receiver_id: khipu.config.receiver_id,
				subject: 'ejemplo de un pago khipu usando meteor',
				body: 'Este es un pago de pruebas para usar la biblioteca khipu',
				amount: amount,
				notify_url: khipu.config.notify_url,
				return_url: khipu.config.return_url,
				cancel_url: '',
				transaction_id: 'demo-meteor-transaction-1',
				payer_email: email,
				expires_date: '',
				bankId: bankId,
				picture_url: '',
				custom: email,
			}

			var response = Meteor.call('khipu_do_call_json', 'createPaymentURL', data);
			console.log(response);
		},

		// Send Khipu a HTTP Request
		khipu_do_call_json: function(url, data){
			// Data is serialized this way (receiver_id=1234&amount=1&...)
			var serialized = Meteor.call('serialize', data);
			// Hash is calculated with the serialized data and the secret key
			var hash = CryptoJS.HmacSHA256(serialized, khipu.config.secret).toString();
			// the hash is now sent with the data
			data.hash = hash;
			this.unblock();
			// We call the 
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
			    return str += key + "=" + encodeURIComponent(obj[key]);
			}
		}
	});
}
