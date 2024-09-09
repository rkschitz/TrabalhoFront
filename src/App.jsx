import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom';
import AmericanBobtail from './pages/AmericanBobtail';
import Abyssinian from './pages/Abyssinian';
import AmericanWirehair from './pages/AmericanWirehair';
import AmericanCurly from './pages/AmericanCurly';
import AmericanShortHair from './pages/AmericanShortHair';
import BreedNotListed from './pages/BreedNotListed';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  const user = localStorage.getItem('user');

  return (
    <>
      {user ? <Header /> : null}
      <div className='content'>
        <Routes>
          <Route path="/register" element={<Register />} />
          {user ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/americanBobtails" element={<AmericanBobtail />} />
              <Route path="/abyssinian" element={<Abyssinian />} />
              <Route path="/americanWirehair" element={<AmericanWirehair />} />
              <Route path="/americanCurly" element={<AmericanCurly />} />
              <Route path="/americanShortHair" element={<AmericanShortHair />} />
              <Route path="/breedNotListed" element={<BreedNotListed />} />
            </>
          ) : (
            <Route path="*" element={<Login />} />
          )}
        </Routes>
      </div>
      {user ? <Footer /> : null}
    </>
  )
}

export default App
