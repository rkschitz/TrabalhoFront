import { Link } from 'react-router-dom'
import { useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context'
import './styles.css'


export default function Login() {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return re.test(String(email).toLowerCase())
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!email || !senha) {
            return alert('Preencha todos os campos')
        }

        if (!validateEmail(email)) {
            return alert('Por favor, insira um e-mail válido')
        }

        const responseApi = fetch('http://localhost:3000/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        })

        if (!responseApi.ok) {
            return alert('Erro ao fazer login')
        }

        const response = responseApi.json()

        if (response.token) {
            login(response.token)
            navigate('/')
        }
    }

    return (
        <div className='container'>
            <h1>Login</h1>
            <form>
                <div className='div-input'>
                    <label>Email:</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='div-input'>
                    <label>Senha:</label>
                    <input
                        type='senha'
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <Link to='/register'>Não tem cadastro? Cadastre-se aqui</Link>
                <button type='submit' onClick={handleSubmit}>Entrar</button>
            </form>
        </div>
    )
}
