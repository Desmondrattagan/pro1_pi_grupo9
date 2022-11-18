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


/* PAGINA- resultado de busqueda */
let qs = location.search;
let objqs = new URLSearchParams(qs);
let pelicula = objqs.get('buscador')
let titulo = document.querySelector(".titulosearch")
titulo.innerText = "Results for: " + pelicula

