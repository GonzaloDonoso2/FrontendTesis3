$(document).ready(function () {
    
    validarInicioSesion();
});

var idPersonaje1 = "";
var idPersonaje2 = "";

function validarInicioSesion() {
    
    $("#panelMensajeCarga").modal("show");
    
    if (sessionStorage.getItem("idUsuario") === null) {        
        
        irPaginaInicio();
        
    } else {
        
        mostrarSaludoInicial();
        obtenerResultadosBatallas();
        obtenerPersonajes();
        buscarDesafios();
    }   
}

function mostrarSaludoInicial() {
    
    let mensaje = "Bienvenido " + sessionStorage.getItem("nombreUsuario");
    $("#contenedorAlertaVisual").addClass("alert-success").removeClass("alert-danger").removeClass("alert-warning");
    $("#contenedorAlertaVisual").addClass("show").removeClass("fade");
    $("#mensajeAlertaVisual").text(mensaje);
    $("#nombreUsuario").text(" " + sessionStorage.getItem("nombreUsuario"));
}

function obtenerResultadosBatallas() {

    let resultadosBatallas = {

        "idUsuario": sessionStorage.getItem("idUsuario")
    };    
    let backendURL = sessionStorage.getItem("backendURL");    
    let url = backendURL + "/" + "index.php/batallas?resultadosBatallas=" + JSON.stringify(resultadosBatallas);
    
    $.ajax({
        url: url,
        method: "GET",
        success: function (provisoriaRespuesta) {
            
            let respuesta = JSON.parse(provisoriaRespuesta);
            let victorias = 0;
            let derrotas = 0;
            let batallas = parseInt(respuesta.length);
            
            for (let i = 0; i < respuesta.length; i++) {
                
                if (respuesta[i].resultadoBatalla === "VICTORIA") {
                    
                    victorias++;                    
                    
                } else if (respuesta[i].resultadoBatalla === "DERROTA") {
                    
                    derrotas++;                    
                }                
            }
            
            let porcentajeVictorias = 0;
            
            if (batallas > 0 ) {
                
                porcentajeVictorias = ((victorias * 100) / batallas);
                
            } else {
                
                porcentajeVictorias = 0;
            }
            
            $("#batallasUsuario").text(" " + batallas);            
            $("#victoriasUsuario").text(" " + victorias);
            $("#derrotasUsuario").text(" " + derrotas);
            $("#porcentajeVictoriasUsuario").text(" " + porcentajeVictorias);
        }
    });
}

