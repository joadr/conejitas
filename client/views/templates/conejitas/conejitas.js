Template.conejitas.helpers({
	conejasOnline: function () {
		conejitas = orion.entities.conejitas.collection.find({online: true, aproved:true, workCity: Session.get("city")}, {limit:2});
		return conejitas;
	},

	categories: function(){
		categories = orion.entities.categories.collection.find().map(function(category, indice){
			category.conejitas = orion.entities.conejitas.collection.find({category: category.name, aproved:true, workCity: Session.get("city")}).fetch();
			/*if (category.conejitas.length == 0){
				return;
			}*/
			return category;
		});
		return categories;
	}
});