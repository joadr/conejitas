if (Meteor.isClient) {
	orion.admin.addSidebarTab({
		routeName: 'adminFilesIndex',
		navbarTitle: 'Files',
		activeRouteRegex: 'adminFiles',
		icon: 'folder',
		permission: 'files.folders'
	});

	orion.admin.addAdminSubscription(orion.subs.subscribe('admin-files'));
}

orion.users.permissions.add('files.folders');
orion.users.permissions.add('files.upload');
orion.users.permissions.add('files.delete');