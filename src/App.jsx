import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom';
import Gatos from './pages/Gatos';

function App() {
  return (
    <>
      <Header />
      <div className='content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/gatos' element={<Gatos />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
