Template.banks.helpers({
	banks: function () {
		return JSON.parse(Meteor.call('khipu_get_banks')).banks;
	}
});