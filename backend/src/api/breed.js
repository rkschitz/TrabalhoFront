const BreedController = require('../controller/breed');

class BreedApi {
    async createBreed(req, res) {
        const { id, name, weight, life_span, origin, temperament, image } = req.body;
        try {
            const response = await BreedController.createBreed(id, name, weight, life_span, origin, temperament, image);
            return res.status(201).send(response);
        } catch (error) {
            return res.status(400).send({ error: `Erro ao criar raça ${error.message}` });
        }
    }

    async updateBreed(req, res) {
        const { id, breed, weight, height, origin, temperament, image } = req.body;
        try {
            const response = await BreedController.update(id, breed, weight, height, temperament, origin, image);
            return res.status(200).send(response);
        } catch (error) {
            return res.status(400).send({ error: `Erro ao atualizar raça ${error.message}` });
        }
    }

    async deleteBreed(req, res) {
        const { id } = req.body;
        try {
            const response = await BreedController.delete(id);
            return res.status(200).send(response);
        } catch (error) {
            return res.status(400).send({ error: `Erro ao deletar raça ${error.message}` });
        }
    }

    async findBreed(req, res) {
        const { id } = req.body;
        try {
            const response = await BreedController.find(id);
            return res.status(200).send(response);
        } catch (error) {
            return res.status(400).send({ error: `Erro ao buscar raça ${error.message}` });
        }
    }

    async listBreeds(req, res) {
        try {
            const response = await BreedController.list();
            return res.status(200).send(response);
        } catch (error) {
            return res.status(400).send({ error: `Erro ao listar raças ${error.message}` });
        }
    }
}

module.exports = new BreedApi();
