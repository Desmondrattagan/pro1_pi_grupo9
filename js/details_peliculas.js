/* ID */
let qs = location.search;
let qsObj = new URLSearchParams(qs);   
let indice = qsObj.get('i');  

/* API */
let api_key = 'bc6a66de00e3debea99fdcf92ffc0ab7';
let urlPeliculas = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;

/* seleccionar todos los elementos del DOM */
let imagen  = document.querySelector('.imagendetails');
let titulo  = document.querySelector('.titulodetails');
let calificacion = document.querySelector("#calificacion");
let estreno = document.querySelector("#estreno");
let duracion = document.querySelector("#duracion");
let genero = document.querySelector("#genero");
let sinopsis = document.querySelector(".sinopsis");
let plataformas = document.querySelector("#plataformas");

/* COMPLETO EL HTML */
fetch(urlPeliculas)
.then(function(response){
    return response.json();

}).then(function(data){
    console.log(data.results[indice]);
    let array = data.results[indice];
    
    titulo.innerText = array.title;
    calificacion.innerText = "Rating: "  + array.vote_average;
    estreno.innerText = "Release date: " + array.release_date;
    /* duracion.innerText =
    genero.innerText = */
    sinopsis.innerText = array.overview;
    /* plataformas.innerText = array */
    imagen.src = "https://image.tmdb.org/t/p/original/" + array.poster_path;

    return data;
}).catch(function (error) {
    return error;
});


