let recuperoStorage = localStorage.getItem('Favorites');
let favoritos = JSON.parse(recuperoStorage);

let section = document.querySelector("#sectionFavoritos");

let personajesFavoritos = '';

console.log(favoritos)

if (favoritos == null || favoritos.length == 0) {
    section.innerHTML = '<p>No hay personajes en favoritos</p>'
}
else {
    
    for (let i = 0; i < favoritos.length; i++) {
        let api_key = 'bc6a66de00e3debea99fdcf92ffc0ab7';
        let urlPeliculas = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;

        fetch(urlPeliculas)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            let pelicula = data.results[i];
            let indicador = i
            let año = pelicula.release_date.slice(0,4)
            personajesFavoritos += `<article>
                                        <img src=${data.image} alt='${data.name}' />
                                        <p>Name: <a href="./detallePersonaje.html?idPersonaje=${data.id}"> ${data.name}</a> </p>
                                        <p>Status: ${data.status} </p>
                                    </article>`;
                                    <article class="peliculas">
                                        <a href="./Details_peliculas.html"><img class="imagenes" src="./img/peliculas/avatarfinal.jpg" ></a>
                                        <a class="nombres" href="./Details_peliculas.html"></a>
                                        <a class="nombres" href="./Details_peliculas.html"></a> 
                                        <a class="vermas" href="./Details_peliculas.html"></a>

                                        `<article class="peliculas">
                                    <a href="./details_peliculas.html?i=${indicador}"> <img class="imagenes" src="https://image.tmdb.org/t/p/original/${pelicula.poster_path}"></a>
                                    
                                    <a class="nombres" href="./details_peliculas.html?i=${indicador}">${pelicula.title}</a>

                                    <a class="nombres" href="./details_peliculas.html?i=${indicador}">${año}</a>

                                    <a class="vermas" href="./details_peliculas.html?i=${indicador}">Ver mas</a>
                                </article >`
                                    </article>
            section.innerHTML = personajesFavoritos;

            return data;
        }).catch(function (error) {
            return error;
        });

        
        
    }
}