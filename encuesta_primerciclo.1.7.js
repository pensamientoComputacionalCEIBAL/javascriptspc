$(document).ready(function() {
  console.log("Script funcionando correctamente.");
  
  let urlActual = window.location.href;
  console.log("MachForm: URL actual", urlActual);

  if (urlActual === "https://machform.ceibal.edu.uy/formularios/view.php?id=2622663" || 
  urlActual.includes("&mf_page=1")) {
    
    if (urlActual.indexOf("&mf_page=") === -1) { urlActual += "&mf_page=2"; } 
    else { urlActual = urlActual.replace("&mf_page=1", "&mf_page=2"); }
    window.location.href = urlActual;
  }
  else { console.log("MachForm: No estamos en la página 1, el script no hará nada."); }
});
