const breed = require("../model/breed");
const breedModel = require("../model/breed");
const axios = require("axios");
class BreedController {

    async getApiBreeds() {

        try {
            const response = await axios.get("https://api.thecatapi.com/v1/breeds");
            const breedsData = response.data;


            for (let breed of breedsData) {
                const newBreed = {
                    breedId: breed.id,
                    name: breed.name,
                    weight: breed.weight.metric,
                    life_span: breed.life_span,
                    origin: breed.origin || "Unknown",
                    temperament: breed.temperament ? breed.temperament.split(",")[0] : "Unknown",
                    image: breed.image ? breed.image.url : "No image"
                };


                const existingBreed = await breedModel.findOne({ where: { name: newBreed.name } });

                if (!existingBreed) {
                    await breedModel.create(newBreed);
                    console.log(`Raça ${newBreed.name} salva com sucesso!`);
                } else {
                    console.log(`Raça ${newBreed.name} já existe no banco de dados.`);
                }
            }

            return { message: "Dados da The Cat API foram processados e salvos no banco de dados." };
        } catch (error) {
            console.error("Erro ao buscar ou salvar raças:", error);
            throw error; 
        }
    }

    async createBreed(name, weight, life_span, origin, [...temperament], [...image]) {

        const newBreed = {
            name,
            weight: weight.metric,
            life_span,
            origin,
            temperament: temperament[0],
            image: image[0]
        }
        console.log(newBreed)
        const responseBreed = await breedModel.create(+newBreed);

        return responseBreed;
    }

    async update(breedId, name, weight, life_span, origin, [...temperament], [...image]) {
        const response = await breedModel.findOne({ where: { breedId } });
        if (!response) {
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

        const responseBreed = await breedModel.update(newBreed, { where: { breedId } });

        return responseBreed;
    }

    async delete(breedId) {
        const response = await breedModel.findOne({ where: { breedId } });
        if (!response) {
            return undefined;
        }

        const responseBreed = await breedModel.destroy({ where: { breedId } });
        return responseBreed;
    }

    async list() {
        breed.findAll()
    }
}

module.exports = new BreedController();