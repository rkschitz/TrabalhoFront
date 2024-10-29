import { Link } from 'react-router-dom'
import { useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/Context'
import { loginUser } from '../../api/user'
import './styles.css'

export default function Login() {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!email || !senha) {
          return toast('Informe o e-mail e a senha para continuar!');
      }
  
      try {
          const response = await loginUser(email, senha);
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
