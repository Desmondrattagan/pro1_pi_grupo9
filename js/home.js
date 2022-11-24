/* API KEY */
let api_key='bc6a66de00e3debea99fdcf92ffc0ab7';

/* LOADER */


/* SLIDER */
let urlSlider=`https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=en-US&page=1`;
fetch(urlSlider)
    .then(function(response) {
        return response.json();

    }).then(function(data) {
        let contenedor=document.getElementById('slider');
        let array=data.results;
        let listaSlider = '';
        for (let i=0; i<8; i++) {
            let pelicula=array[i];
            let id=array[i].id;
            listaSlider+='<div class="carrou"> <a href="./details_series.html?id='+id+'"><img class="imgCarrou" src="https://image.tmdb.org/t/p/original/'+pelicula.poster_path+'" width="" height="" alt=""></a></div>'
        contenedor.innerHTML=listaSlider;
        }return data;

    }).catch(function (error) {
        return error;
});

/* PELÍCULAS */
let urlPeliculas=`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;
fetch(urlPeliculas)
    .then(function(response) {
        return response.json();

    }).then(function(data) {
        let contenedor=document.querySelector('.Peliculas');
        let array=data.results;
        let listaPeliculas='';
        for (let i=0; i<5; i++) {
            let pelicula=array[i];
            let id=array[i].id;
            let annio=pelicula.release_date.slice(0,4);
            listaPeliculas+=`<article class="peliculas">
                                    <a href="./details_peliculas.html?id=${id}"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${pelicula.poster_path}"></a>
                                    
                                    <a class="nombres" href="./details_peliculas.html?id=${id}">${pelicula.title}</a>

                                    <a class="nombres" href="./details_peliculas.html?id=${id}">${annio}</a>

                                    <div class="uk-animation-toggle" tabindex="0">
                                        <div class="uk-animation-shake">
                                            <p class="uk-text-center"><a class="vermas" href="./details_peliculas.html?id=${id}">See more</a></p>
                                        </div>
                                    </div>  
                              </article>`
        contenedor.innerHTML=listaPeliculas;
        }return data;

    }).catch(function (error) {
        return error;
});

/* SERIES */
let urlSeries=`https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`;
fetch(urlSeries)
    .then(function(response) {
        return response.json();

    }).then(function(data) {
        let contenedor=document.querySelector('.Series');
        let array=data.results;
        let listaSeries='';
        for (let i=0; i<5; i++) {
            let serie=array[i];
            let id=array[i].id;
            let annio=serie.first_air_date.slice(0,4);
            listaSeries+=`<article class="peliculas">
                                <a href="./details_series.html?id=${id}"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${serie.poster_path}"></a>
                                        
                                <a class="nombres" href="./details_series.html?id=${id}">${serie.name}</a>

                                <a class="nombres" href="./details_series.html?id=${id}">${annio}</a>

                                <div class="uk-animation-toggle" tabindex="0">
                                    <div class="uk-animation-shake">
                                        <p class="uk-text-center"><a class="vermas" href="./details_peliculas.html?id=${id}">See more</a></p>
                                    </div>
                                </div>  
                            </article>`
        contenedor.innerHTML=listaSeries;
        }return data;

    }).catch(function (error) {
        return error;
});

/* PELÍCULAS MÁS VISTAS */
let urlVistas=`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`;
fetch(urlVistas)
    .then(function(response) {
        return response.json();

    }).then(function(data) {
        let contenedor=document.querySelector('.Vistas');
        let array=data.results;
        let listaVistas='';
        for (let i=0; i<5; i++) {
            let vistas=array[i];
            let id=array[i].id;
            let annio=vistas.release_date.slice(0,4);
            listaVistas+=`<article class="peliculas">
                                <a href="./Details_peliculas.html?id=${id}"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${vistas.poster_path}"></a>
                                
                                <a class="nombres" href="./Details_peliculas.html?id=${id}">${vistas.title}</a>

                                <a class="nombres" href="./Details_peliculas.html?id=${id}">${annio}</a>

                                <div class="uk-animation-toggle" tabindex="0">
                                    <div class="uk-animation-shake">
                                        <p class="uk-text-center"><a class="vermas" href="./details_peliculas.html?id=${id}">See more</a></p>
                                    </div>
                                </div>  
                            </article>`
        contenedor.innerHTML=listaVistas;
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