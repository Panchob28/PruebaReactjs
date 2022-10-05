import { useState } from 'react'
import MiApi from './componentes/MiApi.jsx'
import Header from './componentes/Header.jsx'
import Footer from './componentes/Footer.jsx'
import './App.css'

function App() {

  return (
    <div className="App">
      <Header></Header>

      <MiApi></MiApi>

      <Footer></Footer>
    </div>
  )
}

export default App
