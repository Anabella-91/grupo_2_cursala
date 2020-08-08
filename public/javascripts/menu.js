window.addEventListener("load", function(){
    let liMenu = document.querySelectorAll(".liMenu");
    let botonMenu = document.getElementById("boton-menu");
    botonMenu.addEventListener("click", function(){
        for(let i = 0; i < liMenu.length; i++) {
            liMenu[i].classList.toggle("none");
        }
    })
})