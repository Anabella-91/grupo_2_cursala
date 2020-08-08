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
    
    // BUSCADOR HOME
    const busqueda = document.querySelector('#busquedaUser');
    const boton = document.querySelector('#boton');
    const resultado = document.querySelector('#resultado');
    
    boton.addEventListener('click', list);
    
    let list = () => {
        console.log(busqueda.value);

        return axios({
            method: 'GET',
            url: '/api/products/list'
        }).then(cursos => {
            const texto = busqueda.value.toLowerCase();
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
                };                
            };
        });
    };
    
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
    
    // SUBIR IMAGEN USER >> profile.ejs
        
        
        
});
    