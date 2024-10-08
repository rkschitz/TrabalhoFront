import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import { AuthContext } from '../../Context';

export default function Register() {
    const [nome, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);
    const role = "viewer";
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); // useNavigate para redirecionar

    async function handleSubmit(e) {
        e.preventDefault();
        if (!nome || !email || !senha) {
            return setError('Preencha todos os campos');
        }

        try {
            const responseApi = await fetch('http://localhost:3000/api/v1/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, email, senha, role })
            });

            if (responseApi.status === 201) {
                const response = await responseApi.json();

                try {
                    const responseApiLogin = await fetch('http://localhost:3000/api/v1/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email, senha })
                    });

                    if (responseApiLogin.ok) {
                        const responseLogin = await responseApiLogin.json();

                        if (responseLogin.token) {
                            login(responseLogin.token);
                            navigate('/');
                        }
                    } else {
                        setError('Erro ao fazer login');
                    }
                } catch (error) {
                    setError('Erro ao fazer login');
                }
            } else {
                setError('Erro ao fazer o cadastro');
            }
        } catch (error) {
            setError('Erro ao fazer o cadastro');
        }
    }

    return (
        <div className='container'>
            <h1>Register</h1>
            <form>
                <div className='div-input'>
                    <label>Nome:</label>
                    <input
                        type='text'
                        value={nome}
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
                        type='password' // Corrigido para 'password'
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                {error && <p className='erro'>{error}</p>}
                <Link to='/login'>Já tem cadastro? Faça login aqui</Link>
                <button type='submit' onClick={handleSubmit}>Entrar</button>
            </form>
        </div>
    );
}
