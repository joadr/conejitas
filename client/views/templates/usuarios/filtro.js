Meteor.methods({
	correspondingCities: function () {
		var cities = [];
		for(var i=0; i< this.cities().length; i++){
			if(this.cities()[i].country == $('select[name=pais]').val()){
				cities.push({value: this.cities()[i]._id, label: this.cities()[i].name});
			}
		}

		var html = "";
		for(var i=0; i< cities.length; i++){
			html += '<option value="'+cities[i].value+'">'+cities[i].label+'</option>';
		}
		$('select[name=ciudad]').html(html);
	}
});

Template.filtro.events({
	'change .paiss': function () {
		Meteor.call('correspondingCities');

	}
});