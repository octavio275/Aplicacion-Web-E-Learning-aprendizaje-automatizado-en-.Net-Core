

const GetProfesores = () => {
    debugger
    let url = "https://localhost:44302/api/Profesor";
    return fetch(url, {
        method:"GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("Token")
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

export default GetProfesores;

