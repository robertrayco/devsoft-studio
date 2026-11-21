/* =========================================
   ÉLÉGANCE BEAUTY STUDIO
   Gestión del formulario de reservas
========================================= */

// Número de WhatsApp del negocio.
// Formato: código de país + número, sin espacios.
const whatsappNumber = "51954744388";

// Obtener el formulario
const reservationForm = document.getElementById("reservationForm");

// Configurar fecha mínima de reserva
const dateInput = document.getElementById("fecha");

if (dateInput) {
    const today = new Date();
    const localDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    dateInput.min = localDate;
}

// Escuchar el envío del formulario
if (reservationForm) {

    reservationForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Obtener los datos
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const servicio = document.getElementById("servicio").value;
    const fecha = document.getElementById("fecha").value;
    const mensaje = document.getElementById("mensaje").value.trim();
    // Validar que los campos obligatorios tengan información
    if (!nombre || !telefono || !servicio || !fecha) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

    // Validar teléfono peruano de 9 dígitos
    const telefonoLimpio = telefono.replace(/\s+/g, "");

    if (!/^9\d{8}$/.test(telefonoLimpio)) {
        alert("Ingresa un número de celular peruano válido de 9 dígitos.");
        return;
    }

    // Validar número de WhatsApp
    if (whatsappNumber.includes("X")) {
        alert("Configura primero el número de WhatsApp del negocio.");
        return;
    }

        // Validar que la fecha no sea anterior a hoy
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        const fechaReserva = new Date(fecha + "T00:00:00");

        if (fechaReserva < hoy) {
            alert("La fecha de reserva no puede ser anterior a hoy.");
            return;
        }


    // Construir mensaje
    const mensajeWhatsApp = `
¡Hola! Quiero solicitar una reserva en ÉLÉGANCE Beauty Studio.

Nombre: ${nombre}
Teléfono: ${telefono}
Servicio: ${servicio}
Fecha preferida: ${fecha}

Mensaje adicional:
${mensaje}
    `;

    // Codificar mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensajeWhatsApp);

    // Construir enlace de WhatsApp
    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${mensajeCodificado}`;

    // Abrir WhatsApp
    window.open(whatsappURL, "_blank");

});

}

// Cerrar menú móvil al seleccionar una opción
const menuPrincipal = document.getElementById("menuPrincipal");

if (menuPrincipal) {
    const enlacesMenu = menuPrincipal.querySelectorAll("a");

    enlacesMenu.forEach((enlace) => {
        enlace.addEventListener("click", () => {
            const menuBootstrap =
                bootstrap.Collapse.getOrCreateInstance(menuPrincipal);

            menuBootstrap.hide();
        });
    });
}