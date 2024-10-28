import { useEffect, useState } from "react";
import { getBreeds } from "../../api/breed";

export default function BreedFeed() {
    const [breeds, setBreeds] = useState([]);

    const getBreed = async () => {
        try {
            const response = await getBreeds();
            setBreeds(response);
        } catch (error) {
            console.error("Erro ao buscar as raças:", error);
        }
    };

    const addFavorites = (id) => async () => {
        console.log(id);
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
