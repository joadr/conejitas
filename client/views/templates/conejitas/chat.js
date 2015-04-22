var peer;

Template.publicChatConejitas.rendered = function () {
    var conejita = orion.entities.conejitas.collection.findOne({_id: Router.current().params._id});

    if (!peer) {
        peer = new Peer((new Mongo.ObjectID)._str, {key: '0um348nhmww2ke29', debug: true});
    }

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia({video: true}, function(stream) {
        $('.video').prop('src', URL.createObjectURL(stream));
        window.localStream = stream;

        Presences.find({ "state.currentRoomId": Session.get('chapp-docid')}).observe({
            added: function(item) {
                if(item.userId != Meteor.userId()) {
                    peer.call(item.userId, window.localStream);
                }
            }
        });
    }, function(err) {
        console.log('Failed to get local stream' ,err);
    });
};