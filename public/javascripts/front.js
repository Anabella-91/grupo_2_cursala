window.addEventListener("load", function(){
    let btnOpenContacto = document.getElementById("openContacto");
    let modalContacto = document.getElementById("openModal");
    let btnCloseContacto = document.getElementById("closeContacto");

    btnOpenContacto.addEventListener("click", function(){
        modalContacto.style.display ="flex";
    })
    btnCloseContacto.addEventListener("click", function(){
        modalContacto.style.display = "none";
    });


});
