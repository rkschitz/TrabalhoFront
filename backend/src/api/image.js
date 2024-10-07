const ImageController = require('../controller/image');

class ImageApi{
    async createImage(req,res){
        try{
            const response = await ImageController.createImage(req.body.image);
            return res.status(201).send(response);
        } catch (error){
            return res.status(400).send({error: `Erro ao criar imagem ${error.message}`});
        }
    }
}

module.exports = new ImageApi()