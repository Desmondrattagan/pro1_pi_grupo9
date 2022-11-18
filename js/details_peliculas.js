/* ID */
let qs = location.search;
let qsObj = new URLSearchParams(qs);   
let indice = qsObj.get('i');
let id = qsObj.get('id'); 

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
let trailer = document.querySelector(".trailer")

/* COMPLETO EL HTML */
fetch(urlPeliculas)
.then(function(response){
    return response.json();

}).then(function(data){
    let array = data.results;
    let pelicula = array[indice];
    
    titulo.innerText = pelicula.title;
    calificacion.innerText = "Rating: "  + pelicula.vote_average;
    estreno.innerText = "Release date: " + pelicula.release_date;
    /* duracion.innerText =
    genero.innerText = */
    sinopsis.innerText = pelicula.overview;
    /* plataformas.innerText = array */
    imagen.src = "https://image.tmdb.org/t/p/original/" + pelicula.poster_path;

    let urlTrailer = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}&language=en-US`;
    
    fetch(urlTrailer)
        .then(function(response){
            return response.json();

        }).then(function(infoTrailer){
            let video = infoTrailer.results[0].key
            for(let i=0; i<infoTrailer.results.length; i++){ 
                let pregunta = infoTrailer.results[i].name
                if (pregunta.includes["Trailer"]||pregunta.includes["trailer"]){
                    video = infoTrailer.results[i].key
                    texto += `<article>
                        <iframe class="trailerSearch" src="https://www.youtube.com/embed/${video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </article>`
                trailer.innerText = texto
                }else{
                    trailer.innerText = "No hay trailers disponibles"
                }
            }})

    .catch(function(error){
        return error;
    })

}).catch(function (error) {
    return error;
});