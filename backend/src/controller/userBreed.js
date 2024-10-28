const userBreedModel = require('../model/userBreed');

class UserBreedController{
    async createUserBreed(userId, breedId){
        if(!userId || !breedId){
            throw new Error("userId e breedId são obrigatórios.");
        }
        const newUserBreed = {
            userId,
            breedId
        }
        const responseUserBreed = await userBreedModel.create(newUserBreed);
        return responseUserBreed;
    }

    async findUserBreed(id){
        if(id === undefined){
            throw new Error("Id é obrigatório.");
        }
        const userBreed = await userBreedModel.findByPk(id);
        if(!userBreed){
            throw new Error("Relação não encontrada.");
        }
        return userBreed;
    }

    async updateUserBreed(id, userId, breedId){
        const oldUserBreed = await userBreedModel.findByPk(id);
        oldUserBreed.userId = userId || oldUserBreed.userId;
        oldUserBreed.breedId = breedId || oldUserBreed.breedId;
        oldUserBreed.save();
        return oldUserBreed;
    }

    async deleteUserBreed(id){
        if(id === undefined){
            throw new Error("Id é obrigatório.");
        }
        const userBreed = await this.findUserBreed(id);
        userBreed.destroy();
        return;
    }

    async listUserBreeds(){
        const userBreeds = await userBreedModel.findAll();
        return userBreeds;
    }

    async listUserBreedsByUser(userId){
        if(userId === undefined){
            throw new Error("Id é obrigatório.");
        }
        const userBreeds = await userBreedModel.findAll({where: {userId}});
        return userBreeds;
    }

    async listUserBreedsByBreed(breedId){
        if(breedId === undefined){
            throw new Error("Id é obrigatório.");
        }
        const userBreeds = await userBreedModel.findAll({where: {breedId}});
        return userBreeds;
    }
}

module.exports = new UserBreedController();