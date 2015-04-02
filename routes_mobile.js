Router.map(function() {
    // Country and City filter
    this.route('filtroMobile', {
        path: '/mobile/filtro',
        layoutTemplate: 'layoutMobile',
        waitOn: function () {
            return [orion.subs.subscribe('entity', 'countries'),
                orion.subs.subscribe('entity', 'cities')]
        },
        data: function () {
            return {
                countries: function () {
                    var countries = orion.entities.countries.collection.find({enabled: true}).fetch();
                    return countries;
                }
            }
        }
    });

    // Index
    this.route('indexMobile', {
        path: '/mobile',
        layoutTemplate: 'layoutMobile',
        onBeforeAction: function() {
            if(Session.get("city") == undefined){
                Router.go("/mobile/filtro");
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

    // Category's conejitas
    this.route('categoryMobile', {
        path: '/mobile/categories/:name',
        layoutTemplate: 'layoutMobile',
        waitOn: function() {
            return [orion.subs.subscribe('entity', 'conejitas')]
        },
        data: function() {
            category = orion.entities.categories.collection.findOne({searchable: reemplazartildes(this.params.name.toLowerCase())});
            return category;
        }
    });

    // Conejita's profile
    this.route('conejitaMobile', {
        path: '/mobile/conejita/:_id',
        layoutTemplate: 'layoutMobile',
        waitOn: function() {
            return [orion.subs.subscribe('entity', 'conejitas'),
                orion.subs.subscribe('entity', 'services'),
                orion.subs.subscribe('entity', 'countries')]
        }
    });

    // Contact Form
    this.route('contactoMobile', {
        path: '/mobile/contacto',
        layoutTemplate: 'layoutMobile'
    });

    


});
