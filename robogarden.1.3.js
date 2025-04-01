// Seleccionamos el botón y lo deshabilitamos por defecto
let boton = document.querySelector("input[value='Siguiente paso']");
if (boton) boton.disabled = true;

document.getElementById("element_1").addEventListener("input", async function(event) {
    let documento = event.target.value;
    let url = `https://script.google.com/macros/s/AKfycbyJVKBWRSwpzcfBZBQSQrE422zZop-OU7kxzti5-gc_-KPoVabxDL7lGrZQClZVKitLMg/exec?documento=${encodeURIComponent(documento)}`;

    // Cambiamos el botón a "Procesando..." mientras se hace la petición
    boton.disabled = true;
    boton.value = "Procesando...";

    try {
        let response = await fetch(url);
        let data = await response.json(); // Suponiendo que la respuesta es JSON

        if (data.encontrado) { // Ajusta según la estructura de la respuesta
            boton.disabled = false;
            boton.value = "Siguiente paso";
            console.log("Documento válido, botón habilitado.");
        } else {
            boton.disabled = true;
            boton.value = "Valor no encontrado, por favor, vuelva a intentarlo";
            console.log("Documento no válido, botón deshabilitado.");
        }
    } catch (error) {
        console.error("Error al consultar la API:", error);
        boton.disabled = true;
        boton.value = "Valor no encontrado, por favor, vuelva a intentarlo";
    }
});
