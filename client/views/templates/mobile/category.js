Template.categoryMobile.helpers({
    conejitas: function () {
        //category = orion.entities.categories.collection.findOne({searchable: reemplazartildes(Router.current().params.name.toLowerCase())});
        conejitas = orion.entities.conejitas.collection.find({category: this.name, aproved: true, workCity: Session.get("city")});
        return conejitas;
    }
});