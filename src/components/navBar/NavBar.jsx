import './NavBar.css'
import logo from '../images/logo.png'



function NavBar() {

  return (
    <>
      <nav className="nav">
        <section className='primeraColumna'>
          <img src={logo}></img>
        </section>
        <section className='segundaColumna'>
          <a href='#'>Logout</a>
        </section>

      </nav>
    </>
  )
}

export default NavBar;