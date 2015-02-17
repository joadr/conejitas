Meteor.methods({
    enterChat: function(chatText,chatDoc,chatUser, master) {
        check(chatText, String);

        if(!chatDoc)
            chatDoc = ChappOptions.defaultDocId;

        if(!chatUser)
            chatUser = ChappOptions.defaultUserName;

        if(chatUser == master){
            var master = true;
        } else {
            var master = false;
        }

        Chapps.insert({
            chatText: chatText,
            chatDoc: chatDoc,
            chatUserName: chatUser,
            chatMaster: master,
            chatDate: new Date()
        })
    }
});

Meteor.publish("chapps", function(docId, dateNow) {
    if(!docId)
        docId = ChappOptions.defaultDocId;


    return Chapps.find({
        chatDoc: docId,
        chatDate: {
            $gte: dateNow
        }
    },{
        sort: {
            chatDate: 1
        },
        limit: 50
    });
});