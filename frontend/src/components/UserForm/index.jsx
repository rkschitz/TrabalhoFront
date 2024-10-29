import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUser, updateUser } from '../../api/user';
import { AuthContext } from '../../auth/Context';

function UserModal({ show, handleClose, setIsUpdate, user }) {
    const { id } = useContext(AuthContext);

    const [userId, setUserId] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [role, setRole] = useState('viewer'); // Valor padrão para o role

    useEffect(() => {
        if (user) {
            setUserId(user.id); // Preencher o ID (não será alterado)
            setNome(user.nome);
            setEmail(user.email);
            setRole(user.role);
        } else {
            resetForm(); // Resetar se for um novo usuário
        }
    }, [user]);

    const resetForm = () => {
        setUserId('');
        setNome('');
        setEmail('');
        setSenha('');
        setRole('viewer'); // Resetar o role para o valor padrão
    };

    const handleSubmit = async () => {
        const newUser = {
            nome,
            email,
            senha,
            role,
        };

        try {
            if (user) {
                // Atualiza o usuário
                await updateUser(userId, newUser);
                console.log('Usuário atualizado com sucesso!');
            } else {
                // Cria novo usuário
                await createUser(newUser);
                console.log('Novo usuário criado com sucesso!');
            }

            setIsUpdate(true);
            handleClose();
        } catch (error) {
            console.error('Erro ao salvar o usuário:', error);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{user ? 'Alterar Usuário' : 'Adicionar Novo Usuário'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Senha</label>
                            <input
                                type="password"
                                className="form-control"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </div>
                        {role === 'admin' && (
                        <div className="mb-3">
                            <label className="form-label">Role</label>
                            <select
                                className="form-control"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="viewer">Viewer</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>)}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserModal;