function obtenerPersonajes() {

    let obtenerPersonajes = {

        "idUsuario": sessionStorage.getItem("idUsuario")
    };
    let backendURL = sessionStorage.getItem("backendURL");
    let url = backendURL + "/" + "index.php/personajes?obtenerPersonajes2=" + JSON.stringify(obtenerPersonajes);

    $.ajax({
        url: url,
        method: "GET",
        success: function (provisoriaRespuestaExterior) {

            let respuesta = JSON.parse(provisoriaRespuestaExterior);
            let plantilla = "";

            for (let i = 0; i < respuesta.length; i++) {

                let aleatorioColor = Math.ceil(Math.random() * 6);
                let color;

                if (aleatorioColor === 1) {

                    color = "Amarillo";

                } else if (aleatorioColor === 2) {

                    color = "Azul";

                } else if (aleatorioColor === 3) {

                    color = "Morado";

                } else if (aleatorioColor === 4) {

                    color = "Naranjo";

                } else if (aleatorioColor === 5) {

                    color = "Rojo";

                } else if (aleatorioColor === 6) {

                    color = "Verde";
                }

                plantilla += `<div class="card mb-3" style="max-width: 420px;">`;
                plantilla += `<div class="row g-0">`;
                plantilla += `<div class="col-md-4">`;
                plantilla += `<img class="img-fluid rounded-start" style="border-style: solid; border-radius: 5px; border-width: 1px; height: 210px; width: 156px;" src="../../Imagenes/Personajes/Retratos/${respuesta[i].categoria}/${color}.png">`;
                plantilla += `</div>`;
                plantilla += `<div class="col-md-8">`;
                plantilla += `<div class="card-body" style="font-size: 12px;">`;
                plantilla += `<h5 class="card-title">${respuesta[i].nombre}</h5>`;
                plantilla += `<ul><li><b>Categoría:</b> ${respuesta[i].categoria}</li>`;
                plantilla += `<li><b>Alcance:</b> ${respuesta[i].alcance}</li>`;
                plantilla += `<li><b>Armadura:</b> ${respuesta[i].armadura}</li>`;
                plantilla += `<li><b>Ataque:</b> ${respuesta[i].ataque}</li>`;
                plantilla += `<li><b>Daño:</b> ${respuesta[i].dano}</li>`;
                plantilla += `<li><b>Defensa:</b> ${respuesta[i].defensa}</li>`;
                plantilla += `<li><b>Iniciativa:</b> ${respuesta[i].iniciativa}</li>`;
                plantilla += `<li><b>Movimiento:</b> ${respuesta[i].movimiento}</li>`;
                plantilla += `<li><b>Salud:</b> ${respuesta[i].salud}</li></ul>`;
                plantilla += `<button class="btn btn-outline-primary" disabled id="botonSeleccionarPersonajeVigente${i + 1}" onclick="seleccionarPersonajeVigente(${i + 1}, ${respuesta[i].id})" type="button"><b>SELECCIONAR </b> <i class="fa-solid fa-medal"></i></button>`; 
                plantilla += `</div>`;
                plantilla += `</div>`;
                plantilla += `</div>`;
                plantilla += `</div>`;
            }

            $("#contenedorPersonajes1").html(plantilla);
            let url = backendURL + "/" + "index.php/personajes?obtenerPersonajes3=" + JSON.stringify(obtenerPersonajes);

            $.ajax({
                url: url,
                method: "GET",
                success: function (provisoriaRespuestaInterior) {
                    
                    let plantilla = "";
                    
                    if (provisoriaRespuestaInterior !== "Sin personajes registrados.") {
                        
                        let respuesta = JSON.parse(provisoriaRespuestaInterior);

                        for (let i = 0; i < respuesta.length; i++) {

                            let aleatorioColor = Math.ceil(Math.random() * 6);
                            let color;

                            if (aleatorioColor === 1) {

                                color = "Amarillo";

                            } else if (aleatorioColor === 2) {

                                color = "Azul";

                            } else if (aleatorioColor === 3) {

                                color = "Morado";

                            } else if (aleatorioColor === 4) {

                                color = "Naranjo";

                            } else if (aleatorioColor === 5) {

                                color = "Rojo";

                            } else if (aleatorioColor === 6) {

                                color = "Verde";
                            }

                            plantilla += `<div class="card mb-3" style="max-width: 420px;">`;
                            plantilla += `<div class="row g-0">`;
                            plantilla += `<div class="col-md-4">`;
                            plantilla += `<img class="img-fluid rounded-start" style="border-style: solid; border-radius: 5px; border-width: 1px; height: 210px; width: 156px;" src="../../Imagenes/Personajes/Retratos/${respuesta[i].categoria}/${color}.png">`;
                            plantilla += `</div>`;
                            plantilla += `<div class="col-md-8">`;
                            plantilla += `<div class="card-body" style="font-size: 12px;">`;
                            plantilla += `<h5 class="card-title">${respuesta[i].nombre}</h5>`;
                            plantilla += `<ul><li><b>Categoría:</b> ${respuesta[i].categoria}</li>`;
                            plantilla += `<li><b>Alcance:</b> ${respuesta[i].alcance}</li>`;
                            plantilla += `<li><b>Armadura:</b> ${respuesta[i].armadura}</li>`;
                            plantilla += `<li><b>Ataque:</b> ${respuesta[i].ataque}</li>`;
                            plantilla += `<li><b>Daño:</b> ${respuesta[i].dano}</li>`;
                            plantilla += `<li><b>Defensa:</b> ${respuesta[i].defensa}</li>`;
                            plantilla += `<li><b>Iniciativa:</b> ${respuesta[i].iniciativa}</li>`;
                            plantilla += `<li><b>Movimiento:</b> ${respuesta[i].movimiento}</li>`;
                            plantilla += `<li><b>Salud:</b> ${respuesta[i].salud}</li></ul>`;
                            plantilla += `<button class="btn btn-primary" id="botonSeleccionarPersonajeOtro${i + 1}" onclick="seleccionarPersonajeOtro(${i + 1}, ${respuesta[i].id})" type="button"><b>SELECCIONAR </b> <i class="fa-solid fa-user"></i></button>`; 
                            plantilla += `</div>`;
                            plantilla += `</div>`;
                            plantilla += `</div>`;
                            plantilla += `</div>`;
                        }
                        
                        $("#botonSeleccionarPersonajeVigente1").removeAttr("disabled");
                        $("#botonSeleccionarPersonajeVigente2").removeAttr("disabled");
                        $("#botonSeleccionarPersonajeVigente3").removeAttr("disabled");
                        $("#botonSeleccionarPersonajeVigente4").removeAttr("disabled");
                        $("#botonCambiarPersonajes").removeAttr("disabled");
                        $("#botonSeleccionarPersonajeVigente1").addClass("btn-primary").removeClass("btn-outline-primary");
                        $("#botonSeleccionarPersonajeVigente2").addClass("btn-primary").removeClass("btn-outline-primary");
                        $("#botonSeleccionarPersonajeVigente3").addClass("btn-primary").removeClass("btn-outline-primary");
                        $("#botonSeleccionarPersonajeVigente4").addClass("btn-primary").removeClass("btn-outline-primary");
                        $("#botonCambiarPersonajes").addClass("btn-success").removeClass("btn-outline-success");
                        
                    } else {
                        
                        plantilla += `<h5"><b>No tienes más personajes</b></h5>`;
                        
                    }                    

                    this.idPersonaje1 = "";
                    this.idPersonaje2 = "";
                    $("#contenedorPersonajes2").html(plantilla);
                    $("#panelMensajeCarga").modal("hide");
                }  
            });
        }
    });
}

