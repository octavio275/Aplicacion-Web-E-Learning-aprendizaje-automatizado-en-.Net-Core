/*const CreateCuestionario = (cuestionario) => {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cuestionario),
        mode: 'cors'
    };
    return fetch("https://localhost:44326/api/Cuestionario", options)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        })
        .catch(err => console.log('ERROR: ' + err))
}
export default CreateCuestionario;*/