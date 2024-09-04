import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom';
import Cats from './pages/Cats';
import AmericanBobtail from './pages/AmericanBobtail';
import Abyssinian from './pages/Abyssinian';
import AmericanWirehair from './pages/AmericanWirehair';
import AmericanCurly from './pages/AmericanCurly';
import AmericanShortHair from './pages/AmericanShortHair';
import BreedNotListed from './pages/BreedNotListed';

function App() {
  return (
    <>
      <Header />
      <div className='content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/allCats' element={<Cats />} />
          <Route path='/americanBobtails' element={<AmericanBobtail />} />
          <Route path='/abyssinian' element={<Abyssinian />} />
          <Route path='/americanWirehair' element={<AmericanWirehair />} />
          <Route path='/americanCurly' element={<AmericanCurly />} />
          <Route path='/americanShortHair' element={<AmericanShortHair />} />
          <Route path='/breedNotListed' element={<BreedNotListed />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
