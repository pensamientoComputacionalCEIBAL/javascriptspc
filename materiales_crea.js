<script>
document.addEventListener('DOMContentLoaded', function () {
  const inputDocumento = document.getElementById('element_1');
  const selectTexto = document.getElementById('element_2');
  const inputCodigo = document.getElementById('element_3');

  let resultados = []; // Guardamos los resultados en memoria para luego usarlos al seleccionar

  // Función para limpiar los campos
  function resetSelect() {
    selectTexto.innerHTML = '';
    selectTexto.disabled = true;
    const option = document.createElement('option');
    option.text = 'Seleccione una opción';
    option.disabled = true;
    option.selected = true;
    selectTexto.appendChild(option);
  }

  function buscarDocumento(documento) {
    // Reiniciar campos
    resetSelect();
    inputCodigo.value = '';

    if (!documento.trim()) return;

    // Mostrar mensaje de búsqueda
    const option = document.createElement('option');
    option.text = 'Buscando aulas asociadas...';
    option.disabled = true;
    option.selected = true;
    selectTexto.appendChild(option);

    // Llamada a la API
    fetch('https://script.google.com/macros/s/AKfycbwj8hAIggsh9Up8btXLCh2jbCmpuz3Y2qSAuE8N8iu1eHaQEBeDvTmdCWPPRG5o2Ao5/exec?documento=' + encodeURIComponent(documento))
      .then(response => response.json())
      .then(data => {
        resultados = Array.isArray(data) ? data : [];

        // Limpiar el select
        resetSelect();

        if (resultados.length > 0) {
          resultados.forEach((item, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.text = item.texto;
            selectTexto.appendChild(option);
          });
          selectTexto.disabled = false;
        } else {
          const option = document.createElement('option');
          option.text = 'Sin resultados para el documento';
          option.disabled = true;
          option.selected = true;
          selectTexto.appendChild(option);
        }
      })
      .catch(err => {
        resetSelect();
        const option = document.createElement('option');
        option.text = 'Error al consultar';
        option.disabled = true;
        option.selected = true;
        selectTexto.appendChild(option);
        console.error('Error en la búsqueda:', err);
      });
  }

  // Cuando se abandona o cambia el campo del documento
  inputDocumento.addEventListener('change', () => buscarDocumento(inputDocumento.value));
  inputDocumento.addEventListener('blur', () => buscarDocumento(inputDocumento.value));

  // Al seleccionar una opción en el listbox
  selectTexto.addEventListener('change', function () {
    const selectedIndex = this.value;
    if (resultados[selectedIndex]) {
      inputCodigo.value = resultados[selectedIndex].codigo;
    } else {
      inputCodigo.value = '';
    }
  });

  // Inicialización al cargar
  resetSelect();
  inputCodigo.value = '';
});
</script>