function seleccionarPersonajeVigente(idBoton, idPersonaje) {
    
    this.idPersonaje1 = idPersonaje;
    let botonSeleccionado = parseInt(idBoton);

    for (let i = 1; i < 5; i++) {

        if (botonSeleccionado !== i) {
            
            let botonA = "#botonSeleccionarPersonajeVigente" + i;
            let botonB = "botonSeleccionarPersonajeVigente" + i;            
            $(botonA).addClass("btn-outline-primary").removeClass("btn-primary");
            document.getElementById(botonB).setAttribute("disabled", true);
        }
    }
}

function seleccionarPersonajeOtro(idBoton, idPersonaje) {
    
    this.idPersonaje2 = idPersonaje;
    let botonSeleccionado = parseInt(idBoton);

    for (let i = 1; i < 5; i++) {

        if (botonSeleccionado !== i) {
            
            let botonA = "#botonSeleccionarPersonajeOtro" + i;
            let botonB = "botonSeleccionarPersonajeOtro" + i;
            let boton = document.getElementById(botonB);

            if (boton !== null) {

               
                $(botonA).addClass("btn-outline-primary").removeClass("btn-primary");
                document.getElementById(botonB).setAttribute("disabled", true);
            }
        }
    }
}

function cambiarPersonajes() {

    if (this.idPersonaje1 === "" || this.idPersonaje2 === "") {
        
        this.idPersonaje1 = "";
        this.idPersonaje2 = "";
        mensaje = "Debe seleccionar a un personaje principal y a otro personaje para poder realizar esta acción.";
        $("#alertaVisual").addClass("alert-warning").removeClass("alert-danger").removeClass("alert-success");
        $("#alertaVisual").addClass("show").removeClass("fade");
        $("#mensajeAlertaVisual").text(mensaje);

    } else {

        let cambioPersonajes = {

            "idUsuario": sessionStorage.getItem("idUsuario"),
            "idPersonaje1": this.idPersonaje1,
            "idPersonaje2": this.idPersonaje2            
        };
        let backendURL = sessionStorage.getItem("backendURL");
        let url = backendURL + "/" + "index.php/personajes?cambioPersonajes=" + JSON.stringify(cambioPersonajes);

        $.ajax({
            url: url,
            method: "PUT",
            success: function (respuesta) {
                
                if (respuesta === "Cambio de personajes registrado.") {

                    mensaje = respuesta;
                    $("#alertaVisual").addClass("alert-success").removeClass("alert-danger").removeClass("alert-warning");
                    $("#alertaVisual").addClass("show").removeClass("fade");
                    $("#mensajeAlertaVisual").text(mensaje);
                    setTimeout(function () {

                        irPagina("Principal")
                    }, 1000);

                } else {
                    
                    mensaje = "Ocurrió un error al intentar realizar esta acción.";;
                    $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
                    $("#alertaVisual").addClass("show").removeClass("fade");
                    $("#mensajeAlertaVisual").text(mensaje);
                    setTimeout(function () {

                        irPagina("Principal")
                    }, 1000);
                } 
            }
        });
    }
}

