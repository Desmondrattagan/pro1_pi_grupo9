/* API KEY */
let api_key='bc6a66de00e3debea99fdcf92ffc0ab7';

/* PELÍCULAS */
let urlGenresPeliculas=`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`;
fetch(urlGenresPeliculas)
    .then(function(response) {
        return response.json();

    }).then(function(data) {
        let contenedor=document.querySelector('.contenedorGenerosPeliculas');
        let array=data.genres;
        let listaGenresPeliculas='';
        for (let i=0; i<16; i++) {
            let genero=array[i];
            let nombreGenero=genero.name;
            let idGenero=genero.id;
            listaGenresPeliculas+=`<article class="genero">
                                        <li class="itemgeneros"><a href="./genre_details.html?id=${idGenero}&name=${nombreGenero}"">${nombreGenero}</a></li>                                    
                                    </article>`
        contenedor.innerHTML=listaGenresPeliculas;
        }return data;

    }).catch(function (error) {
        return error;
});

/* SERIES */
let urlGenresSeries=`https://api.themoviedb.org/3/genre/tv/list?api_key=${api_key}&language=en-US`;
fetch(urlGenresSeries)
    .then(function(response){
        return response.json();

    }).then(function(data){
        let contenedor=document.querySelector('.contenedorGenerosSeries');
        let array=data.genres;
        let listaGenresPeliculas='';
        for (let i=0; i<16; i++) {
            let genero=array[i];
            let nombreGenero=genero.name;
            let idGenero=genero.id;
            listaGenresPeliculas+=`<article class="genero">
                                        <li class="itemgeneros"><a href="./genre_details.html?id=${idGenero}&name=${nombreGenero}">${nombreGenero}</a></li>                                    
                                    </article>`
        contenedor.innerHTML=listaGenresPeliculas;
        }
        return data;
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