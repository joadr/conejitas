Template.layout.events({
	'click .logout': function (e) {
		e.preventDefault();
		Meteor.logout();
		Router.go('conejitas');
	}
});

/*Template.layout.events({
	'click a[href="/"]': function (e) {
		e.preventDefault();
		console.log('clicked');
		Router.go('conejitas');
	}
});*/