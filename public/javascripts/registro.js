window.addEventListener('load', function(){
    let formulario = document.querySelector('form.registro');
    console.log(formulario.elements);
    

    formulario.addEventListener('submit', function(e){

        let errores = [];

        let campoNombre = document.querySelector('input.nombre');
        
        if(campoNombre.value == ""){
            errores.push('Debes completar tu nombre');
        }else if(campoNombre.value.lenght < 2){
            errores.push('El nombre debe tener al menos 2 caracteres');
        }

        let campoContraseña = document.querySelector('input.contraseña');

        let campoContraseñaB = document.querySelector('input.contraseñaB')
        
        if(campoContraseña.value.lenght < 6){
            errores.push('La contraseña debe tener al menos 6 caracteres');
        }else if(campoContraseña.value != campoContraseñaB.value){
            errores.push('Las contraseñas no coinciden');
        }

    
        if(errores.length > 0){
            e.preventDefault();
            let erroresCampo = document.querySelector('div.errores ul');

            for (let i=0; i<errores.length;i++){
                erroresCampo.innerHTML += '<li>' + errores[i] + '</li>';
            }
        }



    });


});
