// Datos de ejemplo de usuarios
const usuariosEjemplo = [
  {
    id: 1,
    nombre: "Juan Carlos",
    apellido: "Pérez García",
    cartonesSolicitados: [
      { numeros: [5, 23, 67], precio: 2000 },
      { numeros: [12, 45, 89], precio: 2000 },
      { numeros: [3, 56, 78], precio: 2000 },
    ],
    totalCartones: 3,
    totalPagado: 6000,
    estadoPago: "pendiente",
  },
  {
    id: 2,
    nombre: "María Elena",
    apellido: "Rodríguez López",
    cartonesSolicitados: [
      { numeros: [15, 34, 92], precio: 2000 },
      { numeros: [7, 28, 63], precio: 2000 },
    ],
    totalCartones: 2,
    totalPagado: 4000,
    estadoPago: "pagado",
  },
]

// Función para alternar el desplegable
function toggleTablaAdmin() {
  const tabla = document.getElementById("tabla-admin-container")
  const boton = document.querySelector(".toggle-admin-btn")

  if (tabla.style.display === "none" || tabla.style.display === "") {
    tabla.style.display = "block"
    boton.textContent = "▲ Ocultar Tabla Administrativa"
    cargarUsuarios()
  } else {
    tabla.style.display = "none"
    boton.textContent = "▼ Mostrar Tabla Administrativa"
  }
}

// Función para cargar usuarios en la tabla
function cargarUsuarios() {
  const tbody = document.querySelector("#tabla-usuarios tbody")
  tbody.innerHTML = ""

  usuariosEjemplo.forEach((usuario) => {
    const fila = document.createElement("tr")
    fila.innerHTML = `
            <td>${usuario.nombre} ${usuario.apellido}</td>
            <td>${usuario.totalCartones}</td>
            <td>$${usuario.totalPagado.toLocaleString()}</td>
            <td>
                <button class="btn-solicitar" onclick="mostrarCartones(${usuario.id})">
                    Solicito cartones
                </button>
            </td>
            <td>
                <button class="btn-pagado ${usuario.estadoPago}" onclick="cambiarEstadoPago(${usuario.id})">
                    ${usuario.estadoPago === "pagado" ? "Pagado ✓" : "Pendiente"}
                </button>
            </td>
        `
    tbody.appendChild(fila)
  })
}

// Función para mostrar cartones solicitados
function mostrarCartones(usuarioId) {
  const usuario = usuariosEjemplo.find((u) => u.id === usuarioId)
  if (!usuario) return

  let mensaje = `Cartones solicitados por ${usuario.nombre} ${usuario.apellido}:\n\n`
  usuario.cartonesSolicitados.forEach((carton, index) => {
    mensaje += `Cartón ${index + 1}: [${carton.numeros.join(", ")}] - $${carton.precio.toLocaleString()}\n`
  })
  mensaje += `\nTotal: ${usuario.totalCartones} cartones - $${usuario.totalPagado.toLocaleString()}`

  alert(mensaje)
}

// Función para cambiar estado de pago
function cambiarEstadoPago(usuarioId) {
  const usuario = usuariosEjemplo.find((u) => u.id === usuarioId)
  if (!usuario) return

  usuario.estadoPago = usuario.estadoPago === "pagado" ? "pendiente" : "pagado"
  cargarUsuarios() // Recargar la tabla para mostrar el cambio

  const estado = usuario.estadoPago === "pagado" ? "PAGADO" : "PENDIENTE"
  alert(`Estado de pago de ${usuario.nombre} ${usuario.apellido} cambiado a: ${estado}`)
}

// Función para inicializar la tabla administrativa
function inicializarTablaAdmin() {
  // Esta función se puede llamar cuando se carga la página de juego
  console.log("Tabla administrativa inicializada con", usuariosEjemplo.length, "usuarios")
}
