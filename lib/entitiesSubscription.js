//orion.filesystem.setAllowPublicUploads(true);
orion.filesystem.allowPublicUploads = true;
orion.admin.addAdminSubscription('entity', 'cities');
orion.admin.addAdminSubscription('entity', 'countries');
orion.subs.subscribe('entity', 'categories');
orion.subs.subscribe('entity', 'services');
