Template.chapp_form.helpers({
    usuario: function(){
        if(Meteor.user().registrationType != "conejitas") {
            return true;
        } else {
            return false;
        }
    },
    private: function(){
        return Session.get('private');
    },
    nombre: function(){
        var conejita = orion.entities.conejitas.collection.findOne(Router.current().params._id);
        return conejita.name;
    },
    tiempo: function(){
        function pad(val) { return val > 9 ? val : "0" + val; }
        var chat = chatsPrivados.findOne(Session.get('chatId'));
        var current = new Date();
        var elapsed = current - chat.inicio;
        var seconds = pad(parseInt(elapsed/1000) % 60);
        var minutes = pad(parseInt((elapsed/1000) / 60, 10) % 60);
        var hours = pad(parseInt((elapsed/1000) / 3600, 10));
        Session.set('tiempo', hours + ':' + minutes + ':' + seconds);

        if(Meteor.user().registrationType != "conejita"){
            var tokens = Meteor.user().tokens;
            if (tokens <= parseInt((elapsed)/1000)*2){
                /*Meteor.call('finChat', Session.get('chatId'), function(error, response){
                    */Router.go('vivo');/*
                });*/
            }
        }
        return Session.get('tiempo');
    }
});

Template.chapp_form.onCreated(function () {
    // Use this.subscribe inside onCreated callback
    this.subscribe("userPresence", Session.get('chapp-docid'));
});

Template.chapp_form.events({
   'click .btn-private': function(event){
       event.preventDefault();
       $('.condiciones').bPopup();
   }
});

Template.terminos.helpers({
    tokens: function(){
        if(Meteor.user().tokens){
           return Meteor.user().tokens;
        } else {
           return 0;
        }
    },
    hayTokens: function(){
        if(Meteor.user().tokens && Meteor.user().tokens > 120){
            return true;
        } else {
            return false;
        }
    }
});

Template.chapp_form.rendered = function(){
    $('.usarTokens').on('click', function(){
        event.preventDefault();
        //console.log('called');
        $('.condiciones').bPopup().close();
        $('.solicitudEnviada').bPopup();
        Meteor.call('crearChatPrivado', Router.current().params._id, function(error, response){
            Tracker.autorun(function (c) {
                var chat = chatsPrivados.findOne({_id: response, accepted: true});
                if (!chat){
                    return;
                }

                c.stop();
                //$('.condiciones').bPopup().close();
                $('.solicitudEnviada').bPopup().close();
                Session.set('chatId', chat._id);
                Router.go('privateChat', {_id: chat.conejita, _uid: Meteor.userId()});
            });
        });
    });

    $('.aceptarInvitacion').on('click', function(event){
        event.preventDefault();
        var solicitud = Session.get('solicitud');

        chatsPrivados.update(solicitud.chat, {$set: {accepted: true, inicio: new Date(), fin: null}});
        $('.solicitudChat').bPopup().close();
        Session.set('chatId', solicitud.chat);
        Router.go('privateChatConejitas', {_uid: solicitud.solicitante, _id: Router.current().params._id});

    });
    $('.rechazarInvitacion').on('click', function(event){
        event.preventDefault();
        var solicitud = Session.get('solicitud');

        chatsPrivados.update(solicitud.chat, {$set: {accepted: false, inicio: null, fin: null}});
        $('.solicitudChat').bPopup().close();
        //Router.go('privateChatConejitas', {_uid: solicitud.solicitante, _id: Router.current().params._id});
    });

    $('.cerrar').on('click', function(event){
        event.preventDefault();
        $('.solicitudEnviada').bPopup().close();
    });

    $('.payKhipu').on('click', function(event) {
        event.preventDefault();
        $('.bancosKhipu').show();
    });

    $('.payKhipu2').on('click', function(event) {
        event.preventDefault();
        var cantidad = $("input[name=token]").val();
        var banco = $('select[name=banks]').val();
        Meteor.call('generarPagosTokens', cantidad, banco, function(error, response){
            if(!error){
                $('.bancosKhipu').hide();
                KhipuLib.onLoad({
                    elementId: 'pay-button',
                    data: response.data
                });
                $('.khbutton').show();
            }
        });
    });
}