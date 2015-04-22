Router.map(function() {

    this.route('test', {
        path: '/test',
        layoutTemplate: 'layout'
    });

    // filtro de país y ciudad
    this.route('filtro', {
      path: '/filtro',
      waitOn: function() {
        return [orion.subs.subscribe('entity', 'countries'),
        orion.subs.subscribe('entity', 'cities')]
      },
      data: function() {
            return {
                countries: function() {
                    var countries = orion.entities.countries.collection.find({enabled: true}).fetch();
                    return countries;
                }
            }
        }
    });

    // Home del sitio
    this.route('conejitas', {
      path: '/',
      layoutTemplate: 'layout',
      onBeforeAction: function() {
        if(Session.get("city") == undefined){
            Router.go("/filtro");
        } else {
            this.next();
        }
      },
      waitOn: function() {
        return [orion.subs.subscribe('entity', 'conejitas')]
      },
      data: function() {
            return {
                conejitas: function() {
                    var conejitas = shuffles(orion.entities.conejitas.collection.find({aproved: true, workCity: Session.get("city")}, {limit:4}).fetch());
                    for(var i = 0; i<conejitas.length; i++) {
                        if((i+1) % 2 == 0){
                            conejitas[i].par = true;
                        } else {
                            conejitas[i].par = false;
                        }
                    }
                    return conejitas;
                }
            }
        }
    });

    // Ver una determinada conejita
    this.route('conejita', {
        path: '/conejita/:_id',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [orion.subs.subscribe('entity', 'conejitas'),
            orion.subs.subscribe('entity', 'services'),
            Meteor.subscribe('evaluations')]
        }
    });

    // ver conejitas de una categoría en específico
    this.route('categories', {
        path: '/categories/:name',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [orion.subs.subscribe('entity', 'conejitas')]
        },
        data: function() {
            category = orion.entities.categories.collection.findOne({searchable: reemplazartildes(this.params.name.toLowerCase())});
            return category;
        }
    });

    // si visitan el link categories
    this.route('categoriess', {
        path: '/categories',
        onBeforeAction: function() {
            Router.go('conejitas');
        }
    });

    // Conejitas en vivo
    this.route('vivo', {
        path: '/vivo',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [orion.subs.subscribe('entity', 'conejitas')]
        },
    });

    // Aliados
    this.route('aliados', {
        path: '/aliados',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [orion.subs.subscribe('entity', 'aliados')]
        }
    });

    // Ofertas especiales
    this.route('ofertasEspeciales', {
        path: '/ofertasespeciales',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [orion.subs.subscribe('entity', 'aliados'), orion.subs.subscribe('entity', 'conejitas')]
        }
    });

    /**
    * Procedimiento de Quiero ser conejita
    */
    this.route('registroConejita', {
        path: '/unirme',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [//orion.subs.subscribe('entity', 'conejitas'),
            orion.subs.subscribe('entity', 'services')]
        }
    });

    this.route('registro2', {
        path: '/unirme2',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [orion.subs.subscribe('entity', 'conejitas'),
            orion.subs.subscribe('entity', 'services'),
            orion.subs.subscribe('entity', 'categories'),
            orion.subs.subscribe('entity', 'countries'),
            orion.subs.subscribe('entity', 'cities')]
        }
    });

    /**
    * Procedimiento de pago conejitas
    */
    this.route('pagoConejitas', {
        path: '/conejita/pagar/:_id/:transaction_id',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [orion.subs.subscribe('entity', 'conejitas'),
            Meteor.subscribe('khipuPayments'), Meteor.subscribe('khipuPayments'), Meteor.subscribe("pagos", this.params.transaction_id)]
        }
    });

    /**
    * Procedimiento registro usuarios.
    */
    this.route('registroUsuarios', {
        path: '/usuarios/registrarme',
        layoutTemplate: 'layout'
    });

    /**
    * Procedimiento inicio sesión usuarios.
    */
    this.route('loginUsuarios', {
        path: '/usuarios/login',
        layoutTemplate: 'layout',
        onAfterRun: function() {
            document.title = "Regístro usuarios";
        }
    });

    /**
    * Procedimiento Album.
    */
    this.route('album', {
        path: '/usuarios/album',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [Meteor.subscribe("visitedConejitas"), orion.subs.subscribe('entity', 'conejitas'), Meteor.subscribe("getUserRole")]
        },
        onBeforeAction: function() {
            if(Meteor.user() == null || Meteor.user().registrationType != "usuarios" ){
                Router.go('conejitas');
            } else {
                this.next();
            }
        }
    });

    /**
    * Formulario de contacto
    */
    this.route('contacto', {
        path: '/contacto',
        layoutTemplate: 'layout'
    });

    /**
    * Public chat user and conejitas respectively
    */
    this.route('publicChat', {
        path: '/chat/public/:_id',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [orion.subs.subscribe('entity', 'conejitas'), Meteor.subscribe('getUserRole'), Meteor.subscribe('myChatsPrivados'), Meteor.subscribe('userPresence', this.params._id)]
        },
        onBeforeAction: function() {
            if(Meteor.user() == null || Meteor.user().registrationType != "usuarios" ){
                Router.go('loginUsuarios', {message: "Debes iniciar sesión para entrar en este lugar."});
            }

            var conejita = orion.entities.conejitas.collection.findOne({_id: this.params._id, online: true});
            if(!conejita){
                Router.go('conejitas');
            }

            /** Chat related **/
            Session.set('chapp-username', Meteor.user().username);
            Session.set('chapp-docid', conejita._id);

            Session.set('private', false);

            this.next();
        },
        onAfterAction: function(){
            Tracker.autorun(function () {
                var personas = Presences.find({ "state.currentRoomId": Session.get('chapp-docid')}).fetch();
                var conejita  = orion.entities.conejitas.collection.findOne({_id: Session.get('chapp-docid')});
                var count = 0;
                for(var i = 0; i<personas.length; i++) {
                    if(personas[i].userId == conejita.userId){
                        count++;
                    }
                }

                if (count == 0){
                    $('.video').hide();
                    //$('.out').show();
                } else {
                    $('.video').show();
                }

            });
        },
        data: function(){
            return {
                roomusers: Presences.find({ "state.currentRoomId": Session.get('chapp-docid')})
            }
        },
        unload: function(){
            Session.set('chapp-docid', null);
        }
    });

    this.route('publicChatConejitas', {
        path: '/chat/conejitas/public/:_id',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [orion.subs.subscribe('entity', 'conejitas'), Meteor.subscribe('getUserRole'), Meteor.subscribe('myChatsPrivadosConejitas')]
        },
        onBeforeAction: function() {
            if(Meteor.user() == null || Meteor.user().registrationType != "conejitas" ){
                return Router.go('loginUsuarios', {message: "Debes iniciar sesión para entrar en este lugar."});
            }

            var conejita = orion.entities.conejitas.collection.findOne({_id: this.params._id});
            if(!conejita){
                return Router.go('conejitas');
            }

            if(conejita.userId != Meteor.userId()){
                return router.go('conejitas');
            }

            Meteor.call('onlineConejita', conejita._id);

            // chat related
            Session.set('chapp-username', conejita.name);
            Session.set('chapp-docid', conejita._id);
            Session.set('chapp-master', conejita.name);

            Session.set('private', false);

            this.next();
        },
        onAfterAction: function(){
            Tracker.autorun(function () {
                var chat = chatsPrivados.findOne({conejita: Router.current().params._id, accepted: null});
                if (!chat){
                    return;
                }
                Session.set('solicitud', {solicitante: chat.usuario, chat: chat._id});
                $('.solicitudChat').bPopup();
                //Router.go('privateChatConejitas', {_id: chat.conejita, _uid: Meteor.userId()});
            });
        },
        data: function(){
            return {
                roomusers: Presences.find({ "state.currentRoomId": Session.get('chapp-docid')})
            }
        },
        unload: function(){
            window.localStream.stop();
            Meteor.call('offlineConejita', this.params._id);
        }
    });

    /**
     * Private chats users and conejitas respectively
     */
    this.route('privateChat', {
        path: '/chat/private/:_id/:_uid',
        layoutTemplate: 'layout',
        template: 'publicChat',
        waitOn: function() {
            return [orion.subs.subscribe('entity', 'conejitas'), Meteor.subscribe('myChatsPrivados'), Meteor.subscribe('getUserRole')]
        },
        onBeforeAction: function() {
            if(Meteor.user() == null || Meteor.user().registrationType != "usuarios" || this.params._uid != Meteor.userId() ){
                Router.go('loginUsuarios', {message: "Debes iniciar sesión para entrar en este lugar."});
            }

            var conejita = orion.entities.conejitas.collection.findOne({_id: this.params._id, online: true});
            if(!conejita){
                Router.go('conejitas');
            }

            /** Chat related **/
            Session.set('chapp-username', Meteor.user().username);
            Session.set('chapp-docid', Meteor.userId() + conejita._id);
            Session.set('private', true);
            /*Tracker.autorun(function () {
                var personas = Presences.find({ "state.currentRoomId": Session.get('chapp-docid')}).fetch();
                if(personas.length > 2){
                    Router.go('publicChat', {_id: this.params._id});
                }
            }*/

            this.next();
        },
        onAfterAction: function(){
            Tracker.autorun(function () {
                var personas = Presences.find({ "state.currentRoomId": Session.get('chapp-docid')}).fetch();
                var conejita = orion.entities.conejitas.collection.findOne({_id: Router.current().params._id});
                var count = 0;
                for(var i = 0; i<personas.length; i++) {
                    if(personas[i].userId == conejita.userId){
                        count++;
                    }
                }

                if (count == 0){
                    $('.video').hide();
                    //$('.out').show();
                } else {
                    $('.video').show();
                }

            });
        },
        data: function(){
            return {
                roomusers: Presences.find({ "state.currentRoomId": Session.get('chapp-docid')})
            }
        },
        unload: function(){
            Meteor.call('finChat', Session.get('chatId'), function(error, response){
                Session.set('chatId', null);
            });
        }
    });

    this.route('privateChatConejitas', {
        path: '/chat/conejitas/private/:_id/:_uid',
        layoutTemplate: 'layout',
        template: 'publicChatConejitas',
        waitOn: function() {
            return [orion.subs.subscribe('entity', 'conejitas'), Meteor.subscribe('myChatsPrivadosConejitas'), Meteor.subscribe('getUserRole')]
        },
        onBeforeAction: function() {
            if(Meteor.user() == null || Meteor.user().registrationType != "conejitas" ){
                return Router.go('loginUsuarios', {message: "Debes iniciar sesión para entrar en este lugar."});
            }

            var conejita = orion.entities.conejitas.collection.findOne({_id: this.params._id});
            if(!conejita){
                return Router.go('conejitas');
            }

            if(conejita.userId != Meteor.userId()){
             return router.go('conejitas');
             }

            Meteor.call('onlineConejita', conejita._id);

            // chat related
            Session.set('chapp-username', conejita.name);
            Session.set('chapp-docid', this.params._uid+conejita._id);
            Session.set('chapp-master', conejita.name);

            Session.set('private', true);

            this.next();
        },
        data: function(){
            return {
                roomusers: Presences.find({ "state.currentRoomId": Session.get('chapp-docid')})
            }
        },
        unload: function(){
            window.localStream.stop();
            Meteor.call('finChat', Session.get('chatId'), function(error, response){
                Session.set('chatId', null);
            });
            Meteor.call('offlineConejita', this.params._id);
        }
    });

    /**
     * Panel de control Conejitas
     */
    this.route('panelConejitas', {
        path: '/panelConejitas',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [orion.subs.subscribe('entity', 'conejitas'), orion.subs.subscribe('entity', 'cities'), orion.subs.subscribe('entity', 'countries'), Meteor.subscribe("getUserRole")]
        },
        onBeforeAction: function() {
            if(Meteor.user() == null || Meteor.user().registrationType != "conejitas" ){
                Router.go('conejitas');
            } else {
                this.next();
            }
        },
        data : function(){
            return {
                conejita: orion.entities.conejitas.collection.findOne({userId: Meteor.userId()})
            }
        }
    });

});

// Cambiar título
var setFavIco = function() {
    if (!Meteor.isClient) {
        return;
    }
    SEO.set({
        title: 'Club Conejitas'
    });
}

Router.onAfterAction(setFavIco, {
except: ['admin', 'adminDictionaryUpdate', 'adminEntitiesIndex', 'adminEntitiesCreate', 'adminEntitiesUpdate', 'adminEntitiesDelete']
})