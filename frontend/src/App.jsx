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
import { AuthProvider } from './Context';
import PrivateRoute from './components/PrivateRoute';
import React,{ useEffect } from 'react';

function App() {

  const [user, setUser] = React.useState(null)

  useEffect(() => {
    let token = localStorage.getItem('token')
    if (user) {
      setUser(token)
    } else {
      console.log('Usuário não logado')
    }
  }, [])

  return (
    <div className="estrutura">
      <AuthProvider>
      {user ? <Header /> : null}s
      <div className='content'>
        <Routes>
              <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/americanBobtails" element={<AmericanBobtail />} />
              <Route path="/abyssinian" element={<Abyssinian />} />
              <Route path="/americanWirehair" element={<AmericanWirehair />} />
              <Route path="/americanCurly" element={<AmericanCurly />} />
              <Route path="/americanShortHair" element={<AmericanShortHair />} />
              <Route path="/breedNotListed" element={<BreedNotListed />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      {user ? <Footer /> : null}
      </AuthProvider>
    </div>
  )
}

export default App
