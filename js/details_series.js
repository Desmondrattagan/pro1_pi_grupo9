/* API KEY */
let api_key='bc6a66de00e3debea99fdcf92ffc0ab7';

/* ID */
let qs=location.search;
let qsObj=new URLSearchParams(qs);    
let id=qsObj.get('id'); 

/* ELEMENTOS DEL DOM */
let imagen=document.querySelector('.imagendetails');
let contenedor=document.querySelector('.contenedortitulodetails');

/* COMPLETO EL HTML */
let urldetalle=`https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=en-US`;
fetch(urldetalle)
.then(function(response) {
    return response.json();

}).then(function(data) {
    //portada
    imagen.src=`https://image.tmdb.org/t/p/original/${data.poster_path}`;
    //generos
    let generos=data.genres;
    let textogenero="";
    for (let i=0; i<generos.length; i++) {
        textogenero+=`<a class="datos" href="./genre_details.html?id=${generos[i].id}&name=${generos[i].name}">•${generos[i].name} </a>` 
    }
    //html
    let textodetail=`<h1 class="titulodetails">${data.name}</h1>
                    <div class="plataformasdiv"></div>
                    <ul class="listaDatos">
                        <li class="datos" id="calificacion">Rating: ${data.vote_average}</li>
                        <li class="datos" id="estreno">Release date: ${data.first_air_date}</li>
                        <li class="datos" id="genero">Generos: ${textogenero}</li>
                    </ul>
                    <p class="sinopsis">${data.overview}</p>
                    <div class="trailerPrincipal"></div>`
    contenedor.innerHTML=textodetail;
    return data;

}).catch(function (error) {
    return error;
});

/* PLATAFORMAS */
let urlPlataformas=`https://api.themoviedb.org/3/watch/providers/tv?api_key=${api_key}&language=en-US`;
fetch(urlPlataformas)
.then(function(response) {
    return response.json();

}).then(function(data) {
    let plataformas=document.querySelector('.plataformasdiv');
    let array=data.results;
    let texto="";
    for(let i=0; i<6; i++){
        texto+=`<img class="plataformas" src="https://image.tmdb.org/t/p/original/${array[i].logo_path}"></a>`
    }
    plataformas.innerHTML=texto;
    return data;

}).catch(function (error) {
    return error;
});

/* TRAILER */
let trailers=document.querySelector(".videos");
let videos="";
let urlTrailer=`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${api_key}&language=en-US`;
fetch(urlTrailer)
    .then(function(response) {
        return response.json();

    }).then(function(infoTrailer){
        if (infoTrailer.results.length > 0) {
            for(let i=1; i<infoTrailer.results.length ; i++){ 
                let trailer=infoTrailer.results[i];
                if (trailer.key != undefined){
                    /* Agrego trailers */
                    let video=infoTrailer.results[i].key;
                    videos+=`<p class="titulosTrailer">${infoTrailer.results[i].name}</p>
                            <article class="trailer">
                                <iframe src="https://www.youtube.com/embed/${video}" title="YouTube video player" width=491px height=230px frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </article>`
                /* Agrego el primer trailer (principal) */
                let trailerPrincipal=document.querySelector(".trailerPrincipal")
                trailerPrincipal.innerHTML=`<iframe src="https://www.youtube.com/embed/${infoTrailer.results[0].key}" title="YouTube video player" width=450px height=190px frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                }
            }
        let botTrailer=document.querySelector(".Trailer");
        botTrailer.addEventListener("click", function() {
                if(botTrailer.innerHTML == "See more trailers") {
                    this.innerText="Close trailers";
                    trailers.innerHTML=videos;
                }else {
                    this.innerText="See more trailers";
                    trailers.innerHTML="";
                }
            });
    }else {
        let botTrailer=document.querySelector(".Trailer");
        botTrailer.addEventListener("click", function() {
            if(botTrailer.innerHTML == "See more trailers") {
                this.innerText="Close trailers";
                trailers.innerHTML='<p class="sinFavoritos">No trailer available</p>'
            }else {
                this.innerText="See more trailers";
                trailers.innerHTML="";
            }
            });
       }return infoTrailer

    }).catch(function(error){
    return error;
});

/* RECOMENDACIONES  */
let peliculas=document.querySelector(".containerPeliculas");
let contenido="";
let recomendaciones=`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${api_key}&language=en-US&page=1`;
fetch(recomendaciones)
    .then(function (respuesta) {
            return respuesta.json();
            
    }).then(function (informacion) {
        for (let i=0; i<5; i++) {
            let id=informacion.results[i].id;
            let title=informacion.results[i].name;
            let annio=informacion.results[i].first_air_date.slice(0,4);
            contenido+=`<article class="peliculas">
                                <a href="./Details_peliculas.html?id=${id}"><img class="imagenes" src="https://image.tmdb.org/t/p/original/${informacion.results[i].poster_path}"></a>
                                
                                <a class="nombres" href="./Details_peliculas.html?id=${id}">${title}</a>

                                <a class="nombres" href="./Details_peliculas.html?id=${id}">${annio}</a>

                                <div class="uk-animation-toggle" tabindex="0">
                                    <div class="uk-animation-shake">
                                        <p class="uk-text-center"><a class="vermas" href="./details_peliculas.html?id=${id}">See more</a></p>
                                    </div>
                                </div>
                        </article>`
            let botRec=document.querySelector(".Recom");
            botRec.addEventListener("click", function() {
                if(botRec.innerHTML == "See recommendations") {
                    this.innerText="Close recommendations";
                    peliculas.innerHTML=contenido;
                }else {
                    this.innerText="See recommendations";
                    peliculas.innerHTML="";
                }
            });
        }return informacion

    }).catch(function(error){
        return error;
});

/* BOTON FAVORITOS */
let lista_series_favoritas=[]; 
let storage=localStorage.getItem('lista_series_favoritas')
let favoritos=document.querySelector(".botonfavorites");

if(storage != null) {
    lista_series_favoritas=JSON.parse(storage);
}
if (lista_series_favoritas.includes(id)) {
    favoritos.innerText="❌ Remove from favorites";
}
favoritos.addEventListener("click", function(e) {
    e.preventDefault()
    if(lista_series_favoritas.includes(id)) {
        let indice=lista_series_favoritas.indexOf(id);
        lista_series_favoritas.splice(indice,1);
        favoritos.innerText="💜 Add to favorites";
    }else{
        lista_series_favoritas.push(id);
        favoritos.innerText="❌ Remove from favorites";
    }
    let favToString=JSON.stringify(lista_series_favoritas);
    localStorage.setItem('lista_series_favoritas',favToString)
});

/* BUSCADOR (form) */
let form=document.querySelector('#form');
let input=document.querySelector('#palabraPelicula');
form.addEventListener('submit', function(evento) {
    evento.preventDefault();
    if (input.value == "") {
        alert('It is not possible to send an empty form');
    } else if(input.value.length <3){
        alert('More than three characters must be written');
    } else {
        form.submit();
    }
});

/* LOADER */
window.addEventListener('load', function() {
    this.document.getElementById('loader').classList.toggle('loader2')
});