function seleccionarColor(color) {
    
    sessionStorage.setItem("colorUsuario2", color);
    $("#botonAceptarDesafio").removeAttr("disabled");
}

function aceptarDesafio() {

    let desafioAceptado = {

        "idDesafio": sessionStorage.getItem("idDesafio"),
        "colorUsuario": sessionStorage.getItem("colorUsuario2")
    };

    let backendURL = sessionStorage.getItem("backendURL");
    let url = backendURL + "/" + "index.php/desafios?desafioAceptado=" + JSON.stringify(desafioAceptado);

    $.ajax({
        url: url,
        method: "PUT",
        success: function (respuesta) {
            
            console.log(respuesta);

            if (respuesta !== "Desafío aceptado.") {
                
                $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
                $("#alertaVisual").addClass("show").removeClass("fade");
                $("#mensajeAlertaVisual").text("Ha ocurrido un error al intentar registrar que sea aceptado el desafío en la base de datos.");
            }
        }
    });
}

function rechazarDesafio() {

    let desafioRechazado = {

        "idDesafio": sessionStorage.getItem("idDesafio")
    };    
    let backend = sessionStorage.getItem("backendURL");    
    let url = backend + "/" + "index.php/desafios?desafioRechazado=" + JSON.stringify(desafioRechazado);

    $.ajax({
        url: url,
        method: "PUT",
        success: function (respuesta) {

            if (respuesta !== "Desafío rechazado.") {
                
                $("#alertaVisual").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
                $("#alertaVisual").addClass("show").removeClass("fade");
                $("#mensajeAlertaVisual").text("Ha ocurrido un error al intentar registrar que sea rechazado el desafío en la base de datos.");                
            }
        }
    });    
}

