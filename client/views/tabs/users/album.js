Template.album.helpers({
	conejitas: function () {

		function inArray(needle, haystack) {
			if( typeof haystack == "undefined" ){
				return false;
			}
		    var length = haystack.length;
		    for(var i = 0; i < length; i++) {
		        if(haystack[i] == needle) return true;
		    }
		    return false;
		}

		var conejitas = orion.entities.conejitas.collection.find({aproved: true}).fetch();
		for(var i = 0; i<conejitas.length; i++) {
		    if(inArray(conejitas[i]._id, Meteor.user().visitedConejitas)){
		        conejitas[i].vista = true;
		    } else {
		        conejitas[i].vista = false;
		    }
		}
		return conejitas;
	}
});

Template.album.events({
	'submit .unlockConejita': function (e) {
		e.preventDefault();
		var evaluationCode = $('input[name=evaluationCode]').val();
		var conejita = orion.entities.conejitas.collection.findOne({evaluationCode: evaluationCode});
		if(conejita.length == 0){
			return;
		} else {
			Meteor.call('unlockConejita', conejita._id);
			Router.go('album');
		}
	}
});