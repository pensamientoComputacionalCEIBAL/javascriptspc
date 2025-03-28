document.addEventListener('DOMContentLoaded', function () {
  console.log("Script cargado correctamente.");
 
  let urlActual = window.location.href;
  console.log("MachForm: URL actual", urlActual);

  // Si la URL es la página 1 específica, redirigir a la página 2
  if (urlActual === "https://machform.ceibal.edu.uy/formularios/view.php?id=2622663") {
    console.log("MachForm: Página 1 detectada, redirigiendo a la página 2...");
    // Redirigir a la siguiente página
    window.location.href = urlActual + "&mf_page=2"; // Asegúrate que la URL de la página 2 sea esta
  } else { console.log("MachForm: No estamos en la página 1, el script no hará nada."); }
  
});
