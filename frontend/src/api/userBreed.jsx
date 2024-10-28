import api from './api';

export const favoriteBreed = async (userId,breedId) => {
    const response = await api.post(`/api/v1/user/breeds/${breedId}`);
    return response.data;
    }