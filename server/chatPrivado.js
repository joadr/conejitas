Meteor.methods({
   crearChatPrivado: function(conejitaId){
       if(Meteor.userId() && Meteor.call('puedeChatear')){
           var chat = chatsPrivados.insert({ usuario: Meteor.userId(), conejita: conejitaId, accepted: null, invitationDate: new Date() });
           return chat;
       }
       return false;
   },
    puedeChatear: function(){
        if(Meteor.userId()){
            if(Meteor.user().tokens && (Meteor.user().tokens > 120)){
                return true;
            }
            return false;
        }
    },
    finChat: function(chatId){
        var chat = chatsPrivados.findOne(chatId);
        if(Meteor.user().registrationType == "conejita"){
            var conejita = orion.entities.conejitas.collection.findOne({userId: Meteor.userId()});
            if(chat.conejita != conejita._id){
                return false;
            }
        } else {
            if(chat.usuario != Meteor.userId()){
                return false;
            }
        }
        chatsPrivados.update(chat._id, {$set: {fin: new Date()}});
        // Le quitamos los tokens al usuario:
        var user = Meteor.users.findOne(chat.usuario);
        var tokens = user.tokens;
        var tiempo = parseInt((chat.fin - chat.inicio)/1000);
        var newTokens = tokens - 2*tiempo;
        Meteor.users.update(chat.usuario, {$set: {tokens: newTokens}});
        return true;
    }
});