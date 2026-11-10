/* ============================================================
   AutoPro Taller - JavaScript básico
   Proyecto académico: variables, condicionales, funciones,
   arreglos, ciclos y manipulación del DOM.
   ============================================================ */

/* Usuarios de demostración */
let usuarios = [
  {
    correo: "cliente@taller.com",
    clave: "cliente123",
    nombre: "Carlos Ramírez",
    rol: "cliente",
    telefono: "300 123 4567"
  },
  {
    correo: "admin@taller.com",
    clave: "admin123",
    nombre: "Ana Torres",
    rol: "admin",
    telefono: "320 555 8899"
  }
];

/* Solicitudes de ejemplo */
let solicitudes = [
  {
    id: "SOL-0001",
    clienteCorreo: "cliente@taller.com",
    clienteNombre: "Carlos Ramírez",
    clienteTelefono: "300 123 4567",
    placa: "ABC-123",
    marca: "Toyota",
    modelo: "Corolla",
    anio: 2019,
    kilometraje: 45200,
    servicio: "Cambio de aceite",
    fecha: "2026-11-12",
    hora: "09:00",
    modalidad: "En el taller",
    comentarios: "Revisar también el nivel de los frenos.",
    estado: "Pendiente"
  },
  {
    id: "SOL-0002",
    clienteCorreo: "cliente@taller.com",
    clienteNombre: "Carlos Ramírez",
    clienteTelefono: "300 123 4567",
    placa: "ABC-123",
    marca: "Toyota",
    modelo: "Corolla",
    anio: 2019,
    kilometraje: 44100,
    servicio: "Revisión de frenos",
    fecha: "2026-11-15",
    hora: "11:30",
    modalidad: "En el taller",
    comentarios: "El pedal se siente un poco blando.",
    estado: "En revisión"
  },
  {
    id: "SOL-0003",
    clienteCorreo: "cliente@taller.com",
    clienteNombre: "Carlos Ramírez",
    clienteTelefono: "300 123 4567",
    placa: "ABC-123",
    marca: "Toyota",
    modelo: "Corolla",
    anio: 2019,
    kilometraje: 43800,
    servicio: "Mantenimiento general",
    fecha: "2026-11-05",
    hora: "08:30",
    modalidad: "En el taller",
    comentarios: "Mantenimiento de los 45.000 kilómetros.",
    estado: "Finalizado"
  },
  {
    id: "SOL-0004",
    clienteCorreo: "pedro@correo.com",
    clienteNombre: "Pedro Salazar",
    clienteTelefono: "301 222 3344",
    placa: "MNO-77E",
    marca: "Renault",
    modelo: "Logan",
    anio: 2018,
    kilometraje: 88100,
    servicio: "Mantenimiento general",
    fecha: "2026-11-14",
    hora: "14:00",
    modalidad: "Recogida a domicilio",
    comentarios: "Solicita recogida en la mañana.",
    estado: "Pendiente"
  }
];

/* Variables de trabajo */
let usuarioActivo = null;
let solicitudEnEdicion = null;
let contadorId = 5;
let anioActual = new Date().getFullYear();

/* ------------------------------------------------------------
   Inicio de la página
   ------------------------------------------------------------ */
function iniciarPagina() {
  document.getElementById("anio").textContent = anioActual;
  document.getElementById("pantalla-login").style.display = "flex";
  document.getElementById("app").style.display = "none";
  document.getElementById("login-correo").focus();
}

/* ------------------------------------------------------------
   Inicio de sesión
   ------------------------------------------------------------ */
function iniciarSesion(evento) {
  evento.preventDefault();

  let correo = document.getElementById("login-correo").value.trim();
  let clave = document.getElementById("login-clave").value.trim();
  let error = document.getElementById("login-error");
  let encontrado = null;

  error.textContent = "";

  if (correo === "") {
    error.textContent = "Escriba el correo electrónico.";
    return false;
  }

  if (clave === "") {
    error.textContent = "Escriba la contraseña.";
    return false;
  }

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].correo === correo && usuarios[i].clave === clave) {
      encontrado = usuarios[i];
    }
  }

  if (encontrado === null) {
    error.textContent = "Correo o contraseña incorrectos.";
    return false;
  }

  usuarioActivo = encontrado;
  solicitudEnEdicion = null;

  document.getElementById("login-correo").value = "";
  document.getElementById("login-clave").value = "";
  document.getElementById("pantalla-login").style.display = "none";
  document.getElementById("app").style.display = "block";

  aplicarRol();
  mostrarSeccion("inicio");
  alert("Bienvenido, " + usuarioActivo.nombre);

  return false;
}

