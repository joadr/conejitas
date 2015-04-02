Template.layoutMobile.helpers({
    country: function () {
        return Session.get('countryName');
    },
    city: function(){
        return Session.get('cityName');
    }
});