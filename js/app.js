//VARIABLES
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');


//Variables para los campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners() {
    //Cuando la app arranca
    document.addEventListener('DOMConcentLoaded', iniciarApp);

    //Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    
    //Reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario);

    //Enviar email
    formulario.addEventListener('submit', enviarEmail);
}




//FUNCIONES
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

//Validar el formulario
function validarFormulario(e) {
    if(e.target.value.length > 0) {

        //Eliminar errores porque el ausnto esta en orden
        const error = document.querySelector('p.error');
        if(error) {
            error.remove();
        }


        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }
    else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email') {
           
        if( er.test(e.target.value) ) {
            const error = document.querySelector('p.error');
            if(error) {
            error.remove();
           }


            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
    

            mostrarError('Email no valido');
        }
    
    }



     if(email.value !== '' && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    
       }
    }

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-color-500', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');
    
    const errores = document.querySelectorAll('.error');
    if(errores.length === 0) {
        formulario.appendChild(mensajeError);

    }


    
}


//Enviar email
function enviarEmail(e) {
    e.preventDefault();

   //Mostrar spinner
   const spinner = document.querySelector('#spinner')
   spinner.style.display = 'flex';

   //Despues de 3 segundos ocultar el spinner y mostrar el mensaje
   setTimeout( () => {
       spinner.style.display = 'none';

       //mensaje que dice que se envio correctamente
       const parrafo = document.createElement('p');
       parrafo.textContent = 'el mensaje se envio correctamente!';
       parrafo.classList.add('text-center', 'my-10', 'p-2','bg-green-500', 'font-bold', 'text-white', 'uppercase')


       //inserta el parrafo antes del spinner
       formulario.insertBefore(parrafo, spinner);
       

       setTimeout(() => {
          parrafo.remove(); //elimina el mensaje de exito

          resetearFormulario();

       }, 5000);

   }, 3000);


}

//funcion para resetear el formulario
function resetearFormulario() {
    formulario.reset();

    iniciarApp();
}