function llenarCliente() {
  document.getElementById("login-correo").value = "cliente@taller.com";
  document.getElementById("login-clave").value = "cliente123";
  document.getElementById("login-error").textContent = "";
  document.getElementById("login-clave").focus();
}

function llenarAdmin() {
  document.getElementById("login-correo").value = "admin@taller.com";
  document.getElementById("login-clave").value = "admin123";
  document.getElementById("login-error").textContent = "";
  document.getElementById("login-clave").focus();
}

/* ------------------------------------------------------------
   Menú y permisos según el rol
   ------------------------------------------------------------ */
function aplicarRol() {
  let info = document.getElementById("usuario-info");
  let menuCliente = document.getElementById("menu-cliente");
  let menuAdmin = document.getElementById("menu-admin");

  if (usuarioActivo.rol === "admin") {
    info.textContent = usuarioActivo.nombre + " (Administrador)";
    menuCliente.style.display = "none";
    menuAdmin.style.display = "inline-block";
    document.getElementById("titulo-solicitudes").textContent = "Gestión de solicitudes";
    document.getElementById("nota-rol").textContent = "Como administrador puede ver, editar, eliminar y cambiar el estado de todas las solicitudes.";
  } else {
    info.textContent = usuarioActivo.nombre + " (Cliente)";
    menuCliente.style.display = "inline-block";
    menuAdmin.style.display = "none";
    document.getElementById("titulo-solicitudes").textContent = "Mis solicitudes";
    document.getElementById("nota-rol").textContent = "Como cliente puede registrar solicitudes y consultar su historial.";
  }

  document.getElementById("nombre-bienvenida").textContent = usuarioActivo.nombre;
}

function mostrarSeccion(nombre) {
  let secciones = ["inicio", "acerca", "servicios", "solicitudes", "formulario", "perfil"];

  for (let i = 0; i < secciones.length; i++) {
    document.getElementById("seccion-" + secciones[i]).style.display = "none";
  }

  document.getElementById("seccion-" + nombre).style.display = "block";

  if (nombre === "solicitudes") {
    mostrarSolicitudes();
  }

  if (nombre === "perfil") {
    mostrarPerfil();
  }

  window.scrollTo(0, 0);
}

function cerrarSesion() {
  if (confirm("¿Desea cerrar sesión?") === false) {
    return;
  }

  usuarioActivo = null;
  solicitudEnEdicion = null;

  document.getElementById("form-solicitud").reset();
  document.getElementById("filtro-texto").value = "";
  document.getElementById("filtro-estado").value = "";
  document.getElementById("login-error").textContent = "";
  document.getElementById("app").style.display = "none";
  document.getElementById("pantalla-login").style.display = "flex";
  document.getElementById("login-correo").focus();
}

/* ------------------------------------------------------------
   Listado de solicitudes
   ------------------------------------------------------------ */
