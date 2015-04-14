/**
 * This cron disables and undo finished special offers (Executed everyday)
 * Este cron deshabilita y deshase las ofertas especiales terminadas. (Ejecutado todos los días)
 **/

var expireOffers = function(){
    var conejitas = orion.entities.conejitas.collection.find({approvedPrice: true}).fetch();
    var currentDate = new Date();

    for(var i = 0; i<conejitas.length; i++){
        if(conejitas[i].offerEnd == currentDate || conejitas[i].offerEnd < currentDate){
            var oldPrice = conejita[i].price;
            var newPrice = conejita[i].tempPrice;
            orion.entities.conejitas.collection.update(conejitas[i]._id, {$set: {approvedPrice: null, price: newPrice, tempPrice: oldPrice, offerEnd: null }});
        }
    }
}

var cron = new Meteor.Cron({
    events:{
        "0 0 * * *"  : expireOffers
    }
});