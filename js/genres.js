let api_key = 'bc6a66de00e3debea99fdcf92ffc0ab7';
let urlGenresPeliculas = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`;
let urlGenresSeries = `https://api.themoviedb.org/3/genre/tv/list?api_key=${api_key}&language=en-US`

fetch(urlGenresPeliculas)
    .then(function(response){
        return response.json();

    }).then(function(data){
        let contenedor = document.querySelector('.contenedorGenerosPeliculas');
        let array = data.genres;
        let listaGenresPeliculas = '';
        console.log(array);
 
        for (let i = 0; i < 15; i++) {
            let genero = array[i];
            let nombreGenero = genero.name;
            let idGenero = genero.id;
            listaGenresPeliculas += `<article class="genero">
                                        <li class="itemgeneros"><a href="./Genre_details.html">${nombreGenero}</a></li>                                    
                                    </article>`
            contenedor.innerHTML=listaGenresPeliculas
        }
        return data;
    }).catch(function (error) {
        return error;
    });

fetch(urlGenresSeries)
.then(function(response){
    return response.json();

}).then(function(data){
    let contenedor = document.querySelector('.contenedorGenerosSeries');
    let array = data.genres;
    let listaGenresPeliculas = '';
    console.log(array);

    for (let i = 0; i < 15; i++) {
        let genero = array[i];
        let nombreGenero = genero.name;
        let idGenero = genero.id;
        listaGenresPeliculas += `<article class="genero">
                                    <li class="itemgeneros"><a href="./Genre_details.html">${nombreGenero}</a></li>                                    
                                </article>`
        contenedor.innerHTML=listaGenresPeliculas
    }
    return data;
}).catch(function (error) {
    return error;
});
