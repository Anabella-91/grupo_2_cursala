window.addEventListener("load", function(){
    let btnOpenContacto = document.getElementById("openContacto");
    let modalContacto = document.getElementById("openModal");
    let btnCloseContacto = document.getElementById("closeContacto");
    
    btnOpenContacto.addEventListener("click", function(){
        modalContacto.style.display ="flex";
    })
    btnCloseContacto.addEventListener("click", function(){
        modalContacto.style.display = "none";
    })
    
    // BUSCADOR HOME
    const formulario = document.querySelector('#formulario');
    const boton = document.querySelector('#boton');
    const resultado = document.querySelector('#resultado');
    
    
    let list = () => {
        return axios({
            method: 'GET',
            url: '/api/products/list'
        }).then(cursos => {
            const texto = formulario.value.toLowerCase();
            resultado.innerHTML = '';
            
            for(let i=0; i< cursos.data.data.length; i++){
                let nombre = cursos.data.data[i].name.toLowerCase();
                
                if(nombre.indexOf(texto) !== -1){
                    resultado.innerHTML += `
                    <h2>${cursos.data.data[i].name}</h2>
                    `
                }
                if(resultado.innerHTML === ''){
                    resultado.innerHTML += `
                    <h2>No encontramos el curso que buscaste...</h2>
                    `
                }
                console.log(texto);
                
            }
            console.log(resultado);
            console.log(cursos.data.data);
        });
    };
    
    boton.addEventListener('click', list);
    
    /*
    const filtrar = () => {
        //console.log(formulario.value);
        resultado.innerHTML = '';
        
        const texto = formulario.value.toLowerCase();
        for(let curso of cursos.data){
            let nombre = curso.name.toLowerCase();
            if(nombre.indexOf(texto) !== -1){
                resultado.innerHTML += `
                <a>${curso.nombre}</a><br>
                <a>$ ${curso.precio}</a>
                `
            }
        }
        if(resultado.innerHTML === ''){
            resultado.innerHTML += `
            <a>No encontramos el curso que buscaste...</a>
            `
        }
    }
    */
    
    /*
    boton.addEventListener('click', ()=>{
        axios({
            method: 'GET',
            url: '/api/products/list'
        }).then(res => {
            for(let i=0; i < res.data.length; i++){
                
                console.log(res.data[i].name);
            }
        }).catch(error => {
            console.log(error);
        });
        
    });
    */
    //boton.addEventListener('click', filtrar);
    //formulario.addEventListener('keyup', filtrar);
    
    // PAGINADOR HOME
    
    // CIERRE DE SESION DEL USER
    let botonCerrarSesion = document.querySelector('#form-log-out');
    
    // FORMULARIO CREACION PRODUCTOS (product_carga.ejs)
    let formulario = document.querySelector('.form-create');
    console.log(formulario.elements);
    
    
    formulario.addEventListener('submit', function(e){
        
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
