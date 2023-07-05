"use strict"
//Captcha
//Creo numero aleatorio y lo muestro en el html
function create_captcha(){
    let captcha = Math.floor(Math.random() * ((500000+1) - 100000) + 100000 );
    document.querySelector("#textCaptcha").innerHTML = captcha;
};

//Valido que el numero que fue creado antes sea igual al valor que pone el usuario en el input, en caso de que sea invalido le crea un nuevo captcha
function validate_captcha(){
    let user_value = document.querySelector("#write_captcha").value;
    let captcha = document.querySelector("#textCaptcha").innerHTML;
    if(user_value === captcha){
        document.querySelector("#captcha_result").innerHTML = "Valor Correcto";
    } else{
        document.querySelector("#captcha_result").innerHTML = "Valor Incorrecto";
        create_captcha();
    };
};

//Creo el numero
create_captcha();

//Le doy al input boton el evento de hacer click y ejecutar la funcion de validar captcha
const btn = document.querySelector("#btn-captcha");
btn.addEventListener("click", validate_captcha);

//Le doy al input boton el evento de hacer click y ejecutar la funcion de create_captcha
let btn_regenerate = document.querySelector("#btn-regenerate");
btn_regenerate.addEventListener("click", create_captcha);

//Validar formulario con html
let form = document.querySelector('#form');
form.addEventListener('submit', add);

function add(e){
    e.preventDefault();


//agarrar todos los datos del form
let formData = new FormData(form);
let name = formData.get('name');
let email = formData.get('email');
let number = formData.get('number');
let message = formData.get('message');
console.log(name, email, number, message);
}


