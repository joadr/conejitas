Meteor.publish("myChatsPrivados", function(){
    if(Meteor.users.findOne(this.userId).registrationType != 'usuarios'){
        return false;
    }
    return chatsPrivados.find({usuario: this.userId});
});

Meteor.publish("myChatsPrivadosConejitas", function(){
    if(Meteor.users.findOne(this.userId).registrationType != 'conejitas'){
        return false;
    }
    var conejita = orion.entities.conejitas.collection.findOne({userId: this.userId});
    if(!conejita){
        return false;
    }
    return chatsPrivados.find({conejita: conejita._id});
});