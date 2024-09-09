import { Link } from 'react-router-dom'
import { useState } from 'react'
import './styles.css'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return re.test(String(email).toLowerCase())
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!email || !password) {
            return alert('Preencha todos os campos')
        }

        if (!validateEmail(email)) {
            return alert('Por favor, insira um e-mail válido')
        }

        const user = {
            email
        }

        localStorage.setItem('user', JSON.stringify(user))
        window.location.href = '/'
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
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Link to='/register'>Não tem cadastro? Cadastre-se aqui</Link>
                <button type='submit' onClick={handleSubmit}>Entrar</button>
            </form>
        </div>
    )
}
