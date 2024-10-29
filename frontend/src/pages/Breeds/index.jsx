import { useContext, useEffect, useState } from "react";
import { getBreeds, alimentBreed } from "../../api/breed";
import { favoriteBreed } from "../../api/userBreed";
import { AuthContext } from '../../auth/Context'
import './styles.css';

export default function BreedFeed() {
    const [breeds, setBreeds] = useState([]); // Inicializa breeds como array vazio
    const { id, role } = useContext(AuthContext);

    const getBreed = async () => {
        try {
            const response = await getBreeds();
            console.log(response)
            setBreeds(response || []); // Garante que breeds seja um array
        } catch (error) {
            console.error("Erro ao buscar as raças:", error);
        }
    };

    const favorite = (breedId) => async () => {
        console.log(breedId)
        try {
            const response = await favoriteBreed(id, breedId, false);
            console.log(response);
        } catch (error) {
            console.error("Erro ao favoritar a raça:", error);
        }
    };

    const alimetFeed = async () => {
        console.log("Alimentando feed");
        try {
            await alimentBreed();
            await getBreed();
        } catch (error) {
            console.error("Erro ao alimentar o feed:", error);
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
                    <button className="favorite-button" onClick={favorite(breed.breedId, true)}>❤️❤️❤️❤️</button>
                    <p>ID: {breed.breedId}</p>
                    <img src={breed.image} alt={`Imagem da raça ${breed.breedId}`} className="breed-image" />
                </div>
            ))}
        </div>
    );
}
