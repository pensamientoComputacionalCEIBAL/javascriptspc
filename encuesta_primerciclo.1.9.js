$(document).ready(function() {
  console.log("Script funcionando correctamente.");

  /*
  // Script para saltear la primera página.
  let urlActual = window.location.href;
  console.log("MachForm: URL actual", urlActual);

  if (urlActual === "https://machform.ceibal.edu.uy/formularios/view.php?id=2622663" || 
  urlActual.includes("&mf_page=1")) {
    
    if (urlActual.indexOf("&mf_page=") === -1) { urlActual += "&mf_page=2"; } 
    else { urlActual = urlActual.replace("&mf_page=1", "&mf_page=2"); }
    window.location.href = urlActual;
  }
  else { console.log("MachForm: No estamos en la página 1, el script no hará nada."); } */

  let element21 = document.getElementById('element_21');
  let element22 = document.getElementById('element_22');

  if (!element21 || !element22) {
    console.warn("Uno o ambos elementos ('element_21' o 'element_22') no existen en el DOM.");
    return; // Detenemos la ejecución si faltan elementos
  }

  element21.addEventListener('input', async function () {
    let inputValue = this.value.trim();
    if (inputValue === '') return;

    let url = `https://script.google.com/macros/s/AKfycby5XuDrutY3kUdoRGACEal48lDLYsr3KnEiYZ6hAk6G8Hu0qK1IYLywycLmIwSDSaD0hg/exec?buscar=${encodeURIComponent(inputValue)}`;
    
    try {
      let response = await fetch(url);
      let data = await response.text();
      element22.value = data.trim() || 'No hay respuesta asociada al documento que has ingresado.';
    } catch (error) {
      console.error('Error al obtener la respuesta:', error);
      element22.value = 'No hay respuesta asociada al documento que has ingresado.';
    }
  });

});
