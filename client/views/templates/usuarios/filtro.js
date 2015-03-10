Meteor.methods({
	correspondingCities: function () {
		var cities = orion.entities.cities.collection.find({enabled: true, country: $('select[name=pais]').val()}).fetch();
		var html = "";
		for(var i=0; i< cities.length; i++){
			html += '<option value="'+cities[i]._id+'">'+cities[i].name+'</option>';
		}
		$('select[name=ciudad]').html(html);
	}
});

Template.filtro.events({
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
		Router.go('/');
	}
});