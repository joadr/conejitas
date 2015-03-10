Template.registerHelper('isImage', function(fileURL) {
	return ((fileURL.indexOf('.png') > 0) ||
			(fileURL.indexOf('.jpg') > 0) ||
			(fileURL.indexOf('.jpeg') > 0) ||
			(fileURL.indexOf('.gif') > 0) ||
			(fileURL.indexOf('.bmp') > 0));
});

Template.registerHelper('iconForFile', function(fileURL) {
	if ((fileURL.indexOf('.png') > 0) ||
		(fileURL.indexOf('.jpg') > 0) ||
		(fileURL.indexOf('.jpeg') > 0) ||
		(fileURL.indexOf('.gif') > 0) ||
		(fileURL.indexOf('.bmp') > 0)) {
		return 'fa-file-image-o';
	}

	return 'fa-file-o';
});