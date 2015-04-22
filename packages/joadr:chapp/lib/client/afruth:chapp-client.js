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

Template.chapp_form.created = function() {
    Deps.autorun(function () {
        var dateNow = new Date();
        Meteor.subscribe("chapps", (!Session.equals('chapp-docid',undefined))?Session.get('chapp-docid'):null, dateNow);
    })
};
/*
Template.chapp_form.rendered = function() {
    $(document).ready(function() {
     $(".fancybox").fancybox({
        'transitionIn'  : 'elastic',
        'transitionOut' : 'elastic',
        'speedIn'   : 600, 
        'speedOut'    : 200, 
        'overlayShow' : false,
        'autoScale' : false,
        'type' : 'iframe',
        'width':488,
        'height':351,
      }); 
     });
};*/

Template.chapp_form.helpers({
    chapp: function() {
        var docId = Session.get('chapp-docid');
        return Chapps.find({

        },{
            sort: {
                chatDate: 1
            }
        });
    }
});

Template.chapp_item.helpers({

    formatDate: function(date) {
        return moment(date).format('hh:mm:ss');
    }
});

Template.chapp_item.rendered = function () {
  var objDiv = document.getElementById("chapp_text");
  objDiv.scrollTop = objDiv.scrollHeight + 150;
};


Template.chapp_form.events({
   'submit #chapp-form': function(ev) {
       ev.preventDefault();
       var id = (!Session.equals('chapp-docid',undefined))?Session.get('chapp-docid'):null;
       var uname = (!Session.equals('chapp-username',undefined))?Session.get('chapp-username'):null;
       var master = (!Session.equals('chapp-master',undefined))?Session.get('chapp-master'):null;
       var text = document.getElementById('chapp-input').value;
       if(text != '') {
           Meteor.call('enterChat', text, id, uname, master);
           document.getElementById('chapp-input').value = '';
           document.getElementById('chapp-input').focus();
          var objDiv = document.getElementById("chapp_text");
          objDiv.scrollTop = objDiv.scrollHeight + 150;
       }

   }
});