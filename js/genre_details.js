/* Defino las URL */
let api_key = 'bc6a66de00e3debea99fdcf92ffc0ab7';
let urlGenerosPeliculas = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
let urlGenerosSeries = `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;

/* ID */
let qs = location.search;
let qsObj = new URLSearchParams(qs);   
let id = qsObj.get('id');
id = parseInt(id)
let name = qsObj.get('name')
let urlSeriesGenero= 'https://api.themoviedb.org/3/discover/tv?api_key='+ api_key +'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' + id
let urlPeliculasGenero= 'https://api.themoviedb.org/3/discover/movie?api_key='+ api_key +'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' + id

let tituloPeliculas = document.querySelector('.tituloPelicula');
tituloPeliculas.innerText+=  name + ' Movies';
let tituloSeries = document.querySelector('.tituloSeries');
tituloSeries.innerText+= name + ' Series';
/* Peliculas */
fetch(urlPeliculasGenero)
    .then(function(response){
        return response.json();

    }).then(function(data){
        let contenedor = document.querySelector('.generosPeliculas')
        let array = data.results;
        console.log(array)
        let listaPeliculasGeneros = '';

        for (let i = 0; i < 14; i++) {
            let pelicula = array[i];
            let idPeli = pelicula.id
            let annio = pelicula.release_date.slice(0,4)
                listaPeliculasGeneros += `<article class="peliculas">
                                                <a href="./details_peliculas.html?id=${idPeli}"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${pelicula.poster_path}"></a>
                                                
                                                <a class="nombres" href="./details_peliculas.html?id=${idPeli}">${pelicula.title}</a>

                                                <a class="nombres" href="./details_peliculas.html?id=${idPeli}">${annio}</a>

                                                <a class="vermas" href="./details_peliculas.html?id=${idPeli}">Ver mas</a>
                                        </article>`
                                        
            }
            contenedor.innerHTML=listaPeliculasGeneros
            return data;

    }).catch(function (error) {
        return error;
});

/* Series */
fetch(urlSeriesGenero)
    .then(function(response) {
        return response.json();

    }).then(function(data) {
        let contenedor = document.getElementById('series');
        let arraySeries = data.results;
        let listaSeries = '';

        for (let i = 0; i < 14; i++) {
            let serie = arraySeries[i];
            let idSerie = arraySeries[i].id;
            let annio = serie.first_air_date.slice(0,4);
            listaSeries += `<article class="peliculas">
                                <a href="./details_series.html?id=${idSerie}"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${serie.poster_path}"></a>
                                        
                                <a class="nombres" href="./details_series.html?id=${idSerie}">${serie.name}</a>

                                <a class="nombres" href="./details_series.html?id=${idSerie}">${annio}</a>

                                <a class="vermas" href="./details_series.html?id=${idSerie}">Ver mas</a>
                            </article >`
        }
        contenedor.innerHTML+=listaSeries
        return data;

    }).catch(function (error) {
        return error;
    });