/* ID Y NOMBRE */
let qs=location.search;
let qsObj=new URLSearchParams(qs);   
let id=qsObj.get('id');
id=parseInt(id)
let name = qsObj.get('name')

/* API KEY */
let api_key='bc6a66de00e3debea99fdcf92ffc0ab7';

let tituloPeliculas = document.querySelector('.tituloPelicula');
tituloPeliculas.innerText+=  name + ' Movies';
let tituloSeries = document.querySelector('.tituloSeries');
tituloSeries.innerText+= name + ' Series';

/* PELÍCULAS */
let urlPeliculasGenero='https://api.themoviedb.org/3/discover/movie?api_key='+ api_key +'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' + id;
fetch(urlPeliculasGenero)
    .then(function(response){
        return response.json();

    }).then(function(data){
        let contenedor = document.querySelector('.generosPeliculas')
        let array = data.results;
        let listaPeliculasGeneros = '';
        if (array.length > 0) {
            for (let i = 0; i < 15; i++) {
                let pelicula = array[i];
                let idPeli = pelicula.id
                let annio = pelicula.release_date.slice(0,4)
                listaPeliculasGeneros+=`<article class="peliculas">
                                                <a href="./details_peliculas.html?id=${idPeli}"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${pelicula.poster_path}"></a>
                                                
                                                <a class="nombres" href="./details_peliculas.html?id=${idPeli}">${pelicula.title}</a>

                                                <a class="nombres" href="./details_peliculas.html?id=${idPeli}">${annio}</a>

                                                <div class="uk-animation-toggle" tabindex="0">
                                                    <div class="uk-animation-shake">
                                                        <p class="uk-text-center"><a class="vermas" href="./details_peliculas.html?id=${id}">See more</a></p>
                                                    </div>
                                                </div> 
                                        </article>`
            }contenedor.innerHTML=listaPeliculasGeneros;
        }else{
            contenedor.innerHTML = '<p class="sinFavoritos" >No movies available for this genre</p>'
        }return data;

    }).catch(function (error) {
        return error;
});

/* SERIES */
let urlSeriesGenero='https://api.themoviedb.org/3/discover/tv?api_key='+ api_key +'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' + id;
fetch(urlSeriesGenero)
    .then(function(response) {
        return response.json();

    }).then(function(data) {
        let contenedor = document.querySelector('.generosSeries')
        let arraySeries = data.results;
        let listaSeriesGeneros = '';
        if (arraySeries.length > 0) {
            for (let i = 0; i < 15; i++) {
            let serie = arraySeries[i];
            let idSerie = arraySeries[i].id;
            let annio = serie.first_air_date.slice(0,4);
            listaSeriesGeneros += `<article class="peliculas">
                                <a href="./details_series.html?id=${idSerie}"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${serie.poster_path}"></a>
                                        
                                <a class="nombres" href="./details_series.html?id=${idSerie}">${serie.name}</a>

                                <a class="nombres" href="./details_series.html?id=${idSerie}">${annio}</a>

                                <div class="uk-animation-toggle" tabindex="0">
                                    <div class="uk-animation-shake">
                                        <p class="uk-text-center"><a class="vermas" href="./details_peliculas.html?id=${id}">See more</a></p>
                                    </div>
                                </div> 
                            </article >`
            }
            contenedor.innerHTML+=listaSeriesGeneros;
        }else{
            contenedor.innerHTML = '<p class="sinFavoritos" >No series available for this genre</p>'
        }return data;

    }).catch(function (error) {
        return error;
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