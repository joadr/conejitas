Template.publicChat.rendered = function () {

	var conejita = orion.entities.conejitas.collection.findOne({_id: Router.current().params._id, online: true});
	var peer = new Peer(Meteor.userId(), {key: '2eflxenknki3haor', debug:true});
  // Llamamos a la conejita
  var conn = peer.connect(conejita._id);

  peer.on('call', function(call) {
      call.answer(null);
      call.on('stream', function(remoteStream) {
        // Show stream in some <video> element.
        $('.video').prop('src', URL.createObjectURL(remoteStream));
      });
  });
};