window.addEventListener("load", function(){
    let front = document.querySelector("#front");
    let backend = document.querySelector("#back");
    let ux = document.querySelector("#ux");
    let marketing = document.querySelector("#marketing");
    let diseño = document.querySelector("#diseño");

    let tituloLanding = document.querySelector(".tituloLanding");
    let pDesarrolloLanding = document.querySelector(".pCursoLanding");

    let listado_curso = document.querySelector(".list_curso");
    let content_front = ["HTML", "CSS", "Javascript", "React"];
    let content_back = ["PHP", "Java", ".NET", "Python"];
    let content_ux = ["Diseño", "Redaccion", "Wireframes"];
    let content_marketing = ["Community", "Storytelling", "SEO"];
    let content_design = ["Photoshop", "Illustrator", "After Effects"];

    
    backend.addEventListener("click", function () {
        tituloLanding.innerHTML = "Back End";
        pDesarrolloLanding.innerHTML = "El desarollo <span>Back end</span>  refiere a la capa de acceso de datos de un software o cualquier dispositivo, que no es directamente accesible por los usuarios, además contiene la lógica de la aplicación que maneja dichos datos. Esta capa accede al servidor, que es una aplicación especializada que entiende la forma como el navegador solicita cosas.</p>"
        listado_curso.innerHTML = " ";
        for(let i = 0; i < content_back.length; i++) {
            listado_curso.innerHTML += "<li>" + content_back[i] + "</li>";
        }
        let liCursos = document.querySelectorAll(".list_curso li");
        for(let i = 0; i < liCursos.length; i++) {
            liCursos[i].classList.add("b-rosa");
        }
    })
    ux.addEventListener("click", function(){
        tituloLanding.innerHTML = "UX / UI";
        pDesarrolloLanding.innerHTML = "El diseño de UX es un proceso de diseño estratégico de varios pasos que tiene como objetivo crear un producto o sitio que los clientes/usuarios se sienten atraídos, encuentren fácil de usar y comprendan rápidamente. Y a través del proceso de diseño de UX, llegamos a la solución de interfaz de usuario correcta. El diseño de UX es el viaje y la UI es el destino."
        listado_curso.innerHTML = " ";
        for(let i = 0; i < content_ux.length; i++) {
            listado_curso.innerHTML += "<li>" + content_ux[i] + "</li>";
        }
        let liCursos = document.querySelectorAll(".list_curso li");
        for(let i = 0; i < liCursos.length; i++) {
            liCursos[i].classList.add("b-rosa");
        }
    });
    marketing.addEventListener("click", function(){
        tituloLanding.innerHTML = "Marketing Digital";
        pDesarrolloLanding.innerHTML = "El Marketing Digital, también conocido como Mercadotecnia Digital es el conjunto de actividades que se ejecutan en línea con el objetivo de atraer nuevos negocios, crear relaciones y desarrollar una identidad de marca. Dentro de sus estrategias están el SEO, Inbound Marketing y el Marketing de Contenidos."
        listado_curso.innerHTML = " ";
        for(let i = 0; i < content_marketing.length; i++) {
            listado_curso.innerHTML += "<li>" + content_marketing[i] + "</li>";
        }
        let liCursos = document.querySelectorAll(".list_curso li");
        for(let i = 0; i < liCursos.length; i++) {
            liCursos[i].classList.add("b-rosa");
        }
    })
    diseño.addEventListener("click", function(){
        tituloLanding.innerHTML = "Diseño Digital";
        pDesarrolloLanding.innerHTML = "Diseño Digital capacita en competencias para desempeñarse de manera creativa en las múltiples actividades que ofrecen los medios digitales. Entre las principales aplicaciones se destacan la creación de objetos, personajes y animaciones tridimensionales y bidimensionales, el diseño y diagramación de sitios web en diferentes formatos, el diseño, producción y realización audiovisual, la creación de efectos especiales virtuales,y la planificación de estrategias de comunicación."
        listado_curso.innerHTML = " ";
        for(let i = 0; i < content_design.length; i++) {
            listado_curso.innerHTML += "<li>" + content_design[i] + "</li>";
        }
        let liCursos = document.querySelectorAll(".list_curso li");
        for(let i = 0; i < liCursos.length; i++) {
            liCursos[i].classList.add("b-rosa");
        }
    });

});
