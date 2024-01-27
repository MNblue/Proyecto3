import { useState } from 'react'
import './App.css'
import NavBar from './components/navBar/NavBar.jsx'
import Footer from './components/footer/Footer.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <NavBar/>
    
      <Footer />
    </>
  )
}

export default App
