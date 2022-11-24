/* API KEY */
let api_key='bc6a66de00e3debea99fdcf92ffc0ab7';

/* PELÍCULAS */
/* LLAMO AL ARRAY */
let storage=localStorage.getItem('lista_peliculas_favoritas');
let lista_peliculas_favoritas=JSON.parse(storage);

/*  ELEMENTOS DEL DOM */
let sectionPeli=document.querySelector(".peliculasFavoritas");
let elementosFavoritosPeli='';

if (lista_peliculas_favoritas == null || lista_peliculas_favoritas.length == 0) {
    sectionPeli.innerHTML='<p class="sinFavoritos">No movies selected</p>'
}else {
    for (let i=0; i<lista_peliculas_favoritas.length; i++) {
        let id=lista_peliculas_favoritas[i];
        let urlPeliculaFavorita=`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US&append_to_response=palabrabuscar`;
        fetch(urlPeliculaFavorita)
            .then(function (response) {
                return response.json();

            }).then(function (data) {
                let id=data.id;
                let annio=data.release_date.slice(0,4);
                elementosFavoritosPeli+=`<article class="peliculas">
                                            <a href="./details_peliculas.html?id=${id}"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${data.poster_path}"></a>
                                                    
                                            <a class="nombres" href="./details_peliculas.html?id=${id}">${data.title}</a>

                                            <a class="nombres" href="./details_peliculas.html?id=${id}">${annio}</a>

                                            <div class="uk-animation-toggle" tabindex="0">
                                                <div class="uk-animation-shake">
                                                    <p class="uk-text-center"><a class="vermas" href="./details_peliculas.html?id=${id}">See more</a></p>
                                                </div>
                                            </div> 
                                        </article>`
                sectionPeli.innerHTML = elementosFavoritosPeli;
                return data;

            }).catch(function (error) {
                return error;
        });
    }
};

/* SERIES */
let storageSerie=localStorage.getItem('lista_series_favoritas');
let lista_series_favoritas=JSON.parse(storageSerie);
let sectionSerie=document.querySelector(".seriesFavoritas");
let elementosFavoritosSeries='';

if (lista_series_favoritas == null || lista_series_favoritas.length == 0) {
    sectionSerie.innerHTML='<p class="sinFavoritos">No series selected</p>'
}else {
    for (let i=0; i<lista_series_favoritas.length; i++) {
        let id=lista_series_favoritas[i]
        let urlSerieFavorita=`https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=en-US`;
        fetch(urlSerieFavorita)
            .then(function (response) {
                return response.json();

            }).then(function (data) {
                let id=data.id;
                let annio=data.first_air_date.slice(0,4);
                elementosFavoritosSeries+=`<article class="peliculas">
                                                <a href="./details_series.html?id=${id}"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${data.poster_path}"></a>
                                                        
                                                <a class="nombres" href="./details_series.html?id=${id}">${data.name}</a>

                                                <a class="nombres" href="./details_series.html?id=${id}">${annio}</a>

                                                <div class="uk-animation-toggle" tabindex="0">
                                                    <div class="uk-animation-shake">
                                                        <p class="uk-text-center"><a class="vermas" href="./details_peliculas.html?id=${id}">See more</a></p>
                                                    </div>
                                                </div> 
                                            </article >`;
                sectionSerie.innerHTML=elementosFavoritosSeries;
                return data;
                
            }).catch(function (error) {
                return error;
        });
    }
};

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