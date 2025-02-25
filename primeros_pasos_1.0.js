document.addEventListener('DOMContentLoaded', function() {
  // Aquí va todo el código del script.js
  
  // URL de tu Google Apps Script
  const urlBase = 'https://script.google.com/macros/s/AKfycbyL8myBlPxzIlDndzlkV5VGokBYTTxjr93RIPXU9TSdHDufKzXui-egWTz7638ljBfb/exec';

  // Función para cargar los departamentos en element_2
  function cargarDepartamentos() {
    fetch(urlBase)
      .then(res => res.json())
      .then(departamentos => {
        const selectDepto = document.querySelector('#element_2');
        // Limpiar y agregar opción predeterminada
        selectDepto.innerHTML = '<option value="" disabled selected>Selecciona un departamento</option>';

        // Eliminar espacios vacíos y cargar departamentos únicos en el orden original
        [...new Set(departamentos.map(d => d.trim()))]
          .forEach(depto => {
            if (depto) { // Evitar agregar departamentos vacíos
              selectDepto.add(new Option(depto, depto));
            }
          });

        // Bloquear el elemento_3 al inicio y limpiar element_8
        bloquearElemento3(true);
        limpiarElemento8();  // Limpiar element_8 al iniciar
      })
      .catch(err => console.error('Error al cargar departamentos:', err));
  }

  // Función para cargar los centros en element_3 según el departamento
  function cargarCentros(departamento) {
    bloquearElemento3(true);  // Deshabilitar mientras se cargan los centros
    limpiarElemento3();  // Limpiar centros existentes

    fetch(`${urlBase}?depto=${encodeURIComponent(departamento)}`)
      .then(res => res.json())
      .then(centros => {
        const selectCentro = document.querySelector('#element_3');
        
        // Ordenar los centros alfabéticamente
        centros.sort((a, b) => a.localeCompare(b)).forEach(centro => {
          if (centro) { // Evitar agregar centros vacíos
            selectCentro.add(new Option(centro, centro));
          }
        });
        bloquearElemento3(false);  // Habilitar element_3 después de cargar los centros
      })
      .catch(err => console.error('Error al cargar centros:', err));
  }

  // Limpia element_3 y agrega "Selecciona centro"
  function limpiarElemento3() {
    const selectCentro = document.querySelector('#element_3');
    selectCentro.innerHTML = '<option value="" disabled selected>Selecciona centro</option>';
  }

  // Bloquea o desbloquea element_3
  function bloquearElemento3(estado) {
    document.querySelector('#element_3').disabled = estado;
  }

  // Limpia element_8
  function limpiarElemento8() {
    const element8 = document.querySelector('#element_8');
    element8.value = '';  // Deja element_8 vacío por defecto
  }

  // Volcar selecciones en element_8
  function volcarSeleccionAElemento8() {
    const selectDepto = document.querySelector('#element_2');
    const selectCentro = document.querySelector('#element_3');
    const element8 = document.querySelector('#element_8');
    
    const departamentoSeleccionado = selectDepto.value;
    const centroSeleccionado = selectCentro.value;

    // Volcar ambas selecciones en element_8 si ambos están seleccionados
    if (departamentoSeleccionado && centroSeleccionado) {
      element8.value = `${departamentoSeleccionado} - ${centroSeleccionado}`;
    } else {
      element8.value = ''; // Si no se selecciona ambos, limpiar element_8
    }
  }

  // Escuchar cambios en element_2 para cargar centros
  document.querySelector('#element_2').addEventListener('change', (e) => {
    const departamentoSeleccionado = e.target.value;
    
    // Si se selecciona un departamento, cargar los centros
    if (departamentoSeleccionado) {
      cargarCentros(departamentoSeleccionado);
    } else {
      limpiarElemento3();  // Limpiar y bloquear el elemento_3
      bloquearElemento3(true);
    }
    
    // Limpiar element_8 cuando cambie el departamento
    limpiarElemento8();
  });

  // Escuchar cambios en element_3 para volcar selección en element_8
  document.querySelector('#element_3').addEventListener('change', volcarSeleccionAElemento8);

  // Iniciar la carga de departamentos
  cargarDepartamentos();
});
