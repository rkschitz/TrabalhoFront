import { getUserBreeds } from "../../api/user";
import { useContext,useEffect,useState } from 'react'
import { AuthContext } from '../../auth/Context'
import { toast } from 'react-toastify';

export default function Favorites(){
    const [favorites, setFavorites] = useState([]);

    const {id} = useContext(AuthContext);

    const getFavorites = async (userId) => {
        try {
            const response = await getUserBreeds(userId)
            console.log(response)
            if (response.data.token) {
                login(response.data.token);
                return navigate('/');
            }
        } catch (error) {
            if (error.response.status === 403) {
              return toast("Sem permissão.");
            }
            if (error.response.status === 401 || error.response.status === 404) {
              return toast('Email ou senha inválido, tente novamente!');
            }
            return toast('Erro inesperado, tente novamente mais tarde!');
        }
      };

    useEffect(() => {
        console.log(id)
        setFavorites(getFavorites(id));
    },[])

    return(
        <div className="favorites">
            <h1>Favoritos</h1>
        </div>
    )
}