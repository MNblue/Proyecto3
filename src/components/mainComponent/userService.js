import axios from "axios";

//importamos axios y creamos una instancia de axios. Digamos que todas las solicitudes van a tener esta misma base 
// en la que definimos la base común del endpoint, que es la url que luego completamos en cada método, y definimos también el 
//encabezado con el tipo de datos correcto para que la solicitud se admita.
const apiClient = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})


//construimos un objeto con los distintos métodos para hacer CRUD. Como lo exportamos, lo importamos en el componente y allí
//estará accesible con todos los métodos que contenga
export const UserService = {

    //este es el método GET que trae los datos almacenados
    async getAllUsers() {

        //guardamos en una variable toda la respuesta que nos devuelve la API, que contiene más información además de los
        //datos almacenados
        let response = await apiClient.get("/users");

        //de esa respuesta, accedo a "data", que es la parte de la respuesta en la están los datos almacenados en la base de datos
        let allUsers = response.data

        //retornamos esta variable que contiene "data". Al ejecutar esta función obtenemos esta "data"
        return allUsers;

    },

    async submitUser(user) {

        let updatedResponse = await apiClient.post("/users", user);
        return updatedResponse;

    },

    async deleteUser(index){
            // let respuesta = await apiClient.delete(`/users/${index}`);
            // return respuesta;

            try {
                const url = `/users/${index}`;
                // const url = "http://localhost:3000/users/3"
                console.log('URL de la solicitud de eliminación:', url);
                
                let respuesta = await apiClient.delete(url);
                console.log('Usuario eliminado:', respuesta);
        
                // Devuelve la respuesta de la eliminación o realiza la lógica de actualización
                return respuesta;
            } catch (error) {
                console.error('Error al eliminar el usuario:', error.response ? error.response.data : error.message);
        
                // Devuelve null o lanza una excepción según sea necesario
                return null;
            }
    },


    async updateUser(user,index) {

        let updatedResponse = await apiClient.patch(`/users/${user.id}`, user);
        return updatedResponse;
    },

}