import { useState } from 'react'
import './MainComponent.css'
import swal from 'sweetalert';


function MainComponent() {

    const [userObject, setUserObject] = useState({
        name: "",
        apellido: "",
        apellido2: "",
        email: "",
        telefono: ""
    });

    const [userListObject, setUserListObject] = useState([]);
    //deshabilitamos el botón inicialmente, solo se habilita cuando hemos llenado todos los campos del formulario
    const [isAllComplete, setIsAllComplete] = useState(false);


    //esta función coge el valor de "user" usando "setUser" y le asigna el valor del input, siendo el evento que dispara esta función
    //cualquier cambio que un usuario haga en el input al editarlo
    function handleNameChange(e) {
        setUserObject({ ...userObject, name: e.target.value });
    };

    function handleApellidoChange(e) {
        setUserObject({ ...userObject, apellido: e.target.value });
    };

    function handleApellido2Change(e) {
        setUserObject({ ...userObject, apellido2: e.target.value });
    };

    function handleEmailChange(e) {
        setUserObject({ ...userObject, email: e.target.value });
    };

    function handleTelefonoChange(e) {
        setUserObject({ ...userObject, telefono: e.target.value });
    };

    //a tráves del evento de click (onclick) del botón se ejecuta esta función, que guarda en un array la variable user mediante el
    //"setUserList"
    function handleAddUserToList() {

        checkFormValidity();

        if (isAllComplete) {
            //si todos los campos estan llenos antes de guardarlos verificamos el email
            if (!validarEmail()) {
                modalBotones();
            } else {
                setUserListObject(prevUserList => [...prevUserList, userObject])
                //aquí volvemos a usar useState para qué para resetear el imput
                setUserObject({
                    name: "",
                    apellido: "",
                    apellido2: "",
                    email: "",
                    telefono: ""
                });
                setIsAllComplete(false);
            }
        }

    }

    //VALIDACIONES DEL FORMULARIO ...............

    //chequeamos que todos los campos del formulario estan llenos y cambiamos la variable de estado según el caso.
    const checkFormValidity = () => {
        const isFormValid = Object.values(userObject).every((value) => value.trim() !== '');
        setIsAllComplete(isFormValid);
    };

    function validarEmail() {
        let email = userObject.email;

        // Expresión regular para validar el formato del correo electrónico
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Verificar si el correo electrónico cumple con la expresión regular
        if (regex.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    //ventana modal
    const modalBotones = () => {
        swal({
            title: "Email incorrecto",
            text: "El e-mail introducido no tiene el formato correcto",
            icon: "error",
            buttons: "Continuar",
            dangerMode: true,
        })
    };

    return (
        <>
            <section className="form_content">

                <form id="registro_datos">
                    <label htmlFor='txtName'>Nombre</label>
                    <input type="text" name="txtName" id="txtName" required maxLength="12" value={userObject.name} onChange={handleNameChange} />

                    <label htmlFor='txtApellido1'>Apellido 1</label>
                    <input type="text" name="txtApellido1" id="txtApellido1" required maxLength="12" value={userObject.apellido} onChange={handleApellidoChange} />

                    <label htmlFor='txtApellido2'>Apellido 2</label>
                    <input type="text" name="txtApellido2" id="txtApellido2" required maxLength="12" value={userObject.apellido2} onChange={handleApellido2Change} />

                    <label htmlFor='txtEmail'>E-mail</label>
                    <input type="text" name="txtEmail" id="txtEmail" required value={userObject.email} onChange={handleEmailChange} />

                    <label htmlFor='txtTelefono'>Teléfono</label>
                    <input type="text" name="txtTelefono" id="txtTelefono" required maxLength="9" value={userObject.telefono} onChange={handleTelefonoChange} />
                    <br></br>
                    <span className='colocarBtn'>
                        <button onClick={handleAddUserToList} >Añadir Alumno</button>
                    </span>
                </form>
                <section className='mostrarDatos'>
                    Mostrar datos
                    <ul>
                        {
                            userListObject.map((user, index) => (
                                <li key={index}> {user.name} {user.apellido} {user.apellido2} {user.email} {user.telefono}</li>
                            ))
                        }
                    </ul>
                </section>
            </section>



        </>
    )
}

export default MainComponent
