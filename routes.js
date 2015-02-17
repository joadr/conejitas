Router.map(function() {

    this.route('conejitas', {
      path: '/',
      layoutTemplate: 'layout',
      waitOn: function() {
        return [orion.subs.subscribe('dictionary'),
        orion.subs.subscribe('entity', 'conejitas')]
      },
      data: function() {
            return {
                conejitas: function() {
                    var conejitas = shuffles(orion.entities.conejitas.collection.find({aproved: true}, {limit:4}).fetch());
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

    this.route('conejita', {
        path: '/conejita/:_id',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [orion.subs.subscribe('dictionary'),
            orion.subs.subscribe('entity', 'conejitas'),
            orion.subs.subscribe('entity', 'services'),
            Meteor.subscribe('evaluations')]
        },
    });

    this.route('categories', {
        path: '/categories/:name',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [orion.subs.subscribe('dictionary'),
            orion.subs.subscribe('entity', 'conejitas')]
        },
        data: function() {
            category = orion.entities.categories.collection.findOne({searchable: reemplazartildes(this.params.name.toLowerCase())});
            return category;
        }
    });

    this.route('categoriess', {
        path: '/categories',
        onBeforeAction: function() {
            Router.go('conejitas');
        }
    });

    this.route('vivo', {
        path: '/vivo',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [orion.subs.subscribe('dictionary'),
            orion.subs.subscribe('entity', 'conejitas')]
        },
    });

    this.route('aliados', {
        path: '/aliados',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [orion.subs.subscribe('dictionary'),
            orion.subs.subscribe('entity', 'aliados')]
        }
    });

    /**
    * Procedimiento de Quiero ser conejita
    */
    this.route('registroConejita', {
        path: '/unirme',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [orion.subs.subscribe('dictionary'),
            //orion.subs.subscribe('entity', 'conejitas'),
            orion.subs.subscribe('entity', 'services')]
        },
        onAfterRun: function() {
            document.title = "Quiero ser conejita";
        }
    });

    this.route('registro2', {
        path: '/unirme2',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [orion.subs.subscribe('dictionary'),
            orion.subs.subscribe('entity', 'conejitas'),
            orion.subs.subscribe('entity', 'services')]
        },
        onAfterRun: function() {
            document.title = "Quiero ser conejita";
        }
    });

    /**
    * Procedimiento de pago conejitas
    */
    this.route('pagoConejitas', {
        path: '/conejita/pagar/:_id/:transaction_id',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [orion.subs.subscribe('dictionary'),
            orion.subs.subscribe('entity', 'conejitas'),
            orion.subs.subscribe('entity', 'khipuPayments')]
        },
        onAfterRun: function() {
            document.title = "Quiero ser conejita";
        }
    });

    /**
    * Procedimiento registro usuarios.
    */
    this.route('registroUsuarios', {
        path: '/usuarios/registrarme',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [orion.subs.subscribe('dictionary')]
        },
        onAfterRun: function() {
            document.title = "Regístro usuarios";
        }
    });

    /**
    * Procedimiento inicio sesión usuarios.
    */
    this.route('loginUsuarios', {
        path: '/usuarios/login',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [orion.subs.subscribe('dictionary')]
        },
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
            return [orion.subs.subscribe('dictionary'), Meteor.subscribe("visitedConejitas"), orion.subs.subscribe('entity', 'conejitas')]
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
        layoutTemplate: 'layout',
        waitOn: function() {
            return orion.subs.subscribe('dictionary')
        }
    });

    /**
    * Chat Routes for users
    */
    this.route('publicChat', {
        path: '/chat/public/:_id',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [orion.subs.subscribe('dictionary'), orion.subs.subscribe('entity', 'conejitas'), Meteor.subscribe('userPresence', this.params._id)]
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

            /** Video related **/
            // crear instancia de usuario
            /*var peer = new Peer(Meteor.userId(), {key: '2eflxenknki3haor'});

            // Llamamos a la conejita
            var conn = peer.connect(conejita._id);

            peer.on('call', function(call) {
                call.answer(null);
                call.on('stream', function(remoteStream) {
                  // Show stream in some <video> element.
                  $('.video').prop('src', URL.createObjectURL(remoteStream));
                });
            });*/
            /*var call = peer.call(conejita._id, null);
            call.on('stream', function(remoteStream) {
                // Show stream in some <video> element.
                $('.video').prop('src', URL.createObjectURL(remoteStream));
            });*/

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
                    $('.webcam').find('video').hide();
                    $('.out').show();
                } else {
                    if($('.out').is(":visible")){
                        setTimeout(
                            function() {
                                var conejita = orion.entities.conejitas.collection.findOne({_id: Router.current().params._id, online: true});
                                var peer = new Peer(Meteor.userId(), {key: '2eflxenknki3haor', debug:true});
                                // Llamamos a la conejita
                                var conn = peer.connect(conejita._id);

                                peer.on('call', function(call) {
                                    call.answer(null);
                                    call.on('stream', function(remoteStream) {
                                      // Show stream in some <video> element.
                                      $('.video').prop('src', URL.createObjectURL(remoteStream));
                                      $('.out').hide();
                                      $('.webcam').find('video').show();
                                    });
                                });
                            }
                        , 5000);
                        
                    }
                }

            });
        },
        data: function(){
            return {
                roomusers: Presences.find({ "state.currentRoomId": Session.get('chapp-docid')})
            }
        }
    });

    /**
    * Chat for conejitas
    */
    this.route('publicChatConejitas', {
        path: '/chat/conejitas/public/:_id',
        layoutTemplate: 'layout',
        waitOn: function() {
            return [orion.subs.subscribe('dictionary'), orion.subs.subscribe('entity', 'conejitas'), Meteor.subscribe('userPresence', this.params._id)]
        },
        onBeforeAction: function() {
            /*if(Meteor.user() == null || Meteor.user().registrationType != "conejitas" ){
                return Router.go('loginUsuarios', {message: "Debes iniciar sesión para entrar en este lugar."});
            }*/

            var conejita = orion.entities.conejitas.collection.findOne({_id: this.params._id});
            if(!conejita){
                return Router.go('conejitas');
            }

            /*if(conejita.userId != Meteor.userId()){
                return router.go('conejitas');
            }*/

            Meteor.call('onlineConejita', conejita._id);

            // chat related
            Session.set('chapp-username', conejita.name);
            Session.set('chapp-docid', conejita._id);
            Session.set('chapp-master', conejita.name);

            // video related
            /*var peer = new Peer(conejita._id, {key: '2eflxenknki3haor'});
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            navigator.getUserMedia({video: true}, function(stream) {
                $('.video').prop('src', URL.createObjectURL(stream));
                window.localStream = stream;
            }, function(err) {
                console.log('Failed to get local stream' ,err);
            });

            peer.on('connection', function(conn) {
                conn.on( 'open', function() {
                    var call = peer.call(conn.peer, window.localStream);
                });
            });*/

            /*navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            peer.on('call', function(call) {
              navigator.getUserMedia({video: true}, function(stream) {
                call.answer(stream); // Answer the call with an A/V stream.
                $('.video').prop('src', URL.createObjectURL(stream));
              }, function(err) {
                console.log('Failed to get local stream' ,err);
              });
            });*/
            this.next();
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