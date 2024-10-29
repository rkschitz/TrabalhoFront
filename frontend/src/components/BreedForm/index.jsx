import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Certifique-se de instalar o axios
import { createBreed } from '../../api/breed';
import { createUserBreed } from '../../api/userBreed';
import { AuthContext } from '../../auth/Context';

function BreedModal({setIsUpdate}) {

  const {id} = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [breedId, setBreedId] = useState('');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [lifeSpan, setLifeSpan] = useState('');
  const [origin, setOrigin] = useState('');
  const [temperament, setTemperament] = useState('');
  const [image, setImage] = useState('');

  const handleClose = () => {
    setShow(false);
    resetForm(); // Reseta o formulário ao fechar o modal
  };

  const handleShow = () => setShow(true);

  const resetForm = () => {
    setBreedId('');
    setName('');
    setWeight('');
    setLifeSpan('');
    setOrigin('');
    setTemperament('');
    setImage('');
  };

  const handleSubmit = async () => {
    const newBreed = {
        breedId,
      name,
      weight,
      life_span: lifeSpan,
      origin,
      temperament,
      image,
    };

    try {
    //   const response = await createBreed(newBreed);
    //   const newUserBreed = await createUserBreed(id, response.data.breedId);
      setIsUpdate(true);

      return handleClose(); 
    } catch (error) {
      console.error('Erro ao salvar a raça:', error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Inserir Nova Raça
      </Button>

      <Modal show={show} onHide={handleClose} > 
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Nova Raça</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
                <label className="form-label">ID</label>
                <input
                 type="text"
                 className="form-control"
                 value={breedId}
                 onChange={(e) => setBreedId(e.target.value)}
                 required
                />  
            </div>
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Peso</label>
              <input
                type="text"
                className="form-control"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Esperança de Vida</label>
              <input
                type="text"
                className="form-control"
                value={lifeSpan}
                onChange={(e) => setLifeSpan(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Origem</label>
              <input
                type="text"
                className="form-control"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Temperamento</label>
              <input
                type="text"
                className="form-control"
                value={temperament}
                onChange={(e) => setTemperament(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Imagem URL</label>
              <input
                type="text"
                className="form-control"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div>
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

export default BreedModal;
