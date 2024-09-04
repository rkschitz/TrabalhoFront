import { useState, useEffect } from 'react'
// import { getEspecie, getGenero, getStatus } from '../../fns/translate'
import './styles.css'

export default function Card({ breed, limit }) {

    const [cats, setCats] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    async function searchCats() {
        try {
            const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}&limit=${limit ? limit : 4}`, {
                headers: {
                    'x-api-key': 'live_VjHmZzGkhlngtKfw0wW7FlAjrHWNtwQIo1LYie3su2otT1tLJPYF6nVOEmlj2dt7'  
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            setCats(data);
        } catch (err) {
            setError('Ocorreu um erro ao buscar os gatos.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        searchCats();
    }, []);
    
    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Imagens de Gatos</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {cats.map((cat, index) => (
                    <div key={index} style={{ margin: '10px' }}>
                        <img src={cat.url} alt="Gato" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                    </div>
                ))}
            </div>
        </div>
    );
}