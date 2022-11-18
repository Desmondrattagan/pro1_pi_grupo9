let api_key = 'bc6a66de00e3debea99fdcf92ffc0ab7';
let urlPeliculas = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;
let urlSeries = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`
let urlVistas = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`

fetch(urlPeliculas)
    .then(function(response){
        return response.json();

    }).then(function(data){
        let contenedor = document.querySelector('.Peliculas')
        let array = data.results;
        let listaPeliculas = '';
        console.log(array);

        for (let i = 0; i < 5; i++) {
            let pelicula = array[i];
            let id = array[i].id
            let indicador = i
            let año = pelicula.release_date.slice(0,4)
            listaPeliculas += `<article class="peliculas">
                                    <a href="./details_peliculas.html?i=${indicador}&id=${id}"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${pelicula.poster_path}"></a>
                                    
                                    <a class="nombres" href="./details_peliculas.html?i=${indicador}&id=${id}">${pelicula.title}</a>

                                    <a class="nombres" href="./details_peliculas.html?i=${indicador}&id=${id}">${año}</a>

                                    <a class="vermas" href="./details_peliculas.html?i=${indicador}&id=${id}">Ver mas</a>
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
        let array = data.results;
        let listaSeries = '';
        console.log(array);

        for (let i = 0; i < 5; i++) {
            let serie = data.results[i];
            let id = array[i].id;
            let indicador = i;
            let año = serie.first_air_date.slice(0,4)
            listaSeries += `<article class="peliculas">
                                                <a href="./details_series.html?i=${indicador}&id=${id}"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${serie.poster_path}"></a>
                                                
                                                <a class="nombres" href="./details_series.html?i=${indicador}&id=${id}">${serie.name}</a>

                                                <a class="nombres" href="./details_series.html?i=${indicador}&id=${id}">${año}</a>

                                                <a class="vermas" href="./details_series.html?i=${indicador}&id=${id}">Ver mas</a>
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
        let array = data.results;
        let listaVistas = '';
        console.log(array);

        for (let i = 0; i < 5; i++) {
            let vistas = data.results[i];
            let id = array[i].id;
            let indicador = i;
            let año = vistas.release_date.slice(0,4)
            listaVistas += `<article class="peliculas">
                                                <a href="./Details_peliculas.html?i=${indicador}&id=${id}"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${vistas.poster_path}"></a>
                                                
                                                <a class="nombres" href="./Details_peliculas.html?i=${indicador}&id=${id}">${vistas.title}</a>

                                                <a class="nombres" href="./Details_peliculas.html?i=${indicador}&id=${id}">${año}</a>

                                                <a class="vermas" href="./detallePeliculas.html?i=${indicador}&id=${id}">Ver mas</a>
                                    </article >`
        contenedor.innerHTML=listaVistas
        }
        return data;
    }).catch(function (error) {
        return error;
    });