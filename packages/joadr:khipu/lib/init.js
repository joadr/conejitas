khipu = {};
khipu.config = {
	url: 'https://khipu.com/api/1.3/',
	receiver_id: '',
	secret: ''
}

khipu.config.return_url = "http://conejitas1.meteor.com/khipu/return";
khipu.config.cancel_url = "http://conejitas1.meteor.com/khipu/cancel";

khipu.payments = new Mongo.Collection("khipuPayments");

khipu.logs = new Mongo.Collection("khipuLogs");
