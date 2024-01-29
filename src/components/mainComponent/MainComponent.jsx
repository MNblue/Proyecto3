import { useState } from 'react'
import './MainComponent.css'
import swal from 'sweetalert';
import { UserService } from "./userService";


function MainComponent() {


    const [userObject, setUserObject] = useState({
        id: 0,
        nombre: "",
        apellido: "",
        apellido2: "",
        email: "",
        telefono: ""
    });

    const [userListObject, setUserListObject] = useState([]);

    //esta es la función que carga los datos almacenados en el json
    async function getData() {
        //accedo a UserService, en concreto a su métod GET. Como este método al ejecutarse retorna los datos de los usuarios,
        //lo que almaceno en la variable users son esos datos.
        let users = await UserService.getAllUsers();
        //ahora actualizo el estado de userList con esta variable (usuarios)
        setUserListObject(users);
    };

    //LLamo a getData() Si no los datos no vienen nunca!!!!
    getData();

    async function upData(newUser) {
        let respuesta = await UserService.submitUser(newUser);
    }

    //esta función coge el valor de "user" usando "setUser" y le asigna el valor del input, siendo el evento que dispara esta función
    //cualquier cambio que un usuario haga en el input al editarlo
    function handleNameChange(e) {
        setUserObject({ ...userObject, nombre: e.target.value });
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

    //ventana modal
    function modalBotones(titulo, texto, icono, danger) {
        swal({
            title: titulo,
            text: texto,
            icon: icono,
            buttons: "Continuar",
            dangerMode: danger,
            closeOnClickOutside: false,
            closeOnEsc: false,
        });
    }



    //a tráves del evento de click (onclick) del botón se ejecuta esta función, que guarda en un array la variable user mediante el
    //"setUserList"
    function handleAddUserToList() {

        //checkFormValidity();

        if (checkFormValidity()) {
            //si todos los campos estan llenos antes de guardarlos verificamos el email
            if (!validarEmail()) {
                modalBotones("Email Incorrecto", "El e-mail introducido no tiene el formato correcto", "error", true);
            } else {
                let cont = userListObject.length + 1;
                // setUserListObject(prevUserList => [...prevUserList, userObject]);
                let newUser = {
                    id: 0,
                    nombre: "",
                    apellido: "",
                    apellido2: "",
                    email: "",
                    telefono: ""
                }
                newUser.nombre = userObject.nombre;
                newUser.apellido = userObject.apellido;
                newUser.apellido2 = userObject.apellido2;
                newUser.email = userObject.email;
                newUser.telefono = userObject.telefono;
                newUser.id = cont;

                upData(newUser);


                //aquí volvemos a usar useState para qué para resetear el imput
                setUserObject({
                    id: 0,
                    nombre: "",
                    apellido: "",
                    apellido2: "",
                    email: "",
                    telefono: ""
                });
                modalBotones("Enhorabuena", "Los datos del alumno se han guardado con exito.", "success", false);
            }
        } else {
            modalBotones("Campos vacíos", "Debes completar todos los campos", "error", true);
        }

    }

    //VALIDACIONES DEL FORMULARIO ...............

    //chequeamos que todos los campos del formulario estan llenos y cambiamos la variable de estado según el caso.
    const checkFormValidity = () => {
        let auxiliarUser = {
            id: userObject.id.toString(),
            nombre: userObject.nombre,
            apellido: userObject.apellido,
            apellido2: userObject.apellido2,
            email: userObject.email,
            telefono: userObject.telefono
        };

        const isFormValid = Object.values(auxiliarUser).every((value) => value.trim() !== '');
        return isFormValid;
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



    return (
        <>
            <section className="form_content">
                <form id="registro_datos">
                    <label htmlFor='txtName'>Nombre</label>
                    <input type="text" name="txtName" id="txtName" required maxLength="12" value={userObject.nombre} onChange={handleNameChange} />

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
                        <button type='button' className='btnForm' onClick={handleAddUserToList} >Añadir Alumno</button>
                    </span>
                </form>
                <section className='mostrarDatos'>
                    <section className="seccion_datos">
                        <table id="tablaDatos" className="tablaDatos" >
                            <thead className="tablaHead">
                                <tr>
                                    <th name="celdaName" id="celdaNombre">Nombre</th>
                                    <th name="celdaApellido1" id="celdaApellido">Apellido 1</th>
                                    <th name="celdaApellido2" id="celdaApellido2">Apellido 2</th>
                                    <th name="celdaRol" id="celdaEmail">Email</th>
                                    <th name="celdaClase" id="celdaTelefono">Teléfono</th>
                                    
                                    <th name="celdaBtnEliminar" id="celdaBtnEliminar">Eliminar</th>
                                    <th name="celdaBtnEditar" id="celdaBtnEditar">Editar</th>
                                </tr>
                            </thead>
                            <tbody>                               
                                {
                                    userListObject.map((user, index) => (
                                        <tr>
                                            <th>{user.nombre}</th>
                                            <th>{user.apellido}</th>
                                            <th>{user.apellido2}</th>
                                            <th>{user.email}</th>
                                            <th>{user.telefono}</th>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </section>
                </section>
            </section>



        </>
    )
}

export default MainComponent
