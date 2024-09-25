import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

export default function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState(null)

    function handleSubmit(e) {
        e.preventDefault()
        if(!name || !email || !password || !phone) {
            return setError('Preencha todos os campos')
        }

        const user = {
            email
        }

        localStorage.setItem('user', JSON.stringify(user))
        window.location.href = '/'
    }

    return (
        <div className='container'>
            <h1>Register</h1>
            <form>
                <div className='div-input'>
                    <label>Nome:</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                <div className="div-input">
                    <label>Telefone:</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                {error && <p className='erro'>{error}</p>}
                <Link to='/login'>Já tem cadastro? Faça login aqui</Link>
                <button type='submit' onClick={handleSubmit}>Entrar</button>
            </form>
        </div>
    )
}