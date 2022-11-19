/* Defino las URL */
let api_key = 'bc6a66de00e3debea99fdcf92ffc0ab7';
let urlGenerosPeliculas = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
let urlGenerosSeries = `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;

/* ID */
let qs = location.search;
let qsObj = new URLSearchParams(qs);   
let id = qsObj.get('id');
id = parseInt(id)

/* Peliculas */
fetch(urlGenerosPeliculas)
    .then(function(response){
        return response.json();

    }).then(function(data){
        let contenedor = document.querySelector('.generosPeliculas')
        let array = data.results;
        console.log(array)
        let listaPeliculasGeneros = '';

        for (let i = 0; i < 100; i++) {
            let pelicula = array[i];
            let genre_ids = pelicula.genre_ids
            if(genre_ids.includes(id)){
                let annio = pelicula.release_date.slice(0,4)
                listaPeliculasGeneros += `<article class="peliculas">
                                                <a href="./details_peliculas.html?id=${id}"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${pelicula.poster_path}"></a>
                                                
                                                <a class="nombres" href="./details_peliculas.html?id=${id}">${pelicula.title}</a>

                                                <a class="nombres" href="./details_peliculas.html?id=${id}">${annio}</a>

                                                <a class="vermas" href="./details_peliculas.html?id=${id}">Ver mas</a>
                                        </article>`
                contenedor.innerHTML=listaPeliculasGeneros
            }

        }return data;

    }).catch(function (error) {
        return error;
});

/* Series */
fetch(urlGenerosSeries)
    .then(function(response){
        return response.json();

    }).then(function(data){
        let contenedor = document.querySelector('.generosSeries')
        let array = data.results;
        console.log(array)
        let listaPeliculasGeneros = '';

        for (let i = 0; i < 100; i++) {
            let pelicula = array[i];
            let genre_ids = pelicula.genre_ids
            if(genre_ids.includes(id)){
                let annio = pelicula.release_date.slice(0,4)
                listaPeliculasGeneros += `<article class="peliculas">
                                                <a href="./details_peliculas.html?id=${id}"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${pelicula.poster_path}"></a>
                                                
                                                <a class="nombres" href="./details_peliculas.html?id=${id}">${pelicula.title}</a>

                                                <a class="nombres" href="./details_peliculas.html?id=${id}">${annio}</a>

                                                <a class="vermas" href="./details_peliculas.html?id=${id}">Ver mas</a>
                                        </article>`
                contenedor.innerHTML=listaPeliculasGeneros
            }

        }return data;

    }).catch(function (error) {
        return error;
});