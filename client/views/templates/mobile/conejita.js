Template.conejitaMobile.helpers({
    conejita: function () {
        var conejita = orion.entities.conejitas.collection.findOne({_id: Router.current().params._id, aproved:true});
        conejita.name = conejita.name.toUpperCase();
        for (index = 0; index < conejita.services.length; ++index) {
            service = orion.entities.services.collection.findOne({'_id': conejita.services[index]});
            conejita.services[index] = service.name;
        }

        return conejita;
    },
    categoryLink: function(){
        var category = orion.entities.categories.collection.findOne({name: this.category});
        return "/mobile/categories/"+category.searchable;
    },
    images: function(){
        var images = [];
        if(this.image2){
            images.push(this.image2.url);
        }
        if(this.image3){
            images.push(this.image3.url);
        }
        if(this.image4){
            images.push(this.image4.url);
        }
        if(this.image5){
            images.push(this.image5.url);
        }
        if(this.image6){
            images.push(this.image6.url);
        }
        if(this.image7){
            images.push(this.image7.url);
        }
        if(this.image8){
            images.push(this.image8.url);
        }
        if(this.image9){
            images.push(this.image9.url);
        }
        if(this.image10){
            images.push(this.image10.url);
        }

        return images;
    },
    countryPhoto: function(){
        var country = orion.entities.countries.collection.findOne({_id: this.bornCountry});
        return country.picture.url;
    },
    countryName: function(){
        var country = orion.entities.countries.collection.findOne({_id: this.bornCountry});
        return country.name;
    }
});