import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import { toast } from 'react-toastify'
import { createUser } from '../../api/user';
import InputFloatingLabel from '../../components/FloatLabel';

export default function Register() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const responseApi = await createUser({ nome, email, senha })
      console.log(responseApi)
      if (responseApi.id) {
        navigate('/login')
      } else {
        console.log(responseApi)
      }
    } catch (error) {
      console.log(error)
      if (error.status === 403) {
        return toast("Sem permissão.");
      }
      if (error.status === 401 || error.status === 404) {
        return toast('Email ou senha inválido, tente novamente!');
      }
      toast('Erro inesperado, tente novamente mais tarde!');
    }
  };

  return (
    <div className="container-register">
      <div className='container'>
        <div className="title">
          <h1>REGISTER</h1>
        </div>
        <form>
          <div className='div-input'>
            <InputFloatingLabel type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              label="Nome" />
          </div>
          <div className='div-input'>
            <InputFloatingLabel type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email" />
          </div>
          <div className='div-input'>
            <InputFloatingLabel type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              label="Senha" />
          </div>
          <Link to='/login'>Já tem cadastro? Faça login aqui</Link>
          <button type='submit' onClick={handleSubmit}>Entrar</button>
        </form>
      </div>
    </div>
  );
}
