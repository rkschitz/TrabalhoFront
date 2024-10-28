import api from './api';

export const getBreeds = async () => {
  const response = await api.get(`https://api.thecatapi.com/v1/images/search?limit=3`, {
    headers: {
        'x-api-key': 'live_VjHmZzGkhlngtKfw0wW7FlAjrHWNtwQIo1LYie3su2otT1tLJPYF6nVOEmlj2dt7'
    }
});
  return response.data;
};