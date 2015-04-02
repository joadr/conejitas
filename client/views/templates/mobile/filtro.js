Template.filtroMobile.events({
    'change .paiss': function () {
        Meteor.call('correspondingCities');

    },
    'submit .contacto': function(e){
        e.preventDefault();
        var city = orion.entities.cities.collection.findOne({_id: $('select[name=ciudad]').val()});
        var country = orion.entities.countries.collection.findOne({_id: city.country });

        Session.set('city', city._id);
        Session.set('cityName', city.name);
        Session.set('countryName', country.name);
        Router.go('/mobile');
    }
});