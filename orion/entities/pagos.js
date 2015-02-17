pagos = new Mongo.Collection("pagos");

if(Meteor.isServer){
	return pagos.find();
}