Template.indexMobile.helpers({
    categories: function(){
        return orion.entities.categories.collection.find();
    }
});