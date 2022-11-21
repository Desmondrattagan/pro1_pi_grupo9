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
let baseUrl = 'https://api.themoviedb.org/3/search/movie?api_key=';

let urlbusqueda = "".concat(baseUrl+api_key+'&language=en-US&page=1&include_adult=false&query='+pelicula)


let urlp =  `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&page=1&include_adult=false`

fetch(urlbusqueda)
.then(function(response) {
    return response.json();
}
).then(function(data){
    let listaResultados = data.results;
    let contenedorSearch = document.getElementById("contenedorSearch");
    console.log(listaResultados)
    if (listaResultados.length !== 0 ){
        for( var i = 0; i < listaResultados.length; i++) {
        id = listaResultados[i].id
        contenedorSearch.innerHTML += '<article class="pelicula"><img class="imagenes" src="https://image.tmdb.org/t/p/original/'+ listaResultados[i].poster_path +'"><a class="nombres" href="./details_peliculas.html?id='+ id +'">'+ listaResultados[i].title +'</a></article >'
        }
    } else {
    contenedorSearch.innerHTML += "<h1>No hay resultados para su busqueda</h1>"
    }


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



