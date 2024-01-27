import './Footer.css'

import logo5 from '../images/logo5.png'

function Footer() {


  return (
    <>
      <div className='footer'>
        <div className='copyR'>
          <img src={logo5}></img>
          <p>Copyright &copy; 2024 iMiK Software</p>
        </div>
        <div className='textoFooter'>
          <p>Contacto: 688 999 777</p>
          <p>Avda. de la tecnología 123, 29001 Málaga</p>
          <p>contacto@InstitutoSantaTecla.com</p>
        </div>
      </div>
    </>
  )
}

export default Footer;