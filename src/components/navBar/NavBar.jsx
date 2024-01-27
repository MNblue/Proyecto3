import './NavBar.css'
import logo from '../images/logo.png'
import swal from 'sweetalert'


function NavBar() {


  const modalBotones = () => {
    swal({
      title: "¿Estás seguro?",
      text: "Si continuas saldras de la página",
      icon: "warning",
      buttons: ["Cancelar","Continuar"],
       dangerMode: true,
    })
    .then(respuesta=>{
        if(respuesta==="Continuar"){
            //falta añadir un enlace para que en caso de querer salir nos lleve a otra página
        }
    })
  };



  return (
    <>
      <nav className="nav">
        <section className='primeraColumna'>
          <img src={logo}></img>
        </section>
        <section className='segundaColumna'>
          <a href='#' onClick={modalBotones}>Logout</a>
        </section>

      </nav>
    </>
  )
}

export default NavBar;