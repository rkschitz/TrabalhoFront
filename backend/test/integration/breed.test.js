const breedController = require('../../src/controller/breed');

describe('Breed Controller', () => { 

    it('should create a breed', async () => {
        const breed = await breedController.createBreed(
            '1',
            'Golden Retriever',
            '30-34 kg',
            '56-61 cm',
            'Scotland',
            ['Intelligent', 'Friendly', 'Devoted'],
            ['https://www.google.com.br']
        );
        this.BREED_ID = breed.id;
        expect(breed).toHaveProperty('breed', 'Golden Retriever');
    });

    it('should find a breed', async () => {
        const breed = await breedController.findBreed(this.BREED_ID);
        expect(breed).toHaveProperty('breed', 'Golden Retriever');
    });

    it('should update a breed', async () => {
        const breed = await breedController.updateBreed(
            this.BREED_ID,
            'Labrador Retriever',
            '25-32 kg',
            '54-58 cm',
            'Canada',
            ['Intelligent', 'Friendly', 'Devoted'],
            ['https://www.google.com.br']
        );
        expect(breed).toHaveProperty('breed', 'Labrador Retriever');
    });

    it('should delete a breed', async () => {
        const breed = await breedController.deleteBreed(this.BREED_ID);
        expect(breed).toBeUndefined();
    });

});