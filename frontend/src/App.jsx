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
import { AuthProvider } from './auth/Context';
import PrivateRoute from './components/PrivateRoute';
import React, { useEffect } from 'react';
import Layout from './components/Layout/index';
import Profile from './pages/Profile';

function App() {

  const [user, setUser] = React.useState(null)

  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) {
      setUser(token)
    }
  }, [])

  return (
    <AuthProvider>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/americanBobtails" element={<AmericanBobtail />} />
            <Route path="/abyssinian" element={<Abyssinian />} />
            <Route path="/americanWirehair" element={<AmericanWirehair />} />
            <Route path="/americanCurly" element={<AmericanCurly />} />
            <Route path="/americanShortHair" element={<AmericanShortHair />} />
            <Route path="/breedNotListed" element={<BreedNotListed />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        {user ? '' : <Route path="/login" element={<Login />} />}
        {user ? '' : <Route path="/register" element={<Register />} />}
      </Routes>
    </AuthProvider>
  )
}

export default App
