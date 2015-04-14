Template.ofertasEspeciales.helpers({
    conejitas: function () {
        //category = orion.entities.categories.collection.findOne({searchable: reemplazartildes(Router.current().params.name.toLowerCase())});
        conejitas = orion.entities.conejitas.collection.find({ aproved: true, workCity: Session.get("city"), approvedPrice: true});
        return conejitas;
    }
});