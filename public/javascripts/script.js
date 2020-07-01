window.addEventListener("load", function(){
    let front = document.querySelector("#front");
    let backend = document.querySelector("#back");
    let ux = document.querySelector("#ux");
    let marketing = document.querySelector("#marketing");
    let diseño = document.querySelector("#diseño");

    let tituloLanding = document.querySelector(".tituloLanding");
    let pDesarrolloLanding = document.querySelector(".pCursoLanding");

    

    backend.addEventListener("click", function () {
        backend.style.backgroundColor = ""
        tituloLanding.innerHTML = "Back End";
        pDesarrolloLanding.innerHTML = "El desarollo <span>Back end</span>  refiere a la capa de acceso de datos de un software o cualquier dispositivo, que no es directamente accesible por los usuarios, además contiene la lógica de la aplicación que maneja dichos datos. Esta capa accede al servidor, que es una aplicación especializada que entiende la forma como el navegador solicita cosas.</p>"
        let categoriaCurso = document.querySelectorAll(".categoriaCurso");
        categoriaCurso.innerHTML ="PHP";
    })
    ux.addEventListener("click", function(){
        tituloLanding.innerHTML = "UX / UI";
        pDesarrolloLanding.innerHTML = "El diseño de UX es un proceso de diseño estratégico de varios pasos que tiene como objetivo crear un producto o sitio que los clientes/usuarios se sienten atraídos, encuentren fácil de usar y comprendan rápidamente. Y a través del proceso de diseño de UX, llegamos a la solución de interfaz de usuario correcta. El diseño de UX es el viaje y la UI es el destino."
    });
    marketing.addEventListener("click", function(){
        tituloLanding.innerHTML = "Marketing Digital";
        pDesarrolloLanding.innerHTML = "El Marketing Digital, también conocido como Mercadotecnia Digital es el conjunto de actividades que se ejecutan en línea con el objetivo de atraer nuevos negocios, crear relaciones y desarrollar una identidad de marca. Dentro de sus estrategias están el SEO, Inbound Marketing y el Marketing de Contenidos."
    })
    diseño.addEventListener("click", function(){
        tituloLanding.innerHTML = "Diseño Digital";
        pDesarrolloLanding.innerHTML = "Diseño Digital capacita en competencias para desempeñarse de manera creativa en las múltiples actividades que ofrecen los medios digitales. Entre las principales aplicaciones se destacan la creación de objetos, personajes y animaciones tridimensionales y bidimensionales, el diseño y diagramación de sitios web en diferentes formatos, el diseño, producción y realización audiovisual, la creación de efectos especiales virtuales,y la planificación de estrategias de comunicación."
    });

});
