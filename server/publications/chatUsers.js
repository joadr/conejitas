Meteor.publish('userPresence', function(currentRoomId) {
  // Setup some filter to find the users your user
  // cares about. It's unlikely that you want to publish the 
  // presences of _all_ the users in the system.

  // If for example we wanted to publish only logged in users we could apply:
  // filter = { userId: { $exists: true }};
  var filter = currentRoomId ? {'state.currentRoomId': currentRoomId} : {};
  //var filter = { userId: { $exists: true }}; 

  return Presences.find(filter, { fields: { state: true, userId: true }});
});