/* Aprobar precio de ofertas especiales */
Meteor.methods({
    approvePrice: function(idConejita){
        // Must be logged in to approve
        if(!Meteor.userId()){
            return false;
        }

        var conejita = orion.entities.conejitas.collection.findOne(idConejita);
        // a conejita must exist
        if(!conejita){
            return false;
        }
        // the ending date must me newer than current date
        var currentDate = new Date();
        if(conejita.priceEnd < currentDate){
            return false;
        }

        // Procedure to approve offer
        var oldPrice = conejita.price;
        var newPrice = conejita.tempPrice;
        orion.entities.conejitas.collection.update(conejita._id, {$set: {price: newPrice, tempPrice: oldPrice, approvedPrice: true}});

    },
    // Same thing but to unapprove an offer
    unapprovePrice: function(idConejita){
        // Must be logged in to approve
        if(!Meteor.userId()){
            return false;
        }

        var conejita = orion.entities.conejitas.collection.findOne(idConejita);
        // a conejita must exist
        if(!conejita){
            return false;
        }
        // the ending date must me newer than current date
        var currentDate = new Date();
        if(conejita.priceEnd < currentDate){
            return false;
        }

        // Procedure to unapprove offer
        orion.entities.conejitas.collection.update(conejita._id, {$set: {approvedPrice: null}}); //is set to null not false on prupourse

    },
    makeOffer: function(idConejita, newPrice, offerEnd){
        // Must be logged in to approve
        if(!Meteor.userId()){
            return false;
        }

        var conejita = orion.entities.conejitas.collection.findOne(idConejita);
        // a conejita must exist
        if(!conejita){
            return false;
        }
        // the ending date must me newer than current date
        var currentDate = new Date();
        if(offerEnd < currentDate){
            return false;
        }

        // Procedure to create new offer
        orion.entities.conejitas.collection.update(conejita._id, {$set: {approvedPrice: false, tempPrice: newPrice, offerEnd: offerEnd}}); //is set to false not null on prupourse
    }
});