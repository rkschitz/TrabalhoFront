import api from './api';

export const favoriteBreed = async (userId, breedId,isCreated) => {
    const body = { userId, breedId, isCreated}
    const response = await api.post('/api/v1/userBreed', body, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response;
}