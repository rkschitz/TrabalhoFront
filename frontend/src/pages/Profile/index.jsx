import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/Context"; // Importar o contexto de autenticação
import { getAllUsers, deleteUser, getContext } from "../../api/user"; // Importar funções de API
import UserModal from "../../components/UserForm/index"; // Importar seu modal de usuário
import './styles.css';

export default function Profile() {
    const { role, id } = useContext(AuthContext); // Obter o papel do usuário
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isCreating, setIsCreating] = useState(false); // Novo estado para criar um usuário

    useEffect(() => {
        const fetchData = async () => {
            if (role === 'admin') {
                await fetchUsers();
            } else {
                const response = await getContext();
                setUsers([response]);
                console.log(response)
            }
        };
        
        fetchData();
    }, [role, isUpdate]);

    const fetchUsers = async () => {
        try {
            const response = await getAllUsers(); // Chamar a API para obter todos os usuários
            setUsers(response.data);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId); // Chamar a API para excluir o usuário
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId)); // Atualizar a lista de usuários
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
        }
    };

    const handleCreateUser = () => {
        setSelectedUser(null); // Resetar o usuário selecionado
        setIsCreating(true); // Indicar que estamos criando um novo usuário
        setShowModal(true); // Mostrar o modal
    };

    return (
        <div className="profile">
            <h1>Profile</h1>
            {role === 'admin' ? (
                <>
                    <h2>Lista de Usuários</h2>
                    <button onClick={handleCreateUser}>Adicionar Usuário</button>
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                <span>{user.nome} ({user.email}) ({user.role})</span>
                                <button onClick={() => { 
                                    setSelectedUser(user); 
                                    setIsCreating(false); // Indicar que estamos alterando um usuário
                                    setShowModal(true); 
                                }}>
                                    Alterar
                                </button>
                                <button onClick={() => handleDeleteUser(user.id)}>Excluir</button>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div>
                    <h2>Seus Dados</h2>
                    {console.log(users)}
                     {users.map(user => (
                        <div key={user.id}>
                            <span>{user.nome} ({user.email}) ({user.role})</span>
                            <button onClick={() => { 
                                setSelectedUser(user); 
                                setIsCreating(false);
                                setShowModal(true); 
                            }}>
                                Alterar
                            </button>
                        </div>
                    ))}
                    <button onClick={() => handleDeleteUser(id)}>Excluir Conta</button>
                </div>
            )}
            <UserModal 
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                setIsUpdate={setIsUpdate} 
                user={selectedUser}
                isCreating={isCreating} // Passar o estado de criação para o modal
            />
        </div>
    );
}
