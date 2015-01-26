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


});