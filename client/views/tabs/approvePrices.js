Template.approvePrices.events({
    'click #aprobar': function(){
        Meteor.call('approvePrice', Router.current().params._id, function(){
            Router.go('unapprovedPrices');
        });
    },
    'click #desaprobar': function(){
        Meteor.call('unapprovePrice', Router.current().params._id, function(){
            Router.go('unapprovedPrices');
        });
    }
});

Template.approvePrices.helpers({
    conejita: function(){
        return orion.entities.conejitas.collection.findOne(Router.current().params._id);
    }
})