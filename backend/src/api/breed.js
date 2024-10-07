const BreedController = require('../controller/breed');
class BreedApi{
    async createBreed (req,res){
        const {id,breed, weight, height, origin,temperament,image} = req.body;
        try{
            const response = await BreedController.createBreed(id,breed, weight, height, origin,,image);
            return res.status(201).send(response);
        } catch (error){
            return res.status(400).send({error: `Erro ao criar raça ${error.message}`});
        }
    }
}

module.exports = new BreedApi()