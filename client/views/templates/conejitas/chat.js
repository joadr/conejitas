Template.publicChatConejitas.rendered = function () {

	var conejita = orion.entities.conejitas.collection.findOne({_id: Router.current().params._id });

	var peer = new Peer(conejita._id, {key: '2eflxenknki3haor', debug: true});
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia({video: true}, function(stream) {
        $('.video').prop('src', URL.createObjectURL(stream));
        window.localStream = stream;
    }, function(err) {
        console.log('Failed to get local stream' ,err);
    });

    peer.on('connection', function(conn) {
        conn.on( 'open', function() {
            var call = peer.call(conn.peer, window.localStream);
        });
    });

    ItemCollection.find({created_at : {$gt: some_current_time}}).observe({
        added: function(item) {
        // Alert code
        }
    });
};