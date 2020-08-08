window.addEventListener("load", function(){    
    // BUSCADOR HOME
    const busqueda = document.querySelector('#busquedaUser');
    const boton = document.querySelector('#boton');
    const resultado = document.querySelector('#resultado');
        
    let list = () => {
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
                    <a href="/products/${cursos.data.data[i].id}">${cursos.data.data[i].name}</a>
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

});
