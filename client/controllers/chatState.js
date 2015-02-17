// Setup the state function on the client
Presence.state = function() {
  return {
    currentRoomId: Session.get('chapp-docid'),
    username: Session.get('chapp-username')
  };
}