/* ID */
let qs = location.search;
let qsObj = new URLSearchParams(qs);   
let indice = qsObj.get('i');
let id = qsObj.get('id'); 

/* API */
let api_key = 'bc6a66de00e3debea99fdcf92ffc0ab7';
let urldetalle = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`;
let urlTrailer = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}&language=en-US`;

/* seleccionar todos los elementos del DOM */
let imagen          = document.querySelector('.imagendetails');
let titulo          = document.querySelector('.titulodetails');
let calificacion    = document.querySelector("#calificacion");
let estreno         = document.querySelector("#estreno");
let duracion        = document.querySelector("#duracion");
let genero          = document.querySelector("#genero");
let sinopsis        = document.querySelector(".sinopsis");
let plataformas     = document.querySelector("#plataformas");
let trailer         = document.querySelector(".trailer")
let favoritos       = document.querySelector(".botonfavorites")

/* COMPLETO EL HTML */
fetch(urldetalle)
.then(function(response){
    return response.json();

}).then(function(data){
   

    titulo.innerText = data.title;
    sinopsis.innerText = data.overview;
    calificacion.innerText = "Rating: "  + data.vote_average;
    estreno.innerText = "Release date: " + data.release_date;
    duracion.innerText = "Duration: " + data.runtime 
    let generos = data.genres
    let texto = ""
    for (let i = 0; i < generos.length ; i++){
        texto += generos[i].name + " "
    }
    genero.innerText = "Genres: " + texto


}).catch(function (error) {
    return error;
});

    
fetch(urlTrailer)
    .then(function(response){
        return response.json();

    }).then(function(infoTrailer){
       if (infoTrailer.results.length > 0) {
        
        let texto = ""
            for(let i=0; i < 1; i++){ 
                let trailer = infoTrailer.results[i]

                if (trailer.key != undefined){
                    let video = infoTrailer.results[i].key
                    console.log(video)
                    texto += `<article>
                                    <iframe class="trailerSearch" src="https://www.youtube.com/embed/${video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </article>`
                
                }
            }

            trailer.innerHTML = texto
    
    }else {
            trailer.innerText = "No hay trailers disponibles"     
       }
    }).catch(function(error){
    return error;
})



/* Boton favoritos */

let lista_favoritos = []; 
let storage = localStorage.getItem('lista_favoritos')

if(storage != null){
    lista_favoritos = JSON.parse(storage);
};

if (lista_favoritos.includes(id)) {
    favoritos.innerText="❌ Remove from favorites";
}

favoritos.addEventListener("click", function(e) {
    e.preventDefault()

    if(lista_favoritos.includes(id)){
        let indice = lista_favoritos.indexOf(id);
        lista_favoritos.splice(indice,1);
        favoritos.innerText="💜 Add to favorites";
    }else{
        lista_favoritos.push(id);
        favoritos.innerText="❌ Remove from favorites";
    }

    let favToString = JSON.stringify(lista_favoritos);
    localStorage.setItem('lista_favoritos',favToString)

})