function mostrarSolicitudes() {
  if (usuarioActivo === null) {
    return;
  }

  let texto = document.getElementById("filtro-texto").value.trim().toLowerCase();
  let estadoFiltro = document.getElementById("filtro-estado").value;
  let filas = "";
  let total = 0;
  let mostradas = 0;

  for (let i = 0; i < solicitudes.length; i++) {
    let s = solicitudes[i];
    let esMia = false;

    if (s.clienteCorreo === usuarioActivo.correo) {
      esMia = true;
    }

    if (usuarioActivo.rol === "admin" || esMia === true) {
      total = total + 1;

      let coincideTexto = true;

      if (texto !== "") {
        let datos = (s.id + " " + s.clienteNombre + " " + s.placa + " " + s.marca + " " + s.modelo + " " + s.servicio).toLowerCase();

        if (datos.indexOf(texto) === -1) {
          coincideTexto = false;
        }
      }

      let coincideEstado = true;

      if (estadoFiltro !== "" && s.estado !== estadoFiltro) {
        coincideEstado = false;
      }

      if (coincideTexto === true && coincideEstado === true) {
        mostradas = mostradas + 1;

        filas = filas + "<tr>";
        filas = filas + "<td>" + s.id + "</td>";
        filas = filas + "<td>" + s.clienteNombre + "</td>";
        filas = filas + "<td><strong>" + s.placa + "</strong><br>" + s.marca + " " + s.modelo + " (" + s.anio + ")</td>";
        filas = filas + "<td>" + s.servicio + "</td>";
        filas = filas + "<td>" + s.fecha + "<br>" + s.hora + "</td>";

        if (usuarioActivo.rol === "admin") {
          filas = filas + "<td><select onchange=\"cambiarEstado('" + s.id + "', this.value)\">";
          filas = filas + opcionesEstado(s.estado);
          filas = filas + "</select></td>";

          filas = filas + "<td>";
          filas = filas + "<button type='button' class='boton boton-pequeno' onclick=\"verDetalle('" + s.id + "')\">Ver</button> ";
          filas = filas + "<button type='button' class='boton boton-pequeno' onclick=\"editarSolicitud('" + s.id + "')\">Editar</button> ";
          filas = filas + "<button type='button' class='boton boton-pequeno boton-peligro' onclick=\"eliminarSolicitud('" + s.id + "')\">Eliminar</button>";
          filas = filas + "</td>";
        } else {
          filas = filas + "<td><span class='estado estado-" + claseEstado(s.estado) + "'>" + s.estado + "</span></td>";
          filas = filas + "<td><button type='button' class='boton boton-pequeno' onclick=\"verDetalle('" + s.id + "')\">Ver</button></td>";
        }

        filas = filas + "</tr>";
      }
    }
  }

  document.getElementById("cuerpo-tabla").innerHTML = filas;
  document.getElementById("contador-solicitudes").textContent = "Mostrando " + mostradas + " de " + total + " solicitudes.";

  if (mostradas === 0) {
    document.getElementById("contenedor-tabla").style.display = "none";
    document.getElementById("sin-solicitudes").style.display = "block";
  } else {
    document.getElementById("contenedor-tabla").style.display = "block";
    document.getElementById("sin-solicitudes").style.display = "none";
  }
}

function opcionesEstado(estadoActual) {
  let estados = ["Pendiente", "En revisión", "En proceso", "Finalizado", "Cancelado"];
  let html = "";

  for (let i = 0; i < estados.length; i++) {
    if (estados[i] === estadoActual) {
      html = html + "<option value='" + estados[i] + "' selected>" + estados[i] + "</option>";
    } else {
      html = html + "<option value='" + estados[i] + "'>" + estados[i] + "</option>";
    }
  }

  return html;
}

function claseEstado(estado) {
  if (estado === "Pendiente") {
    return "pendiente";
  }
  if (estado === "En revisión") {
    return "revision";
  }
  if (estado === "En proceso") {
    return "proceso";
  }
  if (estado === "Finalizado") {
    return "finalizado";
  }
  return "cancelado";
}

function cambiarEstado(id, nuevoEstado) {
  if (usuarioActivo === null || usuarioActivo.rol !== "admin") {
    alert("Solo el administrador puede cambiar el estado.");
    return;
  }

  for (let i = 0; i < solicitudes.length; i++) {
    if (solicitudes[i].id === id) {
      solicitudes[i].estado = nuevoEstado;
    }
  }

  mostrarSolicitudes();
  alert("Estado actualizado correctamente.");
}

