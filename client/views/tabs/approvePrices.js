Template.approvePrices.events({
    'click #aprobar': function(){
        Meteor.call('approvePrice', Router.current().param()._id, function(){
            Router.go('unapprovedPrices');
        });
    },
    'click #desaprobar': function(){
        Meteor.call('unapprovePrice', Router.current().param()._id, function(){
            Router.go('unapprovedPrices');
        });
    }
});

Template.approvePrices.helpers({
    conejita: function(){
        return orion.entities.conejitas.collection.findOne(Router.current().param()._id);
    }
})