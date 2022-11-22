/* Defino las URL */
let api_key = 'bc6a66de00e3debea99fdcf92ffc0ab7';
let urlPeliculas = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;
let urlSeries = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`;
let urlVistas = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`;
let urlSlider = `https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=en-US&page=1`;

/* Slider */
fetch(urlSlider)
    .then(function(response) {
        return response.json();

    }).then(function(data) {
        let contenedor = document.getElementById('slider');
        let array = data.results;
        let listaPeliculas = '';

        for (let i = 0; i < 8; i++) {
            let pelicula = array[i];
            let id = array[i].id;
            listaPeliculas += '<div class=carrou> <a href="./details_series.html?id='+id+'"> <img class="imgCarrou" src="https://image.tmdb.org/t/p/original/'+pelicula.poster_path+'" width="" height="" alt=""></a></div>'
            contenedor.innerHTML=listaPeliculas
        }return data;

    }).catch(function (error) {
        return error;
});

/* Películas */
fetch(urlPeliculas)
    .then(function(response) {
        return response.json();

    }).then(function(data) {
        let contenedor = document.querySelector('.Peliculas');
        let array = data.results;
        let listaPeliculas = '';

        for (let i = 0; i < 5; i++) {
            let pelicula = array[i];
            let id = array[i].id;
            let annio = pelicula.release_date.slice(0,4);
            listaPeliculas += `<article class="peliculas">
                                    <a href="./details_peliculas.html?id=${id}"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${pelicula.poster_path}"></a>
                                    
                                    <a class="nombres" href="./details_peliculas.html?id=${id}">${pelicula.title}</a>

                                    <a class="nombres" href="./details_peliculas.html?id=${id}">${annio}</a>

                                    <a class="vermas" href="./details_peliculas.html?id=${id}">Ver mas</a>
                              </article >`
            contenedor.innerHTML=listaPeliculas
        }return data;

    }).catch(function (error) {
        return error;
});

/* Series */
fetch(urlSeries)
    .then(function(response) {
        return response.json();

    }).then(function(data) {
        let contenedor = document.querySelector('.Series');
        let array = data.results;
        let listaSeries = '';

        for (let i = 0; i < 5; i++) {
            let serie = array[i];
            let id = array[i].id;
            let annio = serie.first_air_date.slice(0,4);
            listaSeries += `<article class="peliculas">
                                <a href="./details_series.html?id=${id}"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${serie.poster_path}"></a>
                                        
                                <a class="nombres" href="./details_series.html?id=${id}">${serie.name}</a>

                                <a class="nombres" href="./details_series.html?id=${id}">${annio}</a>

                                <a class="vermas" href="./details_series.html?id=${id}">Ver mas</a>
                            </article >`
            contenedor.innerHTML=listaSeries
        }return data;

    }).catch(function (error) {
        return error;
});

/* Peliculas mas vistas */
fetch(urlVistas)
    .then(function(response) {
        return response.json();

    }).then(function(data) {
        let contenedor = document.querySelector('.Vistas');
        let array = data.results;
        let listaVistas = '';

        for (let i = 0; i < 5; i++) {
            let vistas = array[i];
            let id = array[i].id;
            let annio = vistas.release_date.slice(0,4);
            listaVistas += `<article class="peliculas">
                                <a href="./Details_peliculas.html?id=${id}"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${vistas.poster_path}"></a>
                                
                                <a class="nombres" href="./Details_peliculas.html?id=${id}">${vistas.title}</a>

                                <a class="nombres" href="./Details_peliculas.html?id=${id}">${annio}</a>

                                <a class="vermas" href="./detallePeliculas.html?id=${id}">Ver mas</a>
                            </article >`
        contenedor.innerHTML=listaVistas
        }
        return data;

    }).catch(function (error) {
        return error;
});