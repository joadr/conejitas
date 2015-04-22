Meteor.methods({
    updatePhoto: function(conejitaId, campo, image){
        conejita = orion.entities.conejitas.collection.findOne(conejitaId);
        if(Meteor.userId() != conejita.userId){
            return false;
        }
        var query = {};
        query[campo] = image;
        orion.entities.conejitas.collection.update(conejitaId, {$set: query});
        return true;
    },
    updateValues: function(conejitaId, query){
        conejita = orion.entities.conejitas.collection.findOne(conejitaId);
        if(Meteor.userId() != conejita.userId){
            return false;
        }

        orion.entities.conejitas.collection.update(conejitaId, {$set: query});
        return true;
    }
});