function verDetalle(id) {
  let s = null;

  for (let i = 0; i < solicitudes.length; i++) {
    if (solicitudes[i].id === id) {
      s = solicitudes[i];
    }
  }

  if (s === null) {
    alert("La solicitud no existe.");
    return;
  }

  if (usuarioActivo.rol !== "admin" && s.clienteCorreo !== usuarioActivo.correo) {
    alert("No tiene permiso para ver esta solicitud.");
    return;
  }

  let mensaje = "SOLICITUD " + s.id + "\n\n";
  mensaje = mensaje + "Cliente: " + s.clienteNombre + "\n";
  mensaje = mensaje + "Correo: " + s.clienteCorreo + "\n";
  mensaje = mensaje + "Teléfono: " + s.clienteTelefono + "\n\n";
  mensaje = mensaje + "Vehículo: " + s.marca + " " + s.modelo + " (" + s.anio + ")\n";
  mensaje = mensaje + "Placa: " + s.placa + "\n";
  mensaje = mensaje + "Kilometraje: " + s.kilometraje + " km\n\n";
  mensaje = mensaje + "Servicio: " + s.servicio + "\n";
  mensaje = mensaje + "Fecha: " + s.fecha + "\n";
  mensaje = mensaje + "Hora: " + s.hora + "\n";
  mensaje = mensaje + "Modalidad: " + s.modalidad + "\n";
  mensaje = mensaje + "Estado: " + s.estado + "\n\n";

  if (s.comentarios === "") {
    mensaje = mensaje + "Comentarios: Sin comentarios.";
  } else {
    mensaje = mensaje + "Comentarios: " + s.comentarios;
  }

  alert(mensaje);
}

function limpiarFiltros() {
  document.getElementById("filtro-texto").value = "";
  document.getElementById("filtro-estado").value = "";
  mostrarSolicitudes();
}

/* ------------------------------------------------------------
   Perfil del usuario
   ------------------------------------------------------------ */
function mostrarPerfil() {
  if (usuarioActivo === null) {
    return;
  }

  document.getElementById("perfil-nombre").textContent = usuarioActivo.nombre;
  document.getElementById("perfil-correo").textContent = usuarioActivo.correo;
  document.getElementById("perfil-telefono").textContent = usuarioActivo.telefono;

  if (usuarioActivo.rol === "admin") {
    document.getElementById("perfil-rol").textContent = "Administrador";
  } else {
    document.getElementById("perfil-rol").textContent = "Cliente";
  }

  let total = 0;
  let pendientes = 0;
  let finalizadas = 0;

  for (let i = 0; i < solicitudes.length; i++) {
    let s = solicitudes[i];

    if (usuarioActivo.rol === "admin" || s.clienteCorreo === usuarioActivo.correo) {
      total = total + 1;

      if (s.estado === "Pendiente") {
        pendientes = pendientes + 1;
      }

      if (s.estado === "Finalizado") {
        finalizadas = finalizadas + 1;
      }
    }
  }

  document.getElementById("perfil-total").textContent = total;
  document.getElementById("perfil-pendientes").textContent = pendientes;
  document.getElementById("perfil-finalizadas").textContent = finalizadas;
}

/* ------------------------------------------------------------
   Formulario de solicitud
   ------------------------------------------------------------ */
function nuevaSolicitud() {
  if (usuarioActivo === null) {
    return;
  }

  solicitudEnEdicion = null;

  document.getElementById("form-solicitud").reset();
  document.getElementById("solicitud-id").value = "";
  document.getElementById("titulo-formulario").textContent = "Nueva solicitud";
  document.getElementById("btn-guardar").textContent = "Guardar solicitud";
  document.getElementById("btn-cancelar").style.display = "none";

  prepararFormulario();
  mostrarSeccion("formulario");
}

function prepararFormulario() {
  let nombre = document.getElementById("cliente-nombre");
  let correo = document.getElementById("cliente-correo");
  let telefono = document.getElementById("cliente-telefono");

  if (usuarioActivo.rol === "cliente") {
    nombre.value = usuarioActivo.nombre;
    correo.value = usuarioActivo.correo;
    telefono.value = usuarioActivo.telefono;

    nombre.readOnly = true;
    correo.readOnly = true;
    telefono.readOnly = true;
  } else {
    nombre.readOnly = false;
    correo.readOnly = false;
    telefono.readOnly = false;
  }
}

