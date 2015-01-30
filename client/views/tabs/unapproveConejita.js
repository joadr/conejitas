Template.unapproveConejita.rendered = function(){
	var element = $('.editor');

	// initialize froala
    element.editable({
        inlineMode: false,
        placeholder: ''
    });

    // Handle image uploads
    element.on('editable.beforeImageUpload', function (e, editor, files) {
        orion.filesystem.upload({fileList: files, name: files[0].name, folder: 'froala/images', canRemove: true}, function(file, error) {
            if (!error) {
                element.editable("insertHTML", "<img class='fr-fin' data-file-id='" + file._id + "' src='" + file.url + "'>", true);
            } else {
                console.log(error, "error uploading file")
            }
            $(".editor").editable("hidePopups");
        });
        return false;
    });
    // Handle image deletes
    // If its uploaded through filesystem, it deletes the image and prevent the server call to delete
    element.on('editable.beforeRemoveImage', function (e, editor, img) {
        var imgId = img.attr("data-file-id");
        if (!imgId) {
            return;
        }
        orion.filesystem.remove(imgId);
    });
};

Template.unapproveConejita.helpers({
    onSuccess: function () {
        return function (result) {
            var email = $("input[name=email]").val();

            var html = '<html><body>'+$('.editor').editable('getHTML', false, true)+'</body></html>';

            Meteor.call('sendEmail', email, "", 'Club Conejitas - Lamentamos no poder aceptarte', html);
            /*var name = Router.current().data().entity.name;*/
            Router.go('unapprovedConejitas');
        };
    }
});
