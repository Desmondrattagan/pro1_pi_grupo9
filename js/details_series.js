/* ID */
let qs = location.search;
let qsObj = new URLSearchParams(qs);    
let id = qsObj.get('id'); 

/* API */
let api_key = 'bc6a66de00e3debea99fdcf92ffc0ab7';
let urldetalle = `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=en-US`;
let urlTrailer = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${api_key}&language=en-US`

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
fetch(urldetalle)
    .then(function(response){
        return response.json();

    }).then(function(data){
        titulo.innerText = data.name;
        sinopsis.innerText = data.overview;
        calificacion.innerText = "Rating: "  + data.vote_average;
        estreno.innerText = "Release date: " + data.first_air_date;
        let generos = data.genres
        let texto = ""
        for (let i = 0; i < generos.length ; i++){
            texto += generos[i].name + " "
        }
        genero.innerText = "Genres: " + texto /* <a href="./Genre_details.html"></a> */
        imagen.src = `https://image.tmdb.org/t/p/original/${data.poster_path}`

    }).catch(function (error) {
        return error;
});

    
fetch(urlTrailer)
    .then(function(response){
        return response.json();

    }).then(function(infoTrailer){
        console.log(infoTrailer)
        if (infoTrailer.results.length > 0) {
            let texto = ""
            for(let i=0; i < 1; i++){ 
                let trailer = infoTrailer.results[i]
                if (trailer.key != undefined){
                    let video = infoTrailer.results[i].key
                    console.log(video)
                    texto += `<article class="trailer">
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



/* Boton favoritos */

let lista_series_favoritas = []; 
let storage = localStorage.getItem('lista_series_favoritas')

if(storage != null){
    lista_series_favoritas = JSON.parse(storage);
};

if (lista_series_favoritas.includes(id)) {
    favoritos.innerText="❌ Remove from favorites";
}

favoritos.addEventListener("click", function(e) {
    e.preventDefault()

    if(lista_series_favoritas.includes(id)){
        let indice = lista_series_favoritas.indexOf(id);
        lista_series_favoritas.splice(indice,1);
        favoritos.innerText="💜 Add to favorites";
    }else{
        lista_series_favoritas.push(id);
        favoritos.innerText="❌ Remove from favorites";
    }

    let favToString = JSON.stringify(lista_series_favoritas);
    localStorage.setItem('lista_series_favoritas',favToString)

})

/* BUSCADOR (form) */
let form = document.querySelector('#form');
let input = document.querySelector('#palabraPelicula');

form.addEventListener('submit', function(evento) {
    evento.preventDefault();

    if (input.value == "") {
        alert('No puedes enviar un form vacio');
    } else if(input.value.length <3){
        alert('Debes escribir mas de 3 caracteres');
    } else {
        form.submit();
    }
})