function guardarSolicitud(evento) {
  evento.preventDefault();

  let nombre = document.getElementById("cliente-nombre").value.trim();
  let correo = document.getElementById("cliente-correo").value.trim();
  let telefono = document.getElementById("cliente-telefono").value.trim();
  let placa = document.getElementById("vehiculo-placa").value.trim().toUpperCase();
  let marca = document.getElementById("vehiculo-marca").value.trim();
  let modelo = document.getElementById("vehiculo-modelo").value.trim();
  let anio = document.getElementById("vehiculo-anio").value;
  let kilometraje = document.getElementById("vehiculo-kilometraje").value;
  let servicio = document.getElementById("servicio").value;
  let fecha = document.getElementById("solicitud-fecha").value;
  let hora = document.getElementById("solicitud-hora").value;
  let modalidad = document.getElementById("solicitud-modalidad").value;
  let comentarios = document.getElementById("solicitud-comentarios").value.trim();

  if (nombre === "") {
    alert("Escriba el nombre del cliente.");
    return false;
  }

  if (correo === "") {
    alert("Escriba el correo del cliente.");
    return false;
  }

  if (correo.indexOf("@") === -1) {
    alert("El correo debe tener el símbolo @.");
    return false;
  }

  if (telefono === "") {
    alert("Escriba el teléfono del cliente.");
    return false;
  }

  if (placa === "") {
    alert("Escriba la placa del vehículo.");
    return false;
  }

  if (placa.length < 6) {
    alert("La placa debe tener al menos 6 caracteres. Ejemplo: ABC-123.");
    return false;
  }

  if (marca === "") {
    alert("Escriba la marca del vehículo.");
    return false;
  }

  if (modelo === "") {
    alert("Escriba el modelo del vehículo.");
    return false;
  }

  if (anio === "") {
    alert("Escriba el año del vehículo.");
    return false;
  }

  if (isNaN(anio) === true) {
    alert("El año debe ser un número.");
    return false;
  }

  if (anio < 1950 || anio > anioActual + 1) {
    alert("El año debe estar entre 1950 y " + (anioActual + 1) + ".");
    return false;
  }

  if (kilometraje === "") {
    alert("Escriba el kilometraje del vehículo.");
    return false;
  }

  if (isNaN(kilometraje) === true) {
    alert("El kilometraje debe ser un número.");
    return false;
  }

  if (kilometraje < 0) {
    alert("El kilometraje no puede ser negativo.");
    return false;
  }

  if (servicio === "") {
    alert("Seleccione un tipo de servicio.");
    return false;
  }

  if (fecha === "") {
    alert("Seleccione una fecha.");
    return false;
  }

  if (hora === "") {
    alert("Seleccione una hora.");
    return false;
  }

  let clienteCorreo = correo;

  if (usuarioActivo.rol === "cliente") {
    clienteCorreo = usuarioActivo.correo;
    nombre = usuarioActivo.nombre;
    telefono = usuarioActivo.telefono;
  }

  if (solicitudEnEdicion !== null) {
    for (let i = 0; i < solicitudes.length; i++) {
      if (solicitudes[i].id === solicitudEnEdicion) {
        solicitudes[i].clienteCorreo = clienteCorreo;
        solicitudes[i].clienteNombre = nombre;
        solicitudes[i].clienteTelefono = telefono;
        solicitudes[i].placa = placa;
        solicitudes[i].marca = marca;
        solicitudes[i].modelo = modelo;
        solicitudes[i].anio = Number(anio);
        solicitudes[i].kilometraje = Number(kilometraje);
        solicitudes[i].servicio = servicio;
        solicitudes[i].fecha = fecha;
        solicitudes[i].hora = hora;
        solicitudes[i].modalidad = modalidad;
        solicitudes[i].comentarios = comentarios;
      }
    }

    solicitudEnEdicion = null;
    document.getElementById("form-solicitud").reset();
    document.getElementById("solicitud-id").value = "";
    document.getElementById("titulo-formulario").textContent = "Nueva solicitud";
    document.getElementById("btn-guardar").textContent = "Guardar solicitud";
    document.getElementById("btn-cancelar").style.display = "none";
    document.getElementById("filtro-texto").value = "";
    document.getElementById("filtro-estado").value = "";

    alert("Solicitud actualizada correctamente.");
    mostrarSeccion("solicitudes");
    return false;
  }

  let nuevoId = generarId();

  solicitudes.push({
    id: nuevoId,
    clienteCorreo: clienteCorreo,
    clienteNombre: nombre,
    clienteTelefono: telefono,
    placa: placa,
    marca: marca,
    modelo: modelo,
    anio: Number(anio),
    kilometraje: Number(kilometraje),
    servicio: servicio,
    fecha: fecha,
    hora: hora,
    modalidad: modalidad,
    comentarios: comentarios,
    estado: "Pendiente"
  });

  document.getElementById("form-solicitud").reset();
  document.getElementById("solicitud-id").value = "";
  document.getElementById("filtro-texto").value = "";
  document.getElementById("filtro-estado").value = "";

  alert("Solicitud registrada con el ID " + nuevoId + ".");
  mostrarSeccion("solicitudes");

  return false;
}

