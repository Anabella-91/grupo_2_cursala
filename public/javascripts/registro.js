window.addEventListener("load", function(){

// REGISTRO USER
let formRegistro = document.querySelector('.registro');
    
formRegistro.addEventListener('submit', validateRegister);

function validateRegister (e){
    let passwordRegister = document.querySelector('.contraseña');
    let errores = [];
    const pass_reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    
    if(!pass_reg.test(passwordRegister.value)){
        errores.push('La contraseña debe al menos tener la primera letra en mayuscula');
    };
    
    if(errores.length > 0){
        e.preventDefault();
        let erroresCampo = document.querySelector('div#errores ul');
        
        for (let i=0; i<errores.length;i++){
            erroresCampo.innerHTML += '<li>' + errores[i] + '</li>';
        };
    };
};
});