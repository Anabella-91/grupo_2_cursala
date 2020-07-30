window.addEventListener("load",function(){
    const boton_carrito = document.querySelector('#btn-carrito');
    const productoId = boton_carrito.getAttribute('data-productoId');
    boton_carrito.addEventListener("click", function(){
        event.preventDefault();
        boton_carrito.innerHTML = "- Eliminar del carrito";
        boton_carrito.classList.toggle("agregado");

        fetch('http://localhost:3000/users/addcart', {
        method: 'POST',
        body: JSON.stringify({
            user_id: 1,
            product_id: productoId
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(function(response){
        return response.json();
    })
    .then(function(respuesta){
        console.log("Se agrego exitosamente a la base de datos")
    }) 
    });

    
    
});