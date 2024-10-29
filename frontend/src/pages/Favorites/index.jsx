import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getUserBreeds } from "../../api/user"; // Atualize com a API correta
import BreedModal from '../../components/BreedForm/index'; // Importe o modal
import { AuthContext } from '../../auth/Context';
import Button from 'react-bootstrap/Button';

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const { id, role } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false); // Estado para controlar o modal
    const [isUpdate, setIsUpdate] = useState(false);

    const getFavorites = async (userId) => {
        try {
            const response = await getUserBreeds(userId);
            return response.data;
        } catch (error) {
            handleErrors(error);
            return [];
        }
    };

    const handleErrors = (error) => {
        if (error.response.status === 403) {
            toast("Sem permissão.");
        } else if (error.response.status === 401 || error.response.status === 404) {
            toast('Email ou senha inválido, tente novamente!');
        } else {
            toast('Erro inesperado, tente novamente mais tarde!');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (role === 'admin') {
                // Obtenha todas as raças se for admin
            } else {
                const data = await getFavorites(id);
                setFavorites(data);
            }
        };
        fetchData();
        console.log(isUpdate)
        setIsUpdate(false)
    }, [role, id, isUpdate]);

    return (
        <div className="favorites">
            <h1>Favoritos</h1>
            <Button variant="primary" onClick={() => setShowModal(true)}>Adicionar Nova Raça</Button>
            {favorites.length > 0 ? (
                favorites.map((favorite) => (
                    <div key={favorite.breedId} className="favorite">
                        <p>ID: {favorite.breedId}</p>
                        <img src={favorite.image} alt={`Imagem da raça ${favorite.breedId}`} className="favorite-image" />
                    </div>
                ))
            ) : (
                <p>Nenhum favorito encontrado.</p>
            )}
            <button onClick={() => console.log(isUpdate)}>Adicionar Nova Raça</button>
            <BreedModal c={showModal} handleClose={() => setShowModal(false)} 
                setIsUpdate={setIsUpdate}
            />
        </div>
    );
}
