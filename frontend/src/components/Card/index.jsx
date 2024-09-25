import { useState, useEffect } from 'react';
import './styles.css';

async function translateText(text, targetLang = 'pt') {
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
        const data = await response.json();
        return data.responseData.translatedText;
    } catch (error) {
        console.error('Erro ao traduzir:', error);
        return text;
    }
}

export default function Card({ breed, limit }) {

    const [cats, setCats] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchBreed, setSearchBreed] = useState('');

    async function searchCats() {
        try {
            const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}&limit=${limit ? limit : 4}`, {
                headers: {
                    'x-api-key': 'live_VjHmZzGkhlngtKfw0wW7FlAjrHWNtwQIo1LYie3su2otT1tLJPYF6nVOEmlj2dt7'
                },
                params: {
                    has_breeds: 1
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setSearchBreed(data[0].breeds[0].name);

            const translatedTemperament = await translateText(data[0].breeds[0].temperament);
            const translatedOrigin = await translateText(data[0].breeds[0].origin);
            data[0].breeds[0].temperament = translatedTemperament;
            data[0].breeds[0].origin = translatedOrigin;
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

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % cats.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + cats.length) % cats.length);
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container-geral">
            <div className="slider-container">
                <div className="slider">
                    {cats.map((cat, index) => (
                        <div
                            key={index}
                            className={`slide ${index === currentSlide ? 'active' : ''}`}
                        >
                            {index === currentSlide && (
                                <img className='image'
                                    src={cat.url}
                                    alt="Gato"
                                    style={{ width: '400px', height: '400px', objectFit: 'cover' }}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <button className="prev" onClick={prevSlide}>❮</button>
                <button className="next" onClick={nextSlide}>❯</button>
            </div>
            <div className="description">
                <h2>{cats[0].breeds[0].name}</h2>
                <p><strong>Origem:</strong> {cats[0].breeds[0].origin}</p>
                <p><strong>Expectativa de vida:</strong> {cats[0].breeds[0].life_span} anos</p>
                <p><strong>Temperamento:</strong> {cats[0].breeds[0].temperament}</p>
                <div className="see-more">
                    <a href={cats[0].breeds[0].wikipedia_url} target="_blank" rel="noreferrer">Saiba mais</a>
                </div>
            </div>
        </div>
    );
}