function buscarDesafios() {

    function buscar() { 
        
        let usuario = {

            "idUsuario": sessionStorage.getItem("idUsuario")
        };

        let backendURL = sessionStorage.getItem("backendURL");
        let url = backendURL + "/" + "index.php/desafios?usuario=" + JSON.stringify(usuario);

        $.ajax({
            url: url,
            method: "GET",
            success: function (provisoriaRespuestaExterior) {

                if (provisoriaRespuestaExterior !== "Sin desafios vigentes.") {

                    clearInterval(idEjecutorFuncionExterna);
                    let respuestaExterior = JSON.parse(provisoriaRespuestaExterior);
                    sessionStorage.setItem("idDesafio", respuestaExterior[0].idDesafio);
                    sessionStorage.setItem("colorUsuario1", respuestaExterior[0].colorUsuario1);
                    $("#fechaDesafio").text(respuestaExterior[0].fecha);
                    $("#mensajeDesafio").text("Fue desafiado por el usuario " + respuestaExterior[0].nombreUsuario1 + " a una batalla.");
                    let botonAmarillo = "";
                    let botonAzul = "";
                    let botonMorado = "";
                    let botonNaranjo = "";
                    let botonRojo = "";
                    let botonVerde = "";
                    let plantilla;

                    if (respuestaExterior[0].colorUsuario1 !== "Amarillo") {

                        botonAmarillo = `<button class="btn" id="botonAmarillo" onclick="seleccionarColor('Amarillo')" style="background-color: #E5E5E5;" title="Amarillo" type="button"><img height="50px" src="../../Imagenes/Escudos/Amarillo.png" width="50px"></button>`;
                    }
                    if (respuestaExterior[0].colorUsuario1 !== "Azul") {

                        botonAzul = `<button class="btn" id="botonAzul" onclick="seleccionarColor('Azul')" style="background-color: #E5E5E5;" title="Azul" type="button"><img height="50px" src="../../Imagenes/Escudos/Azul.png" width="50px"></button>`;
                    }
                    if (respuestaExterior[0].colorUsuario1 !== "Morado") {

                        botonMorado = `<button class="btn" id="botonMorado" onclick="seleccionarColor('Morado')" style="background-color: #E5E5E5;" title="Morado" type="button"><img height="50px" src="../../Imagenes/Escudos/Morado.png" width="50px"></button>`;
                    }
                    if (respuestaExterior[0].colorUsuario1 !== "Naranjo") {

                        botonNaranjo = `<button class="btn" id="botonNaranjo" onclick="seleccionarColor('Naranjo')" style="background-color: #E5E5E5;" title="Naranjo" type="button"><img height="50px" src="../../Imagenes/Escudos/Naranjo.png" width="50px"></button>`;
                    }
                    if (respuestaExterior[0].colorUsuario1 !== "Rojo") {

                        botonRojo = `<button class="btn" id="botonRojo" onclick="seleccionarColor('Rojo')" style="background-color: #E5E5E5;" title="Rojo" type="button"><img height="50px" src="../../Imagenes/Escudos/Rojo.png" width="50px"></button>`;
                    }
                    if (respuestaExterior[0].colorUsuario1 !== "Verde") {

                        botonVerde = `<button class="btn" id="botonVerde" onclick="seleccionarColor('Verde')" style="background-color: #E5E5E5;" title="Verde" type="button"><img height="50px" src="../../Imagenes/Escudos/Verde.png" width="50px"></button>`;
                    }

                    plantilla = botonAmarillo + botonAzul + botonMorado + botonNaranjo + botonRojo + botonVerde;
                    $("#contenedorBotonesOpcionColor").html(plantilla);
                    $("#panelMensajeDesafios").modal("show");
                    let segundosRestantes = 19;

                    function cuentaRegresiva() {

                        segundosRestantes--;

                        if (segundosRestantes >= 0) {
                            
                            $("#mensajeCuentaRegresiva").text(segundosRestantes);

                            let idDesafio = {

                                "id": sessionStorage.getItem("idDesafio")
                            };

                            url = backendURL + "/" + "index.php/desafios?idDesafio=" + JSON.stringify(idDesafio);

                            $.ajax({
                                url: url,
                                method: "GET",
                                success: function (provisoriaRespuestaInterior) {

                                    if (provisoriaRespuestaInterior !== "Sin Respuesta.") {
                                        
                                        clearInterval(idEjecutorFuncionInterna);
                                        let respuestaInterior = JSON.parse(provisoriaRespuestaInterior);
                                        
                                        if (respuestaInterior[0].estadoDesafio === "ACEPTADO") {
                                            
                                            $("#panelMensajeDesafios").modal("hide");
                                            $("#panelMensajeCarga").modal("show");                                            
                                            let frontendURL = sessionStorage.getItem("frontendURL");
                                            location.href = frontendURL + "/" + "Modulos/Batallas/Pagina.php";

                                        } else if (respuestaInterior[0].estadoDesafio === "RECHAZADO") {                                            

                                            $("#panelMensajeDesafios").modal("hide");
                                            sessionStorage.setItem("idDesafio", null);
                                            sessionStorage.setItem("colorUsuario1", null);
                                            sessionStorage.setItem("colorUsuario2", null);
                                            buscarDesafios();
                                        }
                                    }
                                }
                            });

                        } else {

                            clearInterval(idEjecutorFuncionInterna);
                            rechazarDesafio();
                            $("#panelMensajeDesafios").modal("hide");
                            sessionStorage.setItem("idDesafio", null);
                            sessionStorage.setItem("colorUsuario1", null);
                            sessionStorage.setItem("colorUsuario2", null);
                            buscarDesafios();
                        }
                    }

                    idEjecutorFuncionInterna = setInterval(cuentaRegresiva, 1000);
                }
            }
        });
    }

    idEjecutorFuncionExterna = setInterval(buscar, 3000);
}



