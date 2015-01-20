Template.conejitaItem.helpers({
	divide: function(promedio) {
		return promedio / 2;
	}
});

// Stars display when home page.
Template.conejitaItem.rendered = function () {
	this.$('.rateit').rateit();
	this.$('.rateit').bind('over', function (event,value) { $(this).attr('title', value); });
}
