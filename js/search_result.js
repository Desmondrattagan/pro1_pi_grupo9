/* BUSCADOR (form) */
let form = document.querySelector('#form')
let input = document.querySelector('#palabraPelicula')

form.addEventListener('submit', function(evento) {
    evento.preventDefault();

    if (input.value == "") {
        alert('No puedes enviar un form vacio')
    } else if(input.value.length <3){
        alert('Debes escribir mas de 3 caracteres')
    } else {
        form.submit()
    }
})

form.addEventListener("click", function(){
    fetch(url)
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            //Acá ya tenemmos los datos finales y es donde debemos escribir nuestro código.
            console.log(data);
            let arrayDePersonajes = data.results;

            //1 Donde: Capturo el elemento html en donde quiero hacer una modificación
            let seccion = document.querySelector('.container');
            let allCharacters = [];

            //2 Qué: recorro la información de la api y la organizo para mostarla en el html
            for(let i=0; i<arrayDePersonajes.length; i++){
                //Dentro del for voy acumulando en la variable una estructura html por cada personaje del array.
                allCharacters += `<article>
                                    <img src=${arrayDePersonajes[i].image} alt='${arrayDePersonajes[i].name}' />
                                    <p>Name: <a href="./detallePersonaje.html?idPersonaje=${arrayDePersonajes[i].id}"> ${arrayDePersonajes[i].name}</a> </p>
                                    <p>Status: ${arrayDePersonajes[i].status} </p>
                                </article>`
            }
            //Con toda la estructura html completa ahora la paso al DOM
            seccion.innerHTML = allCharacters;

        })
        .catch( function(e){
            console.log(e)
        });
        {/* <ul class="listaBuscador">
                    <li class="opcionBuscador">Todo</li>
                    <li class="opcionBuscador">Peliculas</li>
                    <li class="opcionBuscador">Series</li>
                </ul> */}
})

/* PAGINA- resultado de busqueda */
let qs = location.search;
let objqs = new URLSearchParams(qs);
let pelicula = objqs.get('buscador')
let titulo = document.querySelector(".titulosearch")
titulo.innerText = "Results for: " + pelicula