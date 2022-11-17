let api_key = 'bc6a66de00e3debea99fdcf92ffc0ab7';
let urlPeliculas = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;
let urlSeries = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`
let urlVistas = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`

fetch(urlPeliculas)
    .then(function(response){
        return response.json();

    }).then(function(data){
        let contenedor = document.querySelector('.Peliculas')
        let usuario = data.results;
        let listaPeliculas = '';
        console.log(usuario);

        for (let i = 0; i <= 5; i++) {
            let pelicula = data.results[i]; // Cambiar la ruta del <a>
            let anio = pelicula.release_date.slice(0,4)
            listaPeliculas += `<article class="peliculas">
                                                <a href="./details_peliculas.html?id=${pelicula.id}"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${pelicula.poster_path}"></a>
                                                
                                                <a class="nombres" href="./details_peliculas.html">${pelicula.original_title}</a>

                                                <a class="nombres" href="./details_peliculas.html?id=${pelicula.id}">${anio}</a>

                                                <a class="vermas" href="./details_peliculas.html?id=${pelicula.id}">Ver mas</a>
                                    </article >`
            contenedor.innerHTML=listaPeliculas
        }
        return data;
    }).catch(function (error) {
        return error;
    });

/* ---------------------------------------------------------------------------------------------------- */
fetch(urlSeries)
    .then(function(response){
        return response.json();

    }).then(function(data){
        let contenedor = document.querySelector('.Series')
        let usuario = data.results;
        let listaSeries = '';
        console.log(usuario);

        for (let i = 0; i <= 5; i++) {
            let serie = data.results[i]; // Cambiar la ruta del <a>
            let anio = serie.first_air_date.slice(0,4)
            listaSeries += `<article class="peliculas">
                                                <a href="./details_series.html?id=${serie.id}"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${serie.poster_path}"></a>
                                                
                                                <a class="nombres" href="./details_series.html">${serie.original_title}</a>

                                                <a class="nombres" href="./details_series.html">${anio}</a>

                                                <a class="vermas" href="./details_series.html?idPelicula=${serie.id}">Ver mas</a>
                                    </article >`
            contenedor.innerHTML=listaSeries
        }
        return data;
    }).catch(function (error) {
        return error;
    });

/* ---------------------------------------------------------------------------------------------------- */
fetch(urlVistas)
    .then(function(response){
        return response.json();

    }).then(function(data){
        let contenedor = document.querySelector('.Vistas')
        let usuario = data.results;
        let listaVistas = '';
        console.log(usuario);

        for (let i = 0; i <= 5; i++) {
            let vistas = data.results[i]; // Cambiar la ruta del <a>
            let anio = vistas.release_date.slice(0,4)
            listaVistas += `<article class="peliculas">
                                                <a href="./Details_peliculas.html"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${vistas.poster_path}"></a>
                                                
                                                <a class="nombres" href="./Details_peliculas.html">${vistas.original_title}</a>

                                                <a class="nombres" href="./Details_peliculas.html">${anio}</a>

                                                <a class="vermas" href="./detallePeliculas.html?idPelicula=${vistas.id}">Ver mas</a>
                                    </article >`
            contenedor.innerHTML=listaVistas
        }
        return data;
    }).catch(function (error) {
        return error;
    });