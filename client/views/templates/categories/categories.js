Template.categories.helpers({
	conejitas: function () {
		//category = orion.entities.categories.collection.findOne({searchable: reemplazartildes(Router.current().params.name.toLowerCase())});
		conejitas = orion.entities.conejitas.collection.find({category: this.name, aproved: true});
		return conejitas;
	}
});

Template.conejitaItemCategory.helpers({
	divide: function(promedio) {
		return promedio / 2;
	}
});
Template.conejitaItemCategory.rendered = function () {
	this.$('.rateit').rateit();
	this.$(".rateit").bind('over', function (event,value) { $(this).attr('title', value); });
}