function generarId() {
  let numero = contadorId;
  contadorId = contadorId + 1;

  if (numero < 10) {
    return "SOL-000" + numero;
  }

  if (numero < 100) {
    return "SOL-00" + numero;
  }

  if (numero < 1000) {
    return "SOL-0" + numero;
  }

  return "SOL-" + numero;
}

function editarSolicitud(id) {
  if (usuarioActivo === null || usuarioActivo.rol !== "admin") {
    alert("Solo el administrador puede editar solicitudes.");
    return;
  }

  let s = null;

  for (let i = 0; i < solicitudes.length; i++) {
    if (solicitudes[i].id === id) {
      s = solicitudes[i];
    }
  }

  if (s === null) {
    alert("La solicitud no existe.");
    return;
  }

  solicitudEnEdicion = id;
  prepararFormulario();

  document.getElementById("solicitud-id").value = s.id;
  document.getElementById("cliente-nombre").value = s.clienteNombre;
  document.getElementById("cliente-correo").value = s.clienteCorreo;
  document.getElementById("cliente-telefono").value = s.clienteTelefono;
  document.getElementById("vehiculo-placa").value = s.placa;
  document.getElementById("vehiculo-marca").value = s.marca;
  document.getElementById("vehiculo-modelo").value = s.modelo;
  document.getElementById("vehiculo-anio").value = s.anio;
  document.getElementById("vehiculo-kilometraje").value = s.kilometraje;
  document.getElementById("servicio").value = s.servicio;
  document.getElementById("solicitud-fecha").value = s.fecha;
  document.getElementById("solicitud-hora").value = s.hora;
  document.getElementById("solicitud-modalidad").value = s.modalidad;
  document.getElementById("solicitud-comentarios").value = s.comentarios;
  document.getElementById("titulo-formulario").textContent = "Editar solicitud " + s.id;
  document.getElementById("btn-guardar").textContent = "Guardar cambios";
  document.getElementById("btn-cancelar").style.display = "inline-block";

  mostrarSeccion("formulario");
}

function eliminarSolicitud(id) {
  if (usuarioActivo === null || usuarioActivo.rol !== "admin") {
    alert("Solo el administrador puede eliminar solicitudes.");
    return;
  }

  if (confirm("¿Desea eliminar la solicitud " + id + "?") === false) {
    return;
  }

  let existe = false;

  for (let i = 0; i < solicitudes.length; i++) {
    if (solicitudes[i].id === id) {
      existe = true;
    }
  }

  if (existe === false) {
    alert("La solicitud no existe.");
    return;
  }

  let nuevas = [];

  for (let i = 0; i < solicitudes.length; i++) {
    if (solicitudes[i].id !== id) {
      nuevas.push(solicitudes[i]);
    }
  }

  solicitudes = nuevas;

  if (solicitudEnEdicion === id) {
    solicitudEnEdicion = null;
  }

  alert("Solicitud eliminada correctamente.");
  mostrarSolicitudes();
}

function cancelarEdicion() {
  solicitudEnEdicion = null;
  document.getElementById("form-solicitud").reset();
  document.getElementById("solicitud-id").value = "";
  document.getElementById("titulo-formulario").textContent = "Nueva solicitud";
  document.getElementById("btn-guardar").textContent = "Guardar solicitud";
  document.getElementById("btn-cancelar").style.display = "none";
  mostrarSeccion("solicitudes");
}

/* ------------------------------------------------------------
   Arranque del sistema
   ------------------------------------------------------------ */
window.onload = iniciarPagina;
