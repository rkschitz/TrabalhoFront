import { useContext, useEffect, useState } from "react";
import { getBreeds, alimentBreed, deleteBreed } from "../../api/breed";
import { favoriteBreed } from "../../api/userBreed";
import { AuthContext } from '../../auth/Context'
import { toast } from 'react-toastify'
import BreedModal from '../../components/BreedForm/index';
import Button from 'react-bootstrap/Button';
import './styles.css';

export default function BreedFeed() {
    const [breeds, setBreeds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [currentBreed, setCurrentBreed] = useState(null);
    const { id, role } = useContext(AuthContext);

    const getBreed = async () => {
        try {
            const response = await getBreeds();
            setBreeds(response || []);
        } catch (error) {
            console.error("Erro ao buscar as raças:", error);
        }
    };

    const favorite = (breedId) => async () => {
        try {
            const response = await favoriteBreed(id, breedId, false);
            if (response.status === 201) {
                toast('Raça favoritada com sucesso');
            }
        } catch (error) {
            toast(error.response.data.message);
        }
    };

    const alimetFeed = async () => {
        try {
            await alimentBreed();
            await getBreed();
        } catch (error) {
            toast(error);
            await getBreed();
        }
    };

    const handleEdit = (breed) => {
        setCurrentBreed(breed);
        setIsUpdate(true);
        setShowModal(true);
    }

    const handleDelete = async (breed) => {
        try {
            const response = await deleteBreed(breed.breedId);
            console.log(response)
            if (response) {
                toast('Raça deletada com sucesso')
            }
        } catch (e) {
            toast(e)
        }
        getBreed();
    }

    useEffect(() => {
        getBreed();
    }, [isUpdate]);

    return (
        <div className="breed-feed">
            <h1>Raças</h1>
            {role === 'admin' && (<><button onClick={() => alimetFeed()}>Alimentar Feed</button>
                <Button variant="primary" onClick={() => { setCurrentBreed(null); setIsUpdate(false); setShowModal(true); }}>
                    Adicionar Nova Raça
                </Button>
            </>)}
            {breeds.map((breed) => (
                <div key={breed.breedId} className="breed">
                    <button className="favorite-button" onClick={favorite(breed.breedId, true)}>Favoritar ❤️</button>
                    {role === 'admin' && <button className="favorite-button" onClick={() => handleEdit(breed)}>Alterar</button>}
                    {role === 'admin' && <button className="favorite-button" onClick={() => handleDelete(breed)}>Excluir</button>}
                    <p>Nome: {breed.name}</p>
                    <p>Origem: {breed.origin}</p>
                    <img src={breed.image} alt={`Imagem da raça ${breed.breedId}`} className="breed-image" />
                </div>
            ))}
            <BreedModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                setIsUpdate={setIsUpdate}
                breed={currentBreed}
            />
        </div>
    );
}