window.addEventListener("load",function(){
    const boton_carrito = document.querySelector('#btn-carrito');
    const productoId = boton_carrito.getAttribute('data-productoId');
    boton_carrito.addEventListener("click", function(){
        event.preventDefault();
        boton_carrito.innerHTML = "- Eliminar del carrito";
        boton_carrito.classList.toggle("agregado");

        axios({
            method: 'POST',
            url: '/api/users/addcart', 
            data: {
                idUser : 'userId',
                idProduct: 'productId',
                nameProduct: 'producto 1',
                precio: '$6500',

            }
        }).then(res => console.log(res));
        /*fetch('http://localhost:3000/users/addcart', {
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
    }); 
    */
    });
    
});