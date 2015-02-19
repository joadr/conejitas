Template.publicChatConejitas.rendered = function () {

	var conejita = orion.entities.conejitas.collection.findOne({_id: Router.current().params._id });

	var peer = new Peer(conejita._id, {key: '2eflxenknki3haor', debug: true});
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia({video: true}, function(stream) {
        $('.video').prop('src', URL.createObjectURL(stream));
        window.localStream = stream;

        Presences.find({ "state.currentRoomId": Session.get('chapp-docid')}).observe({
            added: function(item) {
                peer.call(item.userId, window.localStream);  
            }
        });
    }, function(err) {
        console.log('Failed to get local stream' ,err);
    });
};