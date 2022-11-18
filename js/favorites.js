let storage = localStorage.getItem('lista_favoritos');
let lista_favoritos = JSON.parse(storage);
console.log(lista_favoritos)

let section = document.querySelector(".peliculasFavoritas");

let elementosFavoritos = '';


if (lista_favoritos == null || lista_favoritos.length == 0) {
    section.innerHTML = '<p>No hay películas en favoritos</p>'
}
else {
    
    for (let i = 0; i < lista_favoritos.length; i++) {
        let api_key = 'bc6a66de00e3debea99fdcf92ffc0ab7';
        let urlPeliculaFavorita = `https://api.themoviedb.org/3/movie/${lista_favoritos[i]}?api_key=${api_key}&language=en-US`;
        
        fetch(urlPeliculaFavorita)
        .then(function (response) {
            return response.json();

        }).then(function (data) {
            console.log(data)
            let pelicula = data.results[i];
            let id = array[i].id;
            let indicador = i;
            let año = pelicula.release_date.slice(0,4);
            elementosFavoritos += `<article class="peliculas">
                                        <a href="./Details_peliculas.html?i=${indicador}&id=${id}"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${vistas.poster_path}"></a>
                                                
                                        <a class="nombres" href="./Details_peliculas.html?i=${indicador}&id=${id}">${vistas.title}</a>

                                        <a class="nombres" href="./Details_peliculas.html?i=${indicador}&id=${id}">${año}</a>

                                        <a class="vermas" href="./detallePeliculas.html?i=${indicador}&id=${id}">Ver mas</a>
                                    </article >`;
            section.innerHTML = elementosFavoritos;

            return data;
        }).catch(function (error) {
            return error;
        });

    }
}