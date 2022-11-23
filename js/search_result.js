/* BUSCADOR (form) */
let form = document.querySelector('#form');
let input = document.querySelector('#palabraPelicula');

form.addEventListener('submit', function(evento) {
    evento.preventDefault();

    if (input.value == "") {
        alert('It is not possible to send an empty form');
    } else if(input.value.length <3){
        alert('More than three characters must be written');
    } else {
        form.submit();
    }
})

/* PAGINA- resultado de busqueda */
let qs = location.search;
let objqs = new URLSearchParams(qs);
let pelicula = objqs.get('buscador');
let titulo = document.querySelector(".titulosearch");
titulo.innerText = "Results for: " + pelicula.toUpperCase();

let api_key = 'bc6a66de00e3debea99fdcf92ffc0ab7';
let urlbusqueda = `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=en-US&page=1&include_adult=false&query=${pelicula}`;

fetch(urlbusqueda)
.then(function(response) {
    return response.json();
}
).then(function(data) {
    let listaResultados = data.results;
    let contenedorSearch = document.getElementById("contenedorSearch");
    if (listaResultados.length !== 0){
        for( var i = 0; i < listaResultados.length; i++) {
        id = listaResultados[i].id;
        /* Peliculas */
        if (Object.keys(listaResultados[i]).includes("release_date")) {
            let anniopeli = listaResultados[i].release_date.slice(0,4);
            contenedorSearch.innerHTML += `<article class="peliculas">

                                                <a href="./details_peliculas.html?id=${id}"><img class="imagenes" src="https://image.tmdb.org/t/p/original/${listaResultados[i].poster_path}"></a>
                                                
                                                <a class="nombres" href="./details_peliculas.html?id=${id}">${listaResultados[i].title}</a>

                                                <a class="nombres" href="./details_peliculas.html?id=${id}">${anniopeli}</a>

                                                <a class="vermas" href="./details_peliculas.html?id=${id}">Ver mas</a>

                                            </article >`

        /* Series */
        }else if (Object.keys(listaResultados[i]).includes("first_air_date")) {
            let annioserie = listaResultados[i].first_air_date.slice(0,4);
            contenedorSearch.innerHTML += `<article class="peliculas">

                                                <a href="./details_series.html?id=${id}"><img class="imagenes" src="https://image.tmdb.org/t/p/original/${listaResultados[i].poster_path}"></a>
                                                
                                                <a class="nombres" href="./details_series.html?id=${id}">${listaResultados[i].name}</a>

                                                <a class="nombres" href="./details_series.html?id=${id}">${annioserie}</a>

                                                <a class="vermas" href="./details_series.html?id=${id}">Ver mas</a>

                                            </article >`
            }
        }
    }else {
        contenedorSearch.innerHTML += '<p class="sinFavoritos">There are no results for your search</p>';
    }
    return data;
}
).catch(function(error) {
    return error;
}
);