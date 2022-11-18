/* BUSCADOR (form) */
let form = document.querySelector('#form')
let input = document.querySelector('#palabraPelicula')

form.addEventListener('submit', function(evento) {
    evento.preventDefault();

    if (input.value == "") {
        alert('No puedes enviar un form vacio')
    } else if(input.value.length <3){
        alert('Debes escribir mas de 3 caracteres')
    } else {
        form.submit()
    }
})


/* PAGINA- resultado de busqueda */
let qs = location.search;
let objqs = new URLSearchParams(qs);
let pelicula = objqs.get('buscador')
let titulo = document.querySelector(".titulosearch")
titulo.innerText = "Results for: " + pelicula
let api_key = 'bc6a66de00e3debea99fdcf92ffc0ab7';

let urlp =  `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&page=1&include_adult=false`

fetch(urlp)
.then(function(response) {
    return response.json();
}
).then(function(data){
    console.log(data)
    return data;
}
).catch(function(error){
    return error;

}
);







let urls = 

fetch(urls)
.then(function(response) {
    return response.json();
}
).then(function(data){
    console.log(data)
    return data;
}
).catch(function(error){
    return error;

}
);



