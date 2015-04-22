Template.panelConejitas.helpers({
    cantidadEvaluaciones: function() {
        var evaluaciones = Evaluations.find().fetch();
        return evaluaciones.length;
    },
    isChecked: function(){
        var services = Template.parentData(1).services;
        var currentService = this._id;
        for(var i=0; i<services.length; i++){
            if(currentService == services[i]){
                return true;
            }
        }
        return false;
    },
    services: function(){
        return orion.entities.services.collection.find().fetch();
    },
    ages: function(){
        var ages = [];
        for(var i=18; i<100; i++){
            ages.push(i);
        }
        return ages;
    },
    agesSelected: function(){
        if(this == Template.parentData(1).age){
            return true;
        }
        return false;
    },
    alturas: function(){
        var alturas = [];
        for(var i=0; i<100; i++){
            alturas.push("1."+i);
        }
        return alturas;
    },
    alturasSelected: function(){
        if(this == Template.parentData(1).heigh){
            return true;
        }
        return false;
    },
    pesos: function () {
        var pesos = [];
        for(var i=40; i<150; i++){
            pesos.push(i);
        }
        return pesos;
    },
    pesosSelected: function () {
        if(this == Template.parentData(1).weigh){
            return true;
        }
        return false;
    },
    video: function(){
        if(this.plan == "plan2"){
            return true;
        }
        return false;
    },
    ciudades: function(){
        return orion.entities.cities.collection.find({enabled: true, country: this.workCountry}).fetch();
    },
    ciudadesSelected: function(){
        if(this._id == Template.parentData(1).workCity){
            return true;
        } else {
            return false;
        }
    },
    message: function(){
        return this.message.replace(/<br\s*[\/]?>/gi, "\r\n");
    },
    categories: function(){
        return orion.entities.categories.collection.find().fetch();
    },
    categoriaSelected: function(){
        if(this.name == Template.parentData(1).category){
            return true;
        }
        return false;
    },
});

Template.panelConejitas.events({
    'change input[type=file]': function(event){
        var file = event.target.files[0]
        orion.filesystem.upload({
            fileList: event.target.files,
            name: file.name,
            folder: 'file-attribute',
            canRemove: true
        }, function(file, error) {
            if (!error) {
                Meteor.call('updatePhoto', Router.current().data().conejita._id, event.target.name, {fileId: file._id, url: file.url});
            } else {
                alert('error uploading file');
                console.log(error, "error uploading file");
            }
        });
    },
    'click div#enviar': function(e){
        e.preventDefault();
        var inputs = {
            age: $('input[name=age]').val(),
            heigh: $('input[name=heigh]').val(),
            weigh: $('input[name=weigh]').val(),
            measurements: $('input[name=measurements]').val(),
            schedule: $('input[name=schedule]').val(),
            place: $('input[name=place]').val(),
            sector: $('input[name=sector]').val(),
            phone: $('input[name=phone]').val(),
            price: $('input[name=price]').val(),
            usdPrice: $('input[name=usdPrice]').val(),
            category: $('input[name=category]').val(),
        };

        Meteor.call('updateValues', Router.current().data().conejita._id, inputs);
    },
    'click div#publicarOferta': function(e){
        var inputs = {
            tempPrice: $('input[name=precioCLP]').val(),
            approvedPrice: false,
            offerEnd: $('input[name=finOferta]').val(),
            tempUsd: $('input[name=precioUSD]').val(),
        }

        Meteor.call('makeOffer', Router.current().data().conejita._id, inputs.tempPrice, inputs.tempUsd, inputs.offerEnd);
    }
});

// nl to br: str = str.replace(new RegExp('\r?\n','g'), '<br />');