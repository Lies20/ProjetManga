import './component/navBar/menuBurger.css'
import Index from '../Pages/index.jsx'
import { Routes, Route } from 'react-router-dom'
import Inscription from '../Pages/Inscription.jsx'
import Connection from '../Pages/connection.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Index />}/>
        <Route path='/inscription' element={<Inscription/>}/>
        <Route path='/connexion' element={<Connection/>}/>
      </Routes>
      
    </>
  )
}

export default App
