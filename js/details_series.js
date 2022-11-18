/* ID */
let qs = location.search;
let qsObj = new URLSearchParams(qs);   
let indice = qsObj.get('i');  
let id = qsObj.get('id'); 

/* API */
let api_key = 'bc6a66de00e3debea99fdcf92ffc0ab7';
let urldetalle = `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=en-US`;

/* seleccionar todos los elementos del DOM */
let imagen  = document.querySelector('.imagendetails');
let titulo  = document.querySelector('.titulodetails');
let calificacion = document.querySelector("#calificacion");
let estreno = document.querySelector("#estreno");
let duracion = document.querySelector("#duracion");
let genero = document.querySelector("#genero");
let sinopsis = document.querySelector(".sinopsis");
let plataformas = document.querySelector("#plataformas");

/* COMPLETO EL HTML */
fetch(urldetalle)
.then(function(response){
    return response.json();

}).then(function(data){
    
    
    

    return data;
}).catch(function (error) {
    return error;
});