let liMenu = document.querySelectorAll(".liMenu");

if(window.screen.width < 650) {
    for (let i = 0; i < liMenu.length; i++) {
        liMenu[i].classList.add("none");
    }
}
window.addEventListener("load", function(){

    let botonMenu = document.getElementById("boton-menu");

    botonMenu.addEventListener("click", function(){
        for(let i = 0; i < liMenu.length; i++) {
            if(window.screen.width > 650) {
            liMenu[i].classList.toggle("none")
            } else {
            liMenu[i].classList.toggle("none");
            }
        }
    })
})