<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">        
        <!--Estos <links> contienen la CDN de Bootstrap que dan estilo e iconos a la página web.-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">
        <!--Este <script></script> contienen la CDN de Font Awesome que dan iconos a la página web.-->
        <script src="https://kit.fontawesome.com/06c09b3cfb.js" crossorigin="anonymous"></script>
        <title>Perro Negro sitio web</title>
    </head>
    <body>
        <!--Este <nav></nav> contiene el menú de opciones.-->   
        <nav class="navbar navbar-expand-lg navbar-dark sticky-top" style="background-color:#6B6B6B;">
            <div class="container-fluid">
                <img height="50px" src="../../Imagenes/LogotipoEmpresa.png" width="50px">
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page">Perro Negro sitio web</a>
                        </li>
                        <li class="nav-item">
                            <a class="btn nav-link active" aria-current="page" onclick="irPagina('DesafiarUsuarios')">Desafiar Usuarios</a>
                        </li>
                        <li class="nav-item">
                            <a class="btn nav-link" aria-current="page" onclick="irPagina('DatosUsuario')">Datos del Usuario</a>
                        </li> 
                    </ul>
                </div>
                <a class="btn nav-link" aria-current="page" onclick="terminarSesion()" style="color: #842029;"><b>Terminar Sesión</b></a>
            </div>
        </nav>
        <main>
            <!--Este <div></div> contiene el panel con el mensaje de carga para el jugador.-->
            <div class="modal fade" id="panelMensajeCarga" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header" style="background-color: #fff3cd; color: #664d03; justify-content: center;">
                            <h5 class="modal-title"><b>Espere por favor...</b></h5>                   
                        </div>
                        <div class="modal-body">
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border text-warning" style="width: 6rem; height: 6rem;" role="status">
                                    <span class="sr-only">Espere por favor...</span>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div> 
            <!--Este <div></div> contiene la alerta visual.-->
            <div class="alert alert-success alert-dismissible show" id="alertaVisual" role="alert">
                <p><b id="mensajeAlertaVisual"></b></p>
                <button aria-label="Close" class="btn-close" id="botonOcultarAlertaVisual" onclick="ocultarAlertaVisual()" type="button"></button>
            </div>
            <!--Este <div></div> contiene los resultados de las batallas del usuario y la tabla con sus personajes.-->
            <div class="container form-control">
                <div class="row">
                    <div class="col">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td>
                                        <ul style="list-style-type: none;">
                                            <li><span><i class="fa-solid fa-user"></i></span></li>
                                            <li><span><i class="fa-solid fa-shield"></i></span></li>
                                            <li><span><i class="fa-solid fa-trophy"></i></span></li>
                                            <li><span><i class="fa-solid fa-skull"></i></span></li>
                                            <li><span><i class="fa-solid fa-percent"></i></span></li>
                                        </ul>     
                                    </td>
                                    <td>
                                        <ul style="list-style-type: none;">
                                            <li><b id="nombreUsuario"></b></li>
                                            <li><b id="batallasUsuario"></b></li>
                                            <li><b id="victoriasUsuario"></b></li>
                                            <li><b id="derrotasUsuario"></b></li>
                                            <li><b id="porcentajeVictoriasUsuario"></b></li>
                                        </ul>   
                                    </td>
                                </tr>
                            </tbody>
                        </table>                                             
                    </div> 
                    <div class="col">
                        <ul>
                            <li><span><i class="fa-solid fa-user"></i></span></li>
                            <li><span><i class="fa-solid fa-shield"></i></span></li>
                            <li><span><i class="fa-solid fa-trophy"></i></span></li>
                            <li><span><i class="fa-solid fa-skull"></i></span></li>
                            <li><span><i class="fa-solid fa-percent"></i></span></li>
                        </ul>                                   
                    </div>           
                </div>
                <div class="container row">
                    <button class="btn btn-outline-success" disabled id="botonCambiarPersonajes" onclick="cambiarPersonajes()" type="button"><b>CAMBIAR PERSONAJE </b> <i class="fa-solid fa-right-left"></i></button> 
                    <div class="col form-control" style="height: 300px; overflow-y: scroll; width: 100%;">
                        <p><i class="fa-solid fa-medal"></i> <b>PERSONAJES PRINCIPALES</b></p>
                        <div id="contenedorPersonajes1"></div>                       
                    </div>
                    <div class="col form-control" style="height: 300px; overflow-y: scroll; width: 100%;">
                        <p><i class="fa-solid fa-users"></i> <b>OTROS PERSONAJES</b></p>
                        <div id="contenedorPersonajes2"></div>                       
                    </div>
                </div>                
            </div>               
            <!--Este <div></div> el panel con mensajes de desafío para el usuario.-->
            <div class="modal fade" id="panelMensajeDesafios" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header" style="background-color: #fff3cd; color: #664d03; justify-content: center;">
                            <h5><b>Has recibido un desafío</b> <i class="bi bi-shield-exclamation"></i></h5>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col">
                                    <h6 id="fechaDesafio" style="text-align: center;"></h6>
                                    <h6 id="mensajeDesafio" style="text-align: center;"></h6>
                                </div> 
                                <div class="col" style="background-color: #fff3cd; color: #664d03;">
                                    <h1 id="mensajeCuentaRegresiva" style="font-size: 80px; text-align: center;"><i class="bi bi-exclamation-triangle"></i></h1>
                                </div>
                            </div>                            
                        </div>
                        <div class="modal-footer" id="contenedorBotonesOpcionColor" style="justify-content: center;"></div>
                        <div class="modal-footer" style="justify-content: center;">
                            <button class="btn btn-success" data-bs-dismiss="modal" id="botonAceptarDesafio" disabled onclick="aceptarDesafio()" title="¿Acepta este desafío?" type="button">Aceptar <i class="bi bi-shield-check"></i></button>
                            <button class="btn btn-danger" data-bs-dismiss="modal" id="botonRechazarDesafio" onclick="rechazarDesafio()" title="¿Rechaza este desafío?" type="button">Rechazar <i class="bi bi-shield-x"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <!--Estos <script></script> contienen la CDN de jQuery que dan funcionalidades a la página web.-->
        <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
        <!--Estos <script></script> contienen la CDN de Bootstrap que dan funcionalidades a la página web.-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>       
        <script src="Funciones.js"></script>
        <script src="../../Funciones/FuncionesComunes.js"></script>
    </body>
</html>