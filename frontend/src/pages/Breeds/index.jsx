import { useContext, useEffect, useState } from "react";
import { getBreeds } from "../../api/breed";
import { favoriteBreed } from "../../api/userBreed";
import { AuthContext } from '../../auth/Context'

export default function BreedFeed() {
    const [breeds, setBreeds] = useState([]);

    const {id} = useContext(AuthContext)

    const getBreed = async () => {
        try {
            const response = await getBreeds();
            setBreeds(response);
        } catch (error) {
            console.error("Erro ao buscar as raças:", error);
        }
    };

    const addFavorites = (breedId) => async () => {
        try{
            const response = await favoriteBreed(id, breedId, false);
            console.log(response);
        }catch (error) {
            console.error("Erro ao favoritar a raça:", error);
        }
    }

    useEffect(() => {
        getBreed();
    }, []);

    return (
        <div className="breed-feed">
            <h1>Raças</h1>
            {breeds.map((breed) => (
                <div key={breed.id} className="breed">
                    <button className="favorite-button" onClick={addFavorites(breed.id)}>❤️</button> {/* Botão de Favorito */}
                    <p>ID: {breed.id}</p>
                    <img src={breed.url} alt={`Imagem da raça ${breed.id}`} className="breed-image" />
                </div>
            ))}
        </div>
    );
}
