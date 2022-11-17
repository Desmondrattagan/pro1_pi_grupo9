let contenedor = document.querySelector('.contenedordetails')
let qs = location.search;               
let qsObj = new URLSearchParams(qs);   
let idPersonaje = qsObj.get('id');     

/* Peliculas */
let portada = poster_path
let titulo = title
let calificacion = vote_average
let estreno = release_date
/* let duracion =  preguntar donde esta esto*/
let sinopsis = overview
/* let genero = genre_ids
let plataformas = preguntar donde esta esto */

contenedor.innerHTML= `<article>
                                <img class="imagendetails" src="" alt="${titulo}">
                        </article> 

                        <article class="contenedortitulodetails">
                                <h1 class="titulodetails">${titulo}</h1> 
                                <ul class="listaDatos">
                                    <li class="datos">${estreno}</li>
                                    <li class="datos"></li>
                                    <li class="datos"></li>
                                    <li class="datos"><a href="./Genre_details.html">Genre: Comedy</a></li>
                                </ul>
                                <p class="sinopsis"></p>
                                <a class="botonfavorites" href="Favorites.html" >💜 Add to favorites</a>
                        </article>`