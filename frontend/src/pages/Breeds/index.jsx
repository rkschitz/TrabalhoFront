import { useContext, useEffect, useState } from "react";
import { getBreeds, alimentBreed } from "../../api/breed";
import { favoriteBreed } from "../../api/userBreed";
import { AuthContext } from '../../auth/Context'
import { toast } from 'react-toastify'
import './styles.css';

export default function BreedFeed() {
    const [breeds, setBreeds] = useState([]); // Inicializa breeds como array vazio
    const { id, role } = useContext(AuthContext);

    const getBreed = async () => {
        try {
            const response = await getBreeds();
            setBreeds(response || []); // Garante que breeds seja um array
        } catch (error) {
            console.error("Erro ao buscar as raças:", error);
        }
    };

    const favorite = (breedId) => async () => {
        try {
            const response = await favoriteBreed(id, breedId, false);
            if (response.status === 201){
                toast('Raça favoritada com sucesso');
            }
        } catch (error) {
            toast(error.response.data.message);
        }
    };

    const alimetFeed = async () => {
        toast("Alimentando feed");
        try {
            await alimentBreed();
            await getBreed();
        } catch (error) {
            toast(error);
        }
    };

    useEffect(() => {
        getBreed();
    }, []);

    return (
        <div className="breed-feed">
            <h1>Raças</h1>
            {role === 'admin' && <button onClick={() => alimetFeed()}>Alimentar Feed</button>}
            {breeds.map((breed) => (
                <div key={breed.breedId} className="breed">
                    <button className="favorite-button" onClick={favorite(breed.breedId, true)}>Favoritar❤️</button>
                    <p>ID: {breed.breedId}</p>
                    <img src={breed.image} alt={`Imagem da raça ${breed.breedId}`} className="breed-image" />
                </div>
            ))}
        </div>
    );
}
