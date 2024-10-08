const breedModel = require("../model/breed");

class BreedController{
    async createBreed(breedId,name, weight, life_span, origin,[...temperament],[...image]){

        const newBreed = {
            breedId,
            name,
            weight: weight.metric,
            life_span,
            origin,
            temperament: temperament[0],
            image: image[0]
        }
        console.log(newBreed)
        const responseBreed = await breedModel.create(
            newBreed
        );

        return responseBreed;
    }

    async update(breedId,name, weight, life_span, origin,[...temperament],[...image]){
        const response = await breedModel.findOne({where: {breedId}});
        if(!response){
            return undefined;
        }

        const newBreed = {
            name,
            weight: weight.metric,
            life_span,
            origin,
            temperament: temperament[0],
            image: image[0]
        }

        const responseBreed = await breedModel.update(newBreed,{where: {breedId}});
        
        return responseBreed;
    }

    async delete(id){
        const response = await breedModel.findOne({where: {id}});
        if(!response){
            return undefined;
        }

        const responseBreed = await breedModel.destroy({where: {id}});
        return responseBreed;
    }
}

module.exports = new BreedController();