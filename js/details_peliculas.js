/* ID */
let qs = location.search;
let qsObj = new URLSearchParams(qs);   
let id = qsObj.get('id'); 

/* API */
let api_key = 'bc6a66de00e3debea99fdcf92ffc0ab7';
let urlDetalle = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US&append_to_response=palabrabuscar`;
let urlTrailer = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}&language=en-US`;
let urlPlataformas = `https://api.themoviedb.org/3/watch/providers/movie?api_key=${api_key}&language=en-US`;

/* seleccionar todos los elementos del DOM */
let imagen     = document.querySelector('.imagendetails');
let contenedor = document.querySelector('.contenedortitulodetails');

/* COMPLETO EL HTML */
fetch(urlDetalle)
.then(function(response) {
    return response.json();

}).then(function(data) {
    //portada
    imagen.src = `https://image.tmdb.org/t/p/original/${data.poster_path}`;
    //generos
    let generos = data.genres;
    let textogenero = "";
    for (let i = 0; i < generos.length ; i++) {
        textogenero += `<a class="datos" href="./genre_details.html">•${generos[i].name} </a>` 
    }
    let textodetail = `<h1 class="titulodetails">${data.title}</h1> 
                       <ul class="listaDatos">
                            <li class="datos" id="calificacion">Rating: ${data.vote_average}</li>
                            <li class="datos" id="estreno">Release date: ${data.release_date}</li>
                            <li class="datos" id="duracion">Duration: ${data.runtime}</li>
                            <li class="datos" id="genero">Generos: ${textogenero}</li>
                       </ul>
                    <p class="sinopsis">${data.overview}</p>
                    <div class="plataformasdiv"></div>`
        contenedor.innerHTML=textodetail
    
}).catch(function (error) {
    return error;
});

/* PLATAFORMAS */
fetch(urlPlataformas)
.then(function(response) {
    return response.json();

}).then(function(data) {
    let plataformas = document.querySelector('.plataformasdiv');
    let array = data.results;
    let texto = "<h2>Providers:</h2>"
    for(let i=0; i < 12; i++){
        texto += `<img class="plataformas" src="https://image.tmdb.org/t/p/original/${array[i].logo_path}"></a>`
    }
    plataformas.innerHTML=texto

}).catch(function (error) {
    return error;
});

/* TRAILER */
/* fetch(urlTrailer)
    .then(function(response){
        return response.json();

    }).then(function(infoTrailer){
        let trailer = document.querySelector('.contenedorTrailer');
        if (infoTrailer.results.length > 0) {
        let texto = ""
            for(let i=0; i < 1; i++){ 
                let trailer = infoTrailer.results[i]
                if (trailer.key != undefined){
                    let video = infoTrailer.results[i].key
                    texto += `<article class="trailer">
                                <iframe src="https://www.youtube.com/embed/${video}" title="YouTube video player" width=491px height=200px frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </article>`
                }
            }
        trailer.innerHTML = texto
    
    }else {
        trailer.innerText = "NO TRAILER AVAILABLE"
       }
    }).catch(function(error){
    return error;
}) */


/* RECOMENDACIONES  */
let botRec = document.querySelector("#recom")



botRec.onclick = function(event) {
    
    if(event.target == recom) {
        recom.style.display = "none"
        let recomendaciones = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${api_key}&language=en-US&page=1`

    fetch(recomendaciones)
    .then(function (respuesta) {
            return respuesta.json()
    })
    .then(function (informacion) {

        for (var i = 0; i < 5; i++) {
            let listadoRecomendadas = document.querySelector(".containerPeliculas")
            let id = informacion.results[i].id
            let title = informacion.results[i].title
            let annio = informacion.results[i].release_date.slice(0,4);
            let poster = `https://image.tmdb.org/t/p/original/${informacion.results[i].poster_path}`
            
            if (informacion.results[i].poster_path == null) {
                poster =  `/Users/aldanamariagarnero/Desktop/Programacion1/pro1_pi_grupo9/img/noDisponible.jpg`
            }else {
                poster = `https://image.tmdb.org/t/p/original/${informacion.results[i].poster_path}`
            }

            listadoRecomendadas.innerHTML +=  `<article class="peliculas">
                                <a href="./Details_peliculas.html?id=${id}"> <img class="imagenes" src="${poster}"></a>
                                
                                <a class="nombres" href="./Details_peliculas.html?id=${id}">${title}</a>

                                <a class="nombres" href="./Details_peliculas.html?id=${id}">${annio}</a>

                                <a class="vermas" href="./detallePeliculas.html?id=${id}">Ver mas</a>
                            </article >`

            botClose.style.display = "block"
    }
    
})
    }
}

let botClose = document.querySelector("#recomClose")
    botClose.onclick = function(event) {
        if(event.target == recomClose) {
            botRec.style.display = "block"
            botClose.style.display= 'none'
            
                
            





  
    recom.style.display = "block";
 }
}

var closeRecoModal = document.querySelector(".close-reco");
  closeRecoModal.onclick = function() {
  recoModal.style.display = "none";
 }




/* BOTON FAVORITOS */
let lista_peliculas_favoritas = []; 
let storage = localStorage.getItem('lista_peliculas_favoritas')
let favoritos = document.querySelector(".botonfavorites")

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