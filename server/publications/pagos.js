Meteor.publish("pagos", function (transaction_id) {
    check(transaction_id, String);
    return pagos.find({transaction_id: transaction_id});
});