class ImageController{
    async createImage(image){
        const response = await image.create({
            image
        });
        return response.data;
    }

    async findImage(id){
        const response = await image.findByPk(id);
        if(!response){
            throw new Error("Imagem não encontrada");
        }
        return response;
    }

    async updateImage(id, image){
        const response = await image.findByPk(id);
        response.image = image || response.image;
        response.save();
        return response;
    }

    async deleteImage(id){
        if(id === undefined){
            throw new Error("Id é obrigatório");
        }
        const response = await this.findImage(id);
        response.destroy();
        return;
    }
}

module.exports = new ImageController();