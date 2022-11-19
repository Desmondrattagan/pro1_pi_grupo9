/* ID */
let qs = location.search;
let qsObj = new URLSearchParams(qs);   
let id = qsObj.get('id'); 

/* API */
let api_key = 'bc6a66de00e3debea99fdcf92ffc0ab7';
let urlDetalle = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US&append_to_response=palabrabuscar`;
let urlTrailer = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}&language=en-US`;
let urlPlataformas = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${api_key}`

/* seleccionar todos los elementos del DOM */
let imagen          = document.querySelector('.imagendetails');
let titulo          = document.querySelector('.titulodetails');
let sinopsis        = document.querySelector('.sinopsis');
let trailer         = document.querySelector('.containerTrailer');
let favoritos       = document.querySelector('.botonfavorites');
/* Datos */
let calificacion    = document.querySelector('#calificacion');
let estreno         = document.querySelector('#estreno');
let duracion        = document.querySelector('#duracion');
let genero          = document.querySelector('#genero');
let plataformas     = document.querySelector('#plataformas');

/* COMPLETO EL HTML */
fetch(urlDetalle)
.then(function(response){
    return response.json();

}).then(function(data){
    //portada
    imagen.src = `https://image.tmdb.org/t/p/original/${data.poster_path}`

    //titulo
    titulo.innerText = data.title;

    //calificacion
    calificacion.innerText = "Rating: "  + data.vote_average;

    //fecha de estreno
    estreno.innerText = "Release date: " + data.release_date;

    //duracion
    duracion.innerText = "Duration: " + data.runtime

    //sinposis
    sinopsis.innerText = data.overview;

    //generos
    let generos = data.genres
    let texto = ""
    for (let i = 0; i < generos.length ; i++){
        texto += generos[i].name + " "
    }
    genero.innerText = "Genero: " + texto
    
}).catch(function (error) {
    return error;
});

/* PLATAFORMAS */
fetch(urlPlataformas)
.then(function(response){
    return response.json();

}).then(function(data){
    let array = data.results;
    console.log(data)
    let nombres = Object.keys(array)
    let texto = ""
    let clave = nombres[i]
    let logo = array.clave

}).catch(function (error) {
    return error;
});

/* TRAILER */
fetch(urlTrailer)
    .then(function(response){
        return response.json();

    }).then(function(infoTrailer){
       if (infoTrailer.results.length > 0) {
        let texto = ""
            for(let i=0; i < 1; i++){ 
                let trailer = infoTrailer.results[i]

                if (trailer.key != undefined){
                    let video = infoTrailer.results[i].key
                    texto += `<article>
                                    <iframe src="https://www.youtube.com/embed/${video}" title="YouTube video player" width=400px height=200px frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </article>`
                }
            }
            trailer.innerHTML = texto
    
    }else {
            trailer.innerText = "NO HAY TRAILER DISPONIBLE"
       }
    }).catch(function(error){
    return error;
})

/* BOTON FAVORITOS */

let lista_peliculas_favoritas = []; 
let storage = localStorage.getItem('lista_peliculas_favoritas')

if(storage != null){
    lista_peliculas_favoritas = JSON.parse(storage);
};

if (lista_peliculas_favoritas.includes(id)) {
    favoritos.innerText="❌ Remove from favorites";
}

favoritos.addEventListener("click", function(e) {
    e.preventDefault()

    if(lista_peliculas_favoritas.includes(id)){
        let indice = lista_peliculas_favoritas.indexOf(id);
        lista_peliculas_favoritas.splice(indice,1);
        favoritos.innerText="💜 Add to favorites";
    }else{
        lista_peliculas_favoritas.push(id);
        favoritos.innerText="❌ Remove from favorites";
    }

    let favToString = JSON.stringify(lista_peliculas_favoritas);
    localStorage.setItem('lista_peliculas_favoritas',favToString)

})