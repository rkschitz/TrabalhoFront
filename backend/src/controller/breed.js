const breedModel = require("../model/breed");
const imageControler = require("../controller/image");
const breedImageController = require("../model/breed_image");

class BreedController{
    async createBreed(id,breed, weight, height, origin,[...temperament],[...image]){
        
        const imagens = [];


        const responseBreed = await breedModel.create({
            id,
            breed,
            weight,
            height,
            origin
        });

        image.forEach(async (element) => {
            const respondeImage = await imageControler.createImage(element);
            imagens.push(respondeImage.id);
        })

        if (imagens.length > 0){
            await breedImageController.create({
                breed: responseBreed.id,
                image: imagens
            })
        }


        return responseBreed;
    }
}

module.exports = new BreedController();