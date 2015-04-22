Meteor.methods({
    generarPagosTokens: function(monto, banco){
        var transaction_id = Math.random().toString(36).substring(7).toLowerCase();
        var fecha = new Date();
        fecha = fecha.toJSON();

        var data = {
            usuario: Meteor.userId(),
            transaction_id: transaction_id,
            monto: monto,
            pagado: false,
            fecha_generacion: fecha
        };
        var pago = pagos.insert(data);
        var retorno = Meteor.call('khipu_get_new_payment', Meteor.user().emails[0].address, banco, monto, "Pago Tokens", "", transaction_id);
        return retorno;
    },
    agregarTokens: function(transaction_id){
        var pago = pagos.findOne({transaction_id: transaction_id});
        var user = Meteor.users.findOne(pago.usuario);
        var tokensAntes = user.tokens;
        var nuevosTokens = pagos.monto/orion.dictionary.get('preciotoken', '3');
        var totalTokens = tokensAntes + nuevosTokens;
        Meteor.users.update(pago.usuario, {$set: {tokens: totalTokens}});
    }
});
