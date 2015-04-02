Template.layout.helpers({
	country: function () {
		return Session.get('countryName');
	},
	city: function(){
		return Session.get('cityName');
	}
});

Template.layout.events({
   'submit #header': function(e){
       e.preventDefault();

       var trimInput = function(val) {
           return val.replace(/^\s*|\s*$/g, "");
       };

       var email = trimInput($('input[name=usuario]').val());
       var password = $('input[name=pass]').val();

       Meteor.loginWithPassword({ email: email }, password, function(e){
           if(e){
               $('.message').html("Usuario y/o contraseña incorrectos");
               return false;
           } else {
               Router.go('panelConejitas');
           }
       });
       return false;
   }
});