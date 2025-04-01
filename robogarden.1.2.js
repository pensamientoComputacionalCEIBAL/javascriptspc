document.addEventListener("DOMContentLoaded", function () {
  let boton = document.querySelector("input[value='Siguiente paso']");
  let inputDocumento = document.getElementById("element_1");
    
  if (boton) boton.disabled = true;
    
  async function validarDocumento() {
    let documento = inputDocumento.value;
    let url = `https://script.google.com/macros/s/AKfycbyJVKBWRSwpzcfBZBQSQrE422zZop-OU7kxzti5-gc_-KPoVabxDL7lGrZQClZVKitLMg/exec?documento=${encodeURIComponent(documento)}`;

    boton.disabled = true;
    boton.value = "Procesando...";
       
    try {
      let response = await fetch(url);
      let data = await response.json();
            
      if (data.encontrado) {
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
    }
});
