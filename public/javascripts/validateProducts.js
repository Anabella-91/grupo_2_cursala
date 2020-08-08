window.addEventListener("load", function(){    

// FORMULARIO CREACION PRODUCTOS y MODIFICACION PRODUCTOS (product_carga.ejs/product_edit.ejs)
let formProducts = document.querySelector('.form-create');
    
formProducts.addEventListener('submit', function(e){
    
    let errores = [];
    
    let nombre = document.querySelector('#nombre');
    
    if(nombre.value.lenght < 5){
        errores.push('El nombre debe tener al menos 5 caracteres');
    };
    
    let descripcion = document.querySelector('#descripcion');
    
    let precio = document.querySelector('#precio');
    
    if(descripcion.value.lenght < 10){
        errores.push('La descripcion debe tener al menos 10 caracteres');
    };
    
    if(isNaN(precio.value)){
        errores.push('El precio debe ser un numero');
    };
    
    if(errores.length > 0){
        e.preventDefault();
        let erroresCampo = document.querySelector('div.errores ul');
        
        for (let i=0; i<errores.length;i++){
            erroresCampo.innerHTML += '<li>' + errores[i] + '</li>';
        };
    };
});
});