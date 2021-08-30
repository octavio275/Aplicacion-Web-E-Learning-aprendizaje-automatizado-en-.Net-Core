import * as Constant from "./Constant.js"

const GetRegistro = () => {
    let url = "https://localhost:44326/api/Registro/ConClase";
    return fetch(url, {
        method:"GET",
        headers: {
            "Authorization": "Bearer" + localStorage.getItem("token")
        }
    })
            .then(response => { 
                return response.json()
            })
            .then(json => {
                return json;
            })
            .catch(err => console.log('ERROR: ' + err))
}

export default GetRegistro;

