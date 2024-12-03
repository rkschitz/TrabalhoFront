import { useContext } from 'react';
import { AuthContext } from '../../auth/Context';
import Button from 'react-bootstrap/esm/Button';
import '../Logout/style.css';

export default function LogoutButton() {
  const { logout } = useContext(AuthContext);

  return <Button className='logout-button' onClick={logout}>Logout</Button>
}
