const breedImage = require('../model/breed_image');

class BreedImageController{
    async createBreedImage(breedId,image){
        const response = await breedImage.create({
            breedId,
            image
        });
        return response.data;
    }
}

module.exports = new BreedImageController();