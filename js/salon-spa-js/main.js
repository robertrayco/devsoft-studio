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
reservationForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Obtener los datos
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const servicio = document.getElementById("servicio").value;
    const fecha = document.getElementById("fecha").value;
    const mensaje = document.getElementById("mensaje").value.trim();

    // Validar número de WhatsApp
    if (whatsappNumber.includes("X")) {
        alert("Configura primero el número de WhatsApp del negocio